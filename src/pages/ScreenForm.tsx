import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2 } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { indianStates, schemes } from "@/lib/schemes";
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
  const [isRecording, setIsRecording] = useState(false);

  const totalSteps = isSingleScheme ? 1 : 3;

  const set = useCallback((key: keyof FormData, value: any) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  // Loading scheme animation
  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingScheme(prev => (prev + 1) % schemeNames.length);
    }, 800);
    return () => clearInterval(interval);
  }, [loading]);

  const handleVoice = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "kn-IN";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onerror = () => {
      recognition.lang = "hi-IN";
      recognition.start();
    };

    recognition.onresult = async (event: any) => {
      const transcript = event.results[0][0].transcript;
      setIsRecording(false);
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) return;
        const resp = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{
                parts: [{
                  text: `Extract the following fields from this voice transcript and return only JSON: full_name, age, gender, state, district, annual_income, caste_category, is_bpl, has_ration_card, has_bank_account, family_size, occupation, land_owned_acres, has_pucca_house, is_farmer, has_disability, is_pregnant_or_lactating. Transcript: ${transcript}`,
                }],
              }],
            }),
          }
        );
        const data = await resp.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          setForm(prev => ({
            ...prev,
            ...Object.fromEntries(
              Object.entries(parsed).filter(([_, v]) => v !== null && v !== undefined && v !== "")
                .map(([k, v]) => [k, typeof v === "boolean" ? v : String(v)])
            ),
          }));
        }
      } catch (e) {
        console.error("Voice parse error:", e);
      }
    };

    recognition.start();
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload: Record<string, any> = {
        ...form,
        age: Number(form.age),
        annual_income: Number(form.annual_income),
        family_size: Number(form.family_size),
        land_owned_acres: form.owns_land ? Number(form.land_owned_acres) : 0,
      };
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;
      if (!webhookUrl || webhookUrl === "your_n8n_webhook_url_here") {
        // Demo mode — generate fake results
        const demoResults = schemes.map((s, i) => ({
          scheme: s.name,
          eligible: i % 3 !== 2,
          reason: i % 3 !== 2 ? "You meet all criteria for this scheme." : "Your income exceeds the limit for this scheme.",
          gap: i % 3 === 2 ? "Your income is ₹50,000 above the limit" : null,
          alternate: i % 3 === 2 ? schemes[(i + 1) % schemes.length].name : null,
        }));
        sessionStorage.setItem("results", JSON.stringify(demoResults));
        sessionStorage.setItem("applicantName", form.full_name || "Applicant");
        navigate("/results");
        return;
      }
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json();
      sessionStorage.setItem("results", JSON.stringify(result));
      sessionStorage.setItem("applicantName", form.full_name || "Applicant");
      navigate("/results");
    } catch (e) {
      console.error("Submit error:", e);
      alert("Failed to check eligibility. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const ToggleField = ({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) => (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-border p-4">
      <Label className="text-sm font-medium cursor-pointer flex-1">{label}</Label>
      <Switch checked={value} onCheckedChange={onChange} />
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-4">
      <h2 className="font-display text-lg font-semibold">{t("step1.title")}</h2>
      <div>
        <Label>{t("field.name")}</Label>
        <Input value={form.full_name} onChange={e => set("full_name", e.target.value)} placeholder="Enter full name" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>{t("field.age")}</Label>
          <Input type="number" value={form.age} onChange={e => set("age", e.target.value)} placeholder="25" />
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
        <Select value={form.state} onValueChange={v => set("state", v)}>
          <SelectTrigger><SelectValue placeholder="Select state" /></SelectTrigger>
          <SelectContent>
            {indianStates.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>{t("field.district")}</Label>
        <Input value={form.district} onChange={e => set("district", e.target.value)} placeholder="Enter district" />
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
        <Label>{t("field.income")}</Label>
        <Input type="number" value={form.annual_income} onChange={e => set("annual_income", e.target.value)} placeholder="e.g. 100000" />
      </div>
      <ToggleField label={t("field.bpl")} value={form.is_bpl} onChange={v => set("is_bpl", v)} />
      <ToggleField label={t("field.ration")} value={form.has_ration_card} onChange={v => set("has_ration_card", v)} />
      <ToggleField label={t("field.bank")} value={form.has_bank_account} onChange={v => set("has_bank_account", v)} />
      <div>
        <Label>{t("field.familySize")}</Label>
        <Input type="number" value={form.family_size} onChange={e => set("family_size", e.target.value)} placeholder="e.g. 5" />
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
          <Input type="number" value={form.land_owned_acres} onChange={e => set("land_owned_acres", e.target.value)} placeholder="e.g. 2" />
        </div>
      )}
      <ToggleField label={t("field.puccaHouse")} value={form.has_pucca_house} onChange={v => set("has_pucca_house", v)} />
      <ToggleField label={t("field.farmer")} value={form.is_farmer} onChange={v => set("is_farmer", v)} />
      <ToggleField label={t("field.disability")} value={form.has_disability} onChange={v => set("has_disability", v)} />
      <ToggleField label={t("field.pregnant")} value={form.is_pregnant_or_lactating} onChange={v => set("is_pregnant_or_lactating", v)} />

      {/* Voice Input */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={handleVoice}
          className={`relative rounded-full p-5 transition-colors ${
            isRecording ? "bg-destructive text-destructive-foreground" : "bg-primary text-primary-foreground"
          }`}
        >
          {isRecording && <span className="absolute inset-0 rounded-full bg-destructive animate-pulse-ring" />}
          {isRecording ? <MicOff className="h-8 w-8 relative z-10" /> : <Mic className="h-8 w-8" />}
        </button>
        <p className="text-sm text-muted-foreground text-center">
          {isRecording ? t("voice.recording") : t("voice.label")}
        </p>
      </div>
    </div>
  );

  // Loading overlay
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

        {/* Progress */}
        {!isSingleScheme && (
          <div className="mb-6">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>{t("step")} {step} {t("of")} {totalSteps}</span>
              <span>{Math.round((step / totalSteps) * 100)}%</span>
            </div>
            <Progress value={(step / totalSteps) * 100} className="h-2" />
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
            <Button variant="outline" onClick={() => setStep(s => s - 1)} className="flex-1">
              {t("btn.prev")}
            </Button>
          )}
          {!isSingleScheme && step < totalSteps ? (
            <Button onClick={() => setStep(s => s + 1)} className="flex-1">
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
