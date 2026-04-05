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

  useEffect(() => {
    const data = sessionStorage.getItem("results");
    const name = sessionStorage.getItem("applicantName");
    if (data) {
      try { setResults(JSON.parse(data)); } catch { /* empty */ }
    }
    if (name) setApplicantName(name);
  }, []);

  const eligibleCount = results.filter(r => r.eligible).length;

  const downloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // Title
    doc.setFontSize(20);
    doc.setTextColor(255, 107, 53);
    doc.text("BeneficiaryChecker", pageWidth / 2, 20, { align: "center" });

    doc.setFontSize(14);
    doc.setTextColor(0);
    doc.text("Eligibility Card", pageWidth / 2, 30, { align: "center" });

    doc.setFontSize(11);
    doc.text(`Name: ${applicantName}`, 20, 45);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 52);

    let y = 65;
    doc.setFontSize(12);
    doc.setTextColor(19, 136, 8);
    doc.text("Eligible Schemes:", 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0);
    results.filter(r => r.eligible).forEach(r => {
      doc.text(`✓ ${r.scheme}`, 25, y);
      y += 7;
    });

    y += 5;
    doc.setFontSize(12);
    doc.setTextColor(200, 0, 0);
    doc.text("Not Eligible:", 20, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0);
    results.filter(r => !r.eligible).forEach(r => {
      doc.text(`✗ ${r.scheme} — ${r.reason}`, 25, y);
      y += 7;
      if (y > 270) { doc.addPage(); y = 20; }
    });

    y += 10;
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text("Show this card at your nearest Common Service Centre (CSC)", pageWidth / 2, y, { align: "center" });

    doc.save("eligibility-card.pdf");
  };

  if (results.length === 0) {
    return (
      <div className="container py-16 text-center">
        <p className="text-muted-foreground">No results found. Please complete the screening first.</p>
        <Button className="mt-4" onClick={() => navigate("/screen")}>Go to Screening</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl py-8 pb-16">
      {/* Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`rounded-xl p-6 mb-8 flex items-center gap-4 ${
          eligibleCount > 0
            ? "bg-eligible/10 border-2 border-eligible/30"
            : "bg-gap-warning/10 border-2 border-gap-warning/30"
        }`}
      >
        {eligibleCount > 0 ? (
          <Trophy className="h-10 w-10 text-eligible shrink-0" />
        ) : (
          <Info className="h-10 w-10 text-gap-warning shrink-0" />
        )}
        <h1 className="font-display text-xl sm:text-2xl font-bold">
          {eligibleCount > 0
            ? t("results.eligible", { count: String(eligibleCount) })
            : t("results.none")}
        </h1>
      </motion.div>

      {/* Results */}
      <div className="space-y-4">
        {results.map((r, i) => {
          const schemeInfo = schemes.find(s => r.scheme.includes(s.id)) || schemes[i % schemes.length];

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className={`border-l-4 ${r.eligible ? "border-l-eligible" : "border-l-ineligible"}`}>
                <CardContent className="p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    {r.eligible ? (
                      <div className="rounded-full bg-eligible/10 p-1.5">
                        <Check className="h-5 w-5 text-eligible" />
                      </div>
                    ) : (
                      <div className="rounded-full bg-ineligible/10 p-1.5">
                        <X className="h-5 w-5 text-ineligible" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{r.scheme}</h3>
                      <p className={`text-sm font-medium ${r.eligible ? "text-eligible" : "text-ineligible"}`}>
                        {r.eligible ? t("results.isEligible") : t("results.notEligible")}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{r.reason}</p>

                  {!r.eligible && r.gap && (
                    <div className="rounded-lg bg-gap-warning/10 border border-gap-warning/20 p-3 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-gap-warning shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-semibold text-gap-warning">{t("results.gapAnalysis")}</p>
                        <p className="text-sm text-foreground">{r.gap}</p>
                      </div>
                    </div>
                  )}

                  {!r.eligible && r.alternate && (
                    <div className="rounded-lg bg-suggestion/10 border border-suggestion/20 p-3 flex items-start gap-2">
                      <Lightbulb className="h-4 w-4 text-suggestion shrink-0 mt-0.5" />
                      <p className="text-sm">
                        <span className="font-semibold text-suggestion">{t("results.tryInstead")}</span>{" "}
                        {r.alternate}
                      </p>
                    </div>
                  )}

                  {r.eligible && schemeInfo && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">{t("results.howToApply")}</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{lang === "hi" ? schemeInfo.nameHi : schemeInfo.name}</DialogTitle>
                        </DialogHeader>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                          {(lang === "hi" ? schemeInfo.applyStepsHi : schemeInfo.applySteps).map((s, j) => (
                            <li key={j}>{s}</li>
                          ))}
                        </ol>
                      </DialogContent>
                    </Dialog>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <Button onClick={downloadPDF} className="flex-1 gap-2">
          <Download className="h-4 w-4" />
          {t("results.download")}
        </Button>
        <Button variant="outline" onClick={() => navigate("/")} className="flex-1 gap-2">
          <RotateCcw className="h-4 w-4" />
          {t("results.startOver")}
        </Button>
      </div>
    </div>
  );
};

export default Results;
