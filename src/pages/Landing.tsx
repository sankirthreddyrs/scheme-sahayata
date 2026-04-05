import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ClipboardCheck, Landmark } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24 text-center">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-primary/5" />
          <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-secondary/5" />
          {/* Circuit-like decorative lines */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <pattern id="circuit" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M0 30h60M30 0v60" stroke="currentColor" strokeWidth="0.5" fill="none" />
              <circle cx="30" cy="30" r="2" fill="currentColor" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#circuit)" />
          </svg>
        </div>

        <div className="container relative">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl sm:text-5xl font-extrabold text-foreground leading-tight"
          >
            {t("app.tagline")}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-3 text-lg sm:text-xl text-primary font-semibold"
          >
            {t("app.tagline.hindi")}
          </motion.p>
        </div>
      </section>

      {/* Cards */}
      <section className="container flex-1 pb-16">
        <div className="grid gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="h-full border-2 border-primary/20 hover:border-primary/50 transition-colors cursor-pointer group"
              onClick={() => navigate("/screen")}>
              <CardContent className="flex flex-col items-center text-center gap-4 p-8">
                <div className="rounded-2xl bg-accent p-4">
                  <ClipboardCheck className="h-10 w-10 text-primary" />
                </div>
                <p className="text-sm font-semibold text-primary uppercase tracking-wide">
                  {t("card1.heading")}
                </p>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {t("card1.title")}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("card1.subtitle")}
                </p>
                <Button className="mt-auto w-full group-hover:shadow-lg transition-shadow">
                  {t("card1.button")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="h-full border-2 border-secondary/20 hover:border-secondary/50 transition-colors cursor-pointer group"
              onClick={() => navigate("/schemes")}>
              <CardContent className="flex flex-col items-center text-center gap-4 p-8">
                <div className="rounded-2xl bg-secondary/10 p-4">
                  <Landmark className="h-10 w-10 text-secondary" />
                </div>
                <p className="text-sm font-semibold text-secondary uppercase tracking-wide">
                  {t("card2.heading")}
                </p>
                <h2 className="font-display text-xl font-bold text-foreground">
                  {t("card2.title")}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {t("card2.subtitle")}
                </p>
                <Button variant="outline" className="mt-auto w-full border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground group-hover:shadow-lg transition-shadow">
                  {t("card2.button")}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-sm text-muted-foreground">
        {t("footer.text")}
      </footer>
    </div>
  );
};

export default Landing;
