import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { indianStates, schemes, stateDistricts } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

interface FormData {
  full_name: string;
  age: string;
  gender: string;
  state: string;
  district: string;
  caste_category: string;
  annual_income: string;
  is_bpl: boolean;
  has_ration_card: boolean;
  has_bank_account: boolean;
  family_size: string;
  occupation: string;
  owns_land: boolean;
  land_owned_acres: string;
  has_pucca_house: boolean;
  is_farmer: boolean;
  has_disability: boolean;
  is_pregnant_or_lactating: boolean;
  scheme_selected?: string;
}

const defaultForm: FormData = {
  full_name: "", age: "", gender: "", state: "", district: "",
  caste_category: "", annual_income: "", is_bpl: false,
  has_ration_card: false, has_bank_account: false, family_size: "",
  occupation: "", owns_land: false, land_owned_acres: "0",
  has_pucca_house: false, is_farmer: false, has_disability: false,
  is_pregnant_or_lactating: false,
};

const schemeNames = [
  "MGNREGA", "PMAY", "PMJDY", "PM-KISAN", "NSAP",
  "PM-JAY", "PDS", "NRLM", "ICDS",
];

// ─── Normalize whatever shape n8n returns ────────────────────────────────────
const normalizeResults = (raw: any): Array<{
  scheme: string;
  eligible: boolean;
  reason: string;
  gap: string | null;
  alternate: string | null;
}> => {
  console.log("RAW n8n response:", JSON.stringify(raw, null, 2));

  let items: any[] = [];

  if (Array.isArray(raw)) {
    items = raw;
  } else if (raw?.results && Array.isArray(raw.results)) {
    items = raw.results;
  } else if (raw?.json) {
    items = [raw];
  } else {
    items = [raw];
  }

  return items
    .map((item: any) => {
      const r = item?.json ?? item;
      const eligible = r.is_eligible ?? r.eligible ?? false;
      const rawReason = r.reason || r.gap_analysis || "";
      const reason = rawReason.toUpperCase() === "N/A" || !rawReason
        ? (eligible ? "You meet the criteria for this scheme." : "Based on your profile, you do not meet the eligibility criteria for this scheme.")
        : rawReason;

      return {
        scheme: r.scheme_name || r.scheme || "Unknown Scheme",
        eligible,
        reason,
        gap: r.gap_analysis || r.gap || null,
        alternate: r.recommendation || r.alternate || null,
      };
    })
    .filter(r => r.scheme !== "Unknown Scheme" || items.length === 1);
};

// ─── Safely parse response — handles truncated / non-JSON bodies ──────────────
const safeParseResponse = async (response: Response): Promise<any> => {
  const text = await response.text();

  if (!text || text.trim() === "") {
    // If we get an empty body with a success status, n8n might not be sending anything back.
    console.error("Empty response body. Status:", response.status, "Headers:", Object.fromEntries(response.headers.entries()));
    throw new Error(`The server responded with success (HTTP ${response.status}) but returned no data. Please ensure your n8n workflow has a 'Respond to Webhook' node with data.`);
  }

  const trimmed = text.trim();

  // Try direct parse first
  try {
    return JSON.parse(trimmed);
  } catch (_) {
    // Response may be a large streamed body that got cut off.
    // Try to salvage a valid JSON array or object from the text.
    const arrayMatch = trimmed.match(/(\[[\s\S]*\])/);
    if (arrayMatch) {
      try {
        return JSON.parse(arrayMatch[1]);
      } catch (_) {}
    }

    const objectMatch = trimmed.match(/(\{[\s\S]*\})/);
    if (objectMatch) {
      try {
        return JSON.parse(objectMatch[1]);
      } catch (_) {}
    }

    // Last resort: try to extract results array from gemini_raw_response
    const resultsMatch = trimmed.match(/"results"\s*:\s*(\[[\s\S]*?\])\s*[,}]/);
    if (resultsMatch) {
      try {
        const results = JSON.parse(resultsMatch[1]);
        return { results };
      } catch (_) {}
    }

    console.error("Could not parse response:", trimmed.substring(0, 500));
    throw new Error("Received an invalid response from the server. Please try again.");
  }
};

