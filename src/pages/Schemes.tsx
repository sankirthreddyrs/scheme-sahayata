import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { schemes } from "@/lib/schemes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Schemes: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();

  return (
    <div className="container py-8 pb-16">
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center"
      >
        {t("schemes.title")}
      </motion.h1>

      <div className="grid gap-4 sm:grid-cols-2 max-w-4xl mx-auto">
        {schemes.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <CardContent className="flex flex-col gap-3 p-6">
                <h3 className="font-display font-bold text-foreground">
                  {lang === "hi" ? s.nameHi : s.name}
                </h3>
                <p className="text-sm text-muted-foreground flex-1">
                  {lang === "hi" ? s.descriptionHi : s.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="self-start"
                  onClick={() => navigate(`/screen?scheme=${s.id}`)}
                >
                  {t("schemes.check")} <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Schemes;
