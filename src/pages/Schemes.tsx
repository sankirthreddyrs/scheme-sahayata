import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";
import { schemes } from "@/lib/schemes";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Search, Info, Mic, MicOff, Loader2 } from "lucide-react";

const Schemes: React.FC = () => {
  const navigate = useNavigate();
  const { lang, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [voiceError, setVoiceError] = useState(false);

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    // Use Indian English as default, it's quite good for mixed English/Hindi names
    // If language is Hindi, use Hindi
    recognition.lang = lang === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 3; // Get more alternatives for better matching
    recognition.continuous = false;

    setIsListening(true);
    setVoiceError(false);

    recognition.onresult = (event: any) => {
      let bestTranscript = "";
      let hasMatches = false;

      // Check all alternatives for a match
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        for (let j = 0; j < result.length; j++) {
          const transcript = result[j].transcript;
          const query = transcript.toLowerCase().trim();
          
          console.log(`Speech alternative ${j}:`, transcript);

          const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim();
          const nQuery = normalize(query);
          
          const currentMatch = schemes.some((s) => {
            const nName = normalize(s.name);
            const nNameHi = normalize(s.nameHi);
            const nDesc = normalize(s.description);
            const nDescHi = normalize(s.descriptionHi);
            const nId = normalize(s.id);
            
            const queryWords = nQuery.split(" ").filter(w => w.length >= 2);
            const schemeWords = nName.split(" ").filter(w => w.length >= 2);

            return (
              nName.includes(nQuery) ||
              nNameHi.includes(nQuery) ||
              nId.includes(nQuery) ||
              nQuery.includes(nName) ||
              nQuery.includes(nNameHi) ||
              queryWords.some(qw => nName.includes(qw) || nNameHi.includes(qw) || nId.includes(qw)) ||
              schemeWords.some(sw => nQuery.includes(sw))
            );
          });

          if (currentMatch) {
            bestTranscript = transcript;
            hasMatches = true;
            break;
          } else if (!bestTranscript) {
            bestTranscript = transcript;
          }
        }
        if (hasMatches) break;
      }

      if (hasMatches) {
        setSearchQuery(bestTranscript);
        setIsListening(false);
      } else {
        console.warn("No match found for speech:", bestTranscript);
        setVoiceError(true);
        setIsListening(false);
        setTimeout(() => setVoiceError(false), 3000);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      setVoiceError(true);
      setIsListening(false);
      setTimeout(() => setVoiceError(false), 3000);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const filteredSchemes = schemes.filter((s) => {
    const query = searchQuery.toLowerCase();
    return (
      s.name.toLowerCase().includes(query) ||
      s.nameHi.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.descriptionHi.toLowerCase().includes(query)
    );
  });

  return (
    <div className="container py-8 pb-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl sm:text-3xl font-bold text-foreground"
          >
            {t("schemes.title")}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative max-w-md mx-auto"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={isListening ? t("schemes.listening") : (voiceError ? t("schemes.couldNotListen") : t("schemes.search"))}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 pr-10 h-11 bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-all duration-300 ${voiceError ? "border-destructive text-destructive placeholder:text-destructive" : ""}`}
            />
            <button
              onClick={startListening}
              disabled={isListening}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-muted transition-colors ${isListening ? "text-primary" : (voiceError ? "text-destructive" : "text-muted-foreground")}`}
              title="Voice Search"
            >
              {isListening ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : voiceError ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </button>
          </motion.div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filteredSchemes.length > 0 ? (
              filteredSchemes.map((s, i) => (
                <motion.div
                  key={s.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="h-full hover:shadow-md transition-shadow border-primary/10">
                    <CardContent className="flex flex-col gap-3 p-6">
                      <h3 className="font-display font-bold text-foreground">
                        {lang === "hi" ? s.nameHi : s.name}
                      </h3>
                      <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
                        {lang === "hi" ? s.descriptionHi : s.description}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="self-start group"
                        onClick={() => navigate(`/screen?scheme=${s.id}`)}
                      >
                        {t("schemes.check")} 
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full py-12 text-center space-y-4 bg-muted/30 rounded-2xl border-2 border-dashed border-muted"
              >
                <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                  <Info className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-lg font-medium text-foreground">{t("schemes.noResults")}</p>
                  <p className="text-sm text-muted-foreground">Try searching for something else or browse all schemes.</p>
                </div>
                <Button 
                  variant="ghost" 
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:text-primary/80"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Schemes;