const ScreenForm: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { lang, t } = useLanguage();
  const schemeParam = searchParams.get("scheme");
  const isSingleScheme = !!schemeParam;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({ ...defaultForm, scheme_selected: schemeParam || undefined });
  const [loading, setLoading] = useState(false);
  const [loadingScheme, setLoadingScheme] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const totalSteps = isSingleScheme ? 1 : 3;

  const set = useCallback((key: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingScheme(prev => (prev + 1) % schemeNames.length);
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async () => {
    if (!form.full_name.trim()) {
      setError("Please enter your full name before submitting.");
      return;
    }
    if (!form.age) {
      setError("Please enter your age before submitting.");
      return;
    }
    if (form.owns_land && (!form.land_owned_acres || Number(form.land_owned_acres) <= 0)) {
      setError("Please enter your land area in acres (must be greater than 0).");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const payload: Record<string, any> = {
        full_name: form.full_name,
        age: Number(form.age),
        gender: form.gender,
        state: form.state,
        district: form.district,
        caste_category: form.caste_category,
        annual_income: Number(form.annual_income),
        is_bpl: form.is_bpl,
        has_ration_card: form.has_ration_card,
        has_bank_account: form.has_bank_account,
        family_size: Number(form.family_size),
        occupation: form.occupation,
        land_owned_acres: form.owns_land ? Number(form.land_owned_acres) : 0,
        has_pucca_house: form.has_pucca_house,
        is_farmer: form.is_farmer,
        has_disability: form.has_disability,
        is_pregnant_or_lactating: form.is_pregnant_or_lactating,
        scheme_selected: form.scheme_selected || null,
        input_mode: "form",
      };

      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

      // ── DEMO MODE ─────────────────────────────────────────────────────────
      if (!webhookUrl || webhookUrl === "your_n8n_webhook_url_here") {
        const demoResults = schemes.map((s, i) => ({
          scheme: s.name,
          eligible: i % 3 !== 2,
          reason: i % 3 !== 2
            ? "You meet all criteria for this scheme."
            : "Your income exceeds the limit for this scheme.",
          gap: i % 3 === 2 ? "Your income is ₹50,000 above the limit" : null,
          alternate: i % 3 === 2 ? schemes[(i + 1) % schemes.length].name : null,
        }));
        sessionStorage.setItem("results", JSON.stringify(demoResults));
        sessionStorage.setItem("applicantName", form.full_name || "Applicant");
        navigate("/results");
        return;
      }

      // ── REAL n8n CALL ─────────────────────────────────────────────────────
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Server returned status ${response.status}. Please try again.`);
      }

      // ✅ KEY FIX: use safeParseResponse instead of response.json()
      const raw = await safeParseResponse(response);

      if (!raw) {
        throw new Error("Received an empty or invalid response from the server.");
      }

      const normalized = normalizeResults(raw);

      if (normalized.length === 0) {
        throw new Error("No results returned from the server. Please try again.");
      }

      sessionStorage.setItem("results", JSON.stringify(normalized));
      sessionStorage.setItem("applicantName", form.full_name || "Applicant");
      sessionStorage.setItem("targetScheme", form.scheme_selected || "");
      navigate("/results");

    } catch (e: any) {
      console.error("Submit error:", e);
      setError(`Failed to check eligibility: ${e.message || "Please try again."}`);
    } finally {
      setLoading(false);
    }
  };

  const ToggleField = ({
    label, value, onChange,
  }: {
    label: string; value: boolean; onChange: (v: boolean) => void;
  }) => (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
      <Label className="text-sm font-medium cursor-pointer flex-1">{label}</Label>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">{t("step1.title")}</h2>
      <div>
        <Label>{t("field.name")} *</Label>
        <Input
          value={form.full_name}
          onChange={e => set("full_name", e.target.value)}
          placeholder="Enter full name"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{t("field.age")} *</Label>
          <Input
            type="number"
            value={form.age}
            onChange={e => set("age", e.target.value)}
            placeholder="25"
            min={1}
            max={120}
          />
        </div>
        <div>
          <Label>{t("field.gender")}</Label>
          <Select value={form.gender} onValueChange={v => set("gender", v)}>
            <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="Male">{t("gender.male")}</SelectItem>
              <SelectItem value="Female">{t("gender.female")}</SelectItem>
              <SelectItem value="Other">{t("gender.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label>{t("field.state")}</Label>
        <Select
          value={form.state}
          onValueChange={v => {
            set("state", v);
            set("district", "");
          }}
        >
          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
          <SelectContent>
            {indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>{t("field.district")}</Label>
        {form.state && stateDistricts[form.state] ? (
          <Select value={form.district} onValueChange={v => set("district", v)}>
            <SelectTrigger><SelectValue placeholder="Select district" /></SelectTrigger>
            <SelectContent>
              {stateDistricts[form.state].map(d => (
                <SelectItem key={d} value={d}>{d}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            value={form.district}
            onChange={e => set("district", e.target.value)}
            placeholder="Enter district"
          />
        )}
      </div>
      <div>
        <Label>{t("field.caste")}</Label>
        <Select value={form.caste_category} onValueChange={v => set("caste_category", v)}>
          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="General">{t("caste.general")}</SelectItem>
            <SelectItem value="OBC">{t("caste.obc")}</SelectItem>
            <SelectItem value="SC">{t("caste.sc")}</SelectItem>
            <SelectItem value="ST">{t("caste.st")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">{t("step2.title")}</h2>
      <div>
        <Label>{t("field.income")} *</Label>
        <Input
          type="number"
          value={form.annual_income}
          onChange={e => set("annual_income", e.target.value)}
          placeholder="e.g. 100000"
          min={0}
        />
      </div>
      <ToggleField label={t("field.bpl")} value={form.is_bpl} onChange={v => set("is_bpl", v)} />
      <ToggleField label={t("field.ration")} value={form.has_ration_card} onChange={v => set("has_ration_card", v)} />
      <ToggleField label={t("field.bank")} value={form.has_bank_account} onChange={v => set("has_bank_account", v)} />
      <div>
        <Label>{t("field.familySize")} *</Label>
        <Input
          type="number"
          value={form.family_size}
          onChange={e => set("family_size", e.target.value)}
          placeholder="e.g. 5"
          min={1}
        />
      </div>
      <div>
        <Label>{t("field.occupation")}</Label>
        <Select value={form.occupation} onValueChange={v => set("occupation", v)}>
          <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="Farmer">{t("occ.farmer")}</SelectItem>
            <SelectItem value="Daily Wage Worker">{t("occ.daily")}</SelectItem>
            <SelectItem value="Self Employed">{t("occ.self")}</SelectItem>
            <SelectItem value="Unemployed">{t("occ.unemployed")}</SelectItem>
            <SelectItem value="Government Employee">{t("occ.govt")}</SelectItem>
            <SelectItem value="Other">{t("occ.other")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">{t("step3.title")}</h2>
      <ToggleField label={t("field.land")} value={form.owns_land} onChange={v => set("owns_land", v)} />
      {form.owns_land && (
        <div className="ml-4">
          <Label>{t("field.landAcres")}</Label>
          <Input
            type="number"
            value={form.land_owned_acres}
            onChange={e => set("land_owned_acres", e.target.value)}
            placeholder="e.g. 2"
            min={0}
          />
        </div>
      )}
      <ToggleField label={t("field.puccaHouse")} value={form.has_pucca_house} onChange={v => set("has_pucca_house", v)} />
      <ToggleField label={t("field.farmer")} value={form.is_farmer} onChange={v => set("is_farmer", v)} />
      <ToggleField label={t("field.disability")} value={form.has_disability} onChange={v => set("has_disability", v)} />
      <ToggleField label={t("field.pregnant")} value={form.is_pregnant_or_lactating} onChange={v => set("is_pregnant_or_lactating", v)} />
    </div>
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="text-lg font-medium text-foreground">{t("loading.text")}</p>
        <p className="text-primary font-semibold text-xl animate-pulse">
          Checking {schemeNames[loadingScheme]}...
        </p>
      </div>
    );
  }

  const schemeName = schemeParam ? schemes.find(s => s.id === schemeParam) : null;

  return (
    <div className="container max-w-lg py-8 pb-16">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="font-display text-2xl font-bold text-center">{t("screen.title")}</h1>
        <p className="text-muted-foreground text-center mt-1 mb-6">{t("screen.subtitle")}</p>

        {schemeName && (
          <div className="mb-4 rounded-lg bg-accent p-3 text-center text-sm font-semibold text-accent-foreground">
            {lang === "hi" ? schemeName.nameHi : schemeName.name}
          </div>
        )}

        {!isSingleScheme && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{t("step")} {step} {t("of")} {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-2" />
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-destructive/10 border border-destructive/30 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={isSingleScheme ? "all" : step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {isSingleScheme ? (
              <div className="space-y-6">
                {renderStep1()}
                {renderStep2()}
                {renderStep3()}
              </div>
            ) : (
              <>
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3 mt-8">
          {!isSingleScheme && step > 1 && (
            <Button
              variant="outline"
              onClick={() => { setError(null); setStep(s => s - 1); }}
              className="flex-1"
            >
              {t("btn.prev")}
            </Button>
          )}
          {!isSingleScheme && step < totalSteps ? (
            <Button
              onClick={() => {
                if (step === 1 && (!form.full_name.trim() || !form.age)) {
                  setError("Please enter at least your name and age to continue.");
                  return;
                }
                if (step === 2 && !form.annual_income) {
                  setError("Please enter your annual income to continue.");
                  return;
                }
                setError(null);
                setStep(s => s + 1);
              }}
              className="flex-1"
            >
              {t("btn.next")}
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="flex-1">
              {t("btn.submit")}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ScreenForm;