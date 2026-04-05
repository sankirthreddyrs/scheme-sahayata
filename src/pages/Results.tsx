import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trophy, Info, Check, X, AlertTriangle, Lightbulb, Download, RotateCcw } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { schemes } from "@/lib/schemes";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import jsPDF from "jspdf";

interface SchemeResult {
  scheme: string;
  eligible: boolean;
  reason: string;
  gap?: string | null;
  alternate?: string | null;
}

const Results: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [results, setResults] = useState<SchemeResult[]>([]);
  const [applicantName, setApplicantName] = useState("");
  const [targetSchemeId, setTargetSchemeId] = useState<string | null>(null);

  useEffect(() => {
    const data = sessionStorage.getItem("results");
    const name = sessionStorage.getItem("applicantName");
    const target = sessionStorage.getItem("targetScheme");

    if (data) {
      try {
        const parsed = JSON.parse(data);

        // Ensure it's always an array of properly shaped objects
        let normalized: SchemeResult[] = [];

        if (Array.isArray(parsed)) {
          normalized = parsed.map((item: any) => {
            // Unwrap n8n {json: {...}} wrapper if still present
            const r = item?.json ?? item;
            const reason = r.reason || r.gap_analysis || "";
            const gap = r.gap_analysis || r.gap || "";
            const alternate = r.recommendation || r.alternate || "";
            
            return {
              scheme: r.scheme_name || r.scheme || "Unknown",
              eligible: r.is_eligible ?? r.eligible ?? false,
              reason: reason.toUpperCase() === "N/A" ? "" : reason,
              gap: gap.toUpperCase() === "N/A" ? "" : gap,
              alternate: alternate.toUpperCase() === "N/A" ? "" : alternate,
            };
          });
        }

        setResults(normalized);
      } catch (e) {
        console.error("Failed to parse results from sessionStorage", e);
      }
    }

    if (name) setApplicantName(name);
    if (target) setTargetSchemeId(target);
  }, []);

  const eligibleCount = results.filter(r => r.eligible).length;

  // Filter results if a specific scheme was targeted
  const filteredResults = targetSchemeId 
    ? results.filter(r => r.scheme && targetSchemeId && (
        r.scheme.toLowerCase().includes(targetSchemeId.toLowerCase()) || 
        targetSchemeId.toLowerCase().includes(r.scheme.toLowerCase())
      ))
    : results;

  // Helper to strip non-ASCII characters for standard jsPDF fonts
  const cleanStr = (str: string) => {
    if (!str) return "";
    // 1. Remove non-printable/control chars
    // 2. Replace Unicode dashes/quotes with ASCII
    // 3. Keep standard ASCII 32-126
    return str
      .replace(/[\u2013\u2014]/g, "-") // en-dash/em-dash
      .replace(/[\u2018\u2019]/g, "'") // smart quotes
      .replace(/[\u201C\u201D]/g, '"') // smart double quotes
      .replace(/[^\x20-\x7E]/g, ""); // strip anything non-ASCII
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFontSize(20);
    doc.setTextColor(255, 107, 53);
    doc.text("BeneficiaryChecker", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Eligibility Card", pageWidth / 2, 30, { align: "center" });

    doc.setFontSize(11);
    doc.text(`Name: ${cleanStr(applicantName)}`, 20, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);

    let y = 65;
    doc.setFontSize(12);
    doc.setTextColor(19, 136, 8);
    doc.text("Eligible Schemes:", 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0);
    results.filter(r => r.eligible).forEach(r => {
      doc.text(`- ${cleanStr(r.scheme)}`, 25, y);
      y += 6;
      
      // Find docs for this scheme
      const sInfo = schemes.find(s => r.scheme && s.id && r.scheme.toLowerCase().includes(s.id.toLowerCase()));
      if (sInfo) {
        doc.setFontSize(8);
        doc.setTextColor(100);
        const docsList = `Docs: ${sInfo.documents.join(", ")}`;
        const splitDocs = doc.splitTextToSize(docsList, pageWidth - 50);
        doc.text(splitDocs, 30, y);
        y += splitDocs.length * 4 + 2;
        doc.setFontSize(10);
        doc.setTextColor(0);
      }
    });

    y += 5;
    doc.setFontSize(12);
    doc.setTextColor(200, 0, 0);
    doc.text("Not Eligible:", 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0);
    results.filter(r => !r.eligible).forEach(r => {
      const line = `* ${cleanStr(r.scheme)}: ${cleanStr(r.reason)}`;
      const splitLines = doc.splitTextToSize(line, pageWidth - 40);
      doc.text(splitLines, 25, y);
      y += splitLines.length * 7;
      if (y > 270) { doc.addPage(); y = 20; }
    });

    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(
      "Show this card at your nearest Common Service Centre (CSC)",
      pageWidth / 2, y, { align: "center" }
    );

    doc.save("eligibility-card.pdf");
  };

  // No results — show friendly message with button back to form
  if (results.length === 0) {
    return (
      <div className="container max-w-lg py-16 text-center space-y-4">
        <Info className="h-12 w-12 text-muted-foreground mx-auto" />
        <p className="text-lg font-medium">No results found.</p>
        <p className="text-muted-foreground text-sm">
          Please complete the screening form first.
        </p>
        <Button onClick={() => navigate("/screen")}>
          Go to Screening
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8 pb-16">

      {/* Summary banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-xl p-6 mb-8 flex items-center gap-4 ${
          targetSchemeId 
            ? (filteredResults[0]?.eligible ? "bg-green-50 border-2 border-green-200" : "bg-red-50 border-2 border-red-200")
            : (eligibleCount > 0 ? "bg-green-50 border-2 border-green-200" : "bg-amber-50 border-2 border-amber-200")
        }`}
      >
        {targetSchemeId ? (
          filteredResults[0]?.eligible ? (
            <Check className="h-10 w-10 text-green-600 shrink-0" />
          ) : (
            <X className="h-10 w-10 text-red-500 shrink-0" />
          )
        ) : (
          eligibleCount > 0 ? (
            <Trophy className="h-10 w-10 text-green-600 shrink-0" />
          ) : (
            <Info className="h-10 w-10 text-amber-500 shrink-0" />
          )
        )}
        <div>
          <h1 className="font-display text-xl sm:text-2xl font-bold">
            {targetSchemeId ? (
              filteredResults[0]?.eligible 
                ? (lang === "hi" ? "आप पात्र हैं!" : "You are Eligible!")
                : (lang === "hi" ? "आप पात्र नहीं हैं" : "You are Not Eligible")
            ) : (
              eligibleCount > 0
                ? t("results.eligible", { count: String(eligibleCount) })
                : t("results.none")
            )}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {targetSchemeId ? (
              filteredResults[0]?.eligible 
                ? (lang === "hi" ? `आप ${filteredResults[0].scheme} के लिए योग्य हैं` : `You qualify for ${filteredResults[0].scheme}`)
                : (lang === "hi" ? "नीचे दिए गए कारणों की जाँच करें" : "Check the reasons below")
            ) : (
              eligibleCount > 0
                ? `You qualify for ${eligibleCount} out of ${results.length} schemes`
                : "Read the gap analysis below to understand why"
            )}
          </p>
        </div>
      </motion.div>

      {/* Result cards */}
      <div className="space-y-4">
        {filteredResults.map((r, i) => {
          // Safe scheme lookup — won't crash if scheme string doesn't match
          const schemeInfo = schemes.find(s =>
            r.scheme && s.id && r.scheme.toLowerCase().includes(s.id.toLowerCase())
          ) || schemes[i % schemes.length];

          const isTargeted = targetSchemeId !== null;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`border-l-4 ${r.eligible ? "border-l-green-500" : "border-l-red-400"} ${isTargeted ? "shadow-md ring-2 ring-primary/20" : ""}`}>
                <CardContent className="p-5 space-y-4">

                  {/* Scheme header */}
                  <div className="flex items-start gap-3">
                    {r.eligible ? (
                      <div className="rounded-full bg-green-100 p-1.5 shrink-0">
                        <Check className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-red-100 p-1.5 shrink-0">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-foreground">{r.scheme}</h3>
                      <p className={`text-sm font-medium ${r.eligible ? "text-green-600" : "text-red-500"}`}>
                        {r.eligible ? t("results.isEligible") : t("results.notEligible")}
                      </p>
                    </div>
                  </div>

                  {/* Reason */}
                  {r.reason && (
                    <div className="p-3 rounded-lg bg-muted/30">
                      <p className="text-sm text-muted-foreground italic">"{r.reason}"</p>
                    </div>
                  )}

                  {/* Single Scheme Mode: Show Docs & Steps directly if eligible */}
                  {isTargeted && r.eligible && schemeInfo && (
                    <div className="pt-4 border-t border-muted space-y-6">
                      <section>
                        <h4 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-3 text-primary">
                          <Info className="h-4 w-4" />
                          {t("results.requiredDocs")}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {(lang === "hi" ? schemeInfo.documentsHi : schemeInfo.documents).map((doc, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-muted">
                              <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                              <span className="text-xs">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </section>

                      <section>
                        <h4 className="font-bold text-sm uppercase tracking-wider flex items-center gap-2 mb-3 text-primary">
                          <Check className="h-4 w-4" />
                          {t("results.steps")}
                        </h4>
                        <ol className="space-y-3">
                          {(lang === "hi"
                            ? schemeInfo.applyStepsHi
                            : schemeInfo.applySteps
                          ).map((s, j) => (
                            <li key={j} className="flex gap-3">
                              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                                {j + 1}
                              </span>
                              <span className="text-xs leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    </div>
                  )}

                  {/* Gap analysis */}
                  {!r.eligible && r.gap && (
                    <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-amber-600">
                          {t("results.gapAnalysis")}
                        </p>
                        <p className="text-sm text-foreground">{r.gap}</p>
                      </div>
                    </div>
                  )}

                  {/* Alternate suggestion */}
                  {!r.eligible && r.alternate && (
                    <div className="rounded-lg bg-blue-50 border border-blue-200 p-3 flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                      <p className="text-sm">
                        <span className="font-semibold text-blue-600">
                          {t("results.tryInstead")}
                        </span>{" "}
                        {r.alternate}
                      </p>
                    </div>
                  )}

                  {/* How to apply modal (only if not already shown inline) */}
                  {r.eligible && schemeInfo && !isTargeted && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          {t("results.howToApply")}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-xl font-bold text-primary mb-2">
                            {lang === "hi" ? schemeInfo.nameHi : schemeInfo.name}
                          </DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Required Documents Section */}
                          <section>
                            <h4 className="font-bold text-base flex items-center gap-2 mb-3 text-foreground">
                              <Info className="h-5 w-5 text-blue-500" />
                              {t("results.requiredDocs")}
                            </h4>
                            <div className="grid grid-cols-1 gap-2">
                              {(lang === "hi" ? schemeInfo.documentsHi : schemeInfo.documents).map((doc, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 border border-muted">
                                  <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                                  <span className="text-sm">{doc}</span>
                                </div>
                              ))}
                            </div>
                          </section>

                          {/* Steps Section */}
                          <section>
                            <h4 className="font-bold text-base flex items-center gap-2 mb-3 text-foreground">
                              <Check className="h-5 w-5 text-green-500" />
                              {t("results.steps")}
                            </h4>
                            <ol className="space-y-3">
                              {(lang === "hi"
                                ? schemeInfo.applyStepsHi
                                : schemeInfo.applySteps
                              ).map((s, j) => (
                                <li key={j} className="flex gap-3">
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                                    {j + 1}
                                  </span>
                                  <span className="text-sm leading-relaxed">{s}</span>
                                </li>
                              ))}
                            </ol>
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}

                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        {!targetSchemeId && (
          <Button onClick={downloadPDF} className="flex-1 gap-2">
            <Download className="h-4 w-4" />
            {t("results.download")}
          </Button>
        )}
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="flex-1 gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          {t("results.startOver")}
        </Button>
      </div>

    </div>
  );
};

export default Results;