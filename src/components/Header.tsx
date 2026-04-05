import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";

const AshokaChakra = () => (
  <svg width="28" height="28" viewBox="0 0 100 100" className="shrink-0">
    <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="4" />
    <circle cx="50" cy="50" r="8" fill="hsl(var(--primary))" />
    {Array.from({ length: 24 }).map((_, i) => (
      <line
        key={i}
        x1="50"
        y1="50"
        x2={50 + 40 * Math.cos((i * 15 * Math.PI) / 180)}
        y2={50 + 40 * Math.sin((i * 15 * Math.PI) / 180)}
        stroke="hsl(var(--primary))"
        strokeWidth="2"
      />
    ))}
  </svg>
);

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang, t } = useLanguage();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="container flex h-14 items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          {!isHome && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="mr-1"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
          <button onClick={() => navigate("/")} className="flex items-center gap-2">
            <AshokaChakra />
            <span className="font-display text-lg font-bold text-primary">
              {t("app.title")}
            </span>
          </button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setLang(lang === "en" ? "hi" : "en")}
          className="text-sm font-medium"
        >
          {lang === "en" ? "हिंदी" : "English"}
        </Button>
      </div>
    </header>
  );
};

export default Header;
