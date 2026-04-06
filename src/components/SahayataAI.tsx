import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Mic, MicOff, Loader2, Bot, User } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { schemes } from "@/lib/schemes";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: number;
}

const SahayataAI: React.FC = () => {
  const { lang: appLang, t } = useLanguage();
  const [chatLang, setChatLang] = useState<"en" | "hi">(appLang);
  const [isOpen, setIsOpen] = useState(false);

  // Simple Markdown-like formatter for bold text
  const formatText = (text: string) => {
    return text.split("\n").map((line, i) => {
      const parts = line.split(/(\*\*.*?\*\*)/g);
      return (
        <span key={i} className="block mb-1">
          {parts.map((part, j) => {
            if (part.startsWith("**") && part.endsWith("**")) {
              return (
                <strong key={j} className="text-primary font-bold">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          })}
        </span>
      );
    });
  };

  // Sync with app language initially but allow independent control
  useEffect(() => {
    setChatLang(appLang);
  }, [appLang]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: "welcome",
          text: t("chatbot.welcome"),
          sender: "bot",
          timestamp: Date.now(),
        },
      ]);
    }
  }, [t]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollArea = scrollRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollArea) {
        scrollArea.scrollTop = scrollArea.scrollHeight;
      }
    }
  }, [messages]);

  const handleSend = async (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9\u0900-\u097F\s]/g, " ").replace(/\s+/g, " ").trim();
      const query = normalize(text);
      const queryWords = query.split(" ").filter(w => w.length >= 2);
      
      let bestMatch = null;
      let highestScore = 0;

      for (const scheme of schemes) {
        const nName = normalize(scheme.name);
        const nNameHi = normalize(scheme.nameHi);
        const nId = normalize(scheme.id);
        const nDesc = normalize(scheme.description);
        const nDescHi = normalize(scheme.descriptionHi);

        let score = 0;
        
        // Check for direct includes
        if (nName.includes(query) || nNameHi.includes(query) || nId.includes(query)) {
          score += 10;
        }

        // Check word overlap
        queryWords.forEach(word => {
          if (nName.includes(word) || nNameHi.includes(word) || nId.includes(word)) {
            score += 5;
          } else if (nDesc.includes(word) || nDescHi.includes(word)) {
            score += 2;
          }
        });

        if (score > highestScore) {
          highestScore = score;
          bestMatch = scheme;
        }
      }

      let responseText = "";

      if (bestMatch && highestScore > 0) {
        if (chatLang === "hi") {
          responseText = `मुझे लगता है कि आप **${bestMatch.nameHi}** के बारे में पूछ रहे हैं।\n\n**विवरण:**\n${bestMatch.descriptionHi}\n\n**आवेदन के चरण:**\n${bestMatch.applyStepsHi.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\n**आवश्यक दस्तावेज़:**\n${bestMatch.documentsHi.map(doc => `• ${doc}`).join("\n")}`;
        } else {
          responseText = `I think you're asking about **${bestMatch.name}**.\n\n**Description:**\n${bestMatch.description}\n\n**Application Steps:**\n${bestMatch.applySteps.map((step, i) => `${i + 1}. ${step}`).join("\n")}\n\n**Required Documents:**\n${bestMatch.documents.map(doc => `• ${doc}`).join("\n")}`;
        }
      } else {
        if (chatLang === "hi") {
          responseText = "क्षमा करें, मुझे इस बारे में कोई जानकारी नहीं मिली। क्या आप किसी विशिष्ट सरकारी योजना जैसे MGNREGA, PM-Kisan या PMAY के बारे में जानना चाहते हैं?";
        } else {
          responseText = "I'm sorry, I couldn't find information on that specific topic. Could you please specify a government scheme like MGNREGA, PM-Kisan, or PMAY?";
        }
      }

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        id: "error",
        text: t("chatbot.error"),
        sender: "bot",
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = chatLang === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, y: 20, filter: "blur(10px)" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mb-4 w-[90vw] sm:w-[420px]"
          >
            <Card className="shadow-2xl border-primary/10 flex flex-col h-[550px] overflow-hidden bg-background/98 backdrop-blur-xl rounded-2xl ring-1 ring-black/5">
              <CardHeader className="bg-gradient-to-br from-[#1a1c1e] via-[#2c2e33] to-[#1a1c1e] p-5 text-white flex flex-row items-center justify-between space-y-0 shrink-0 border-b border-white/5 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/20 p-2 rounded-xl backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10">
                    <Bot className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex flex-col">
                    <CardTitle className="text-lg font-display font-bold tracking-tight text-white drop-shadow-sm">
                      {t("chatbot.name")}
                    </CardTitle>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      <span className="text-[10px] font-semibold opacity-70 uppercase tracking-widest text-white/90">AI Assistant</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setChatLang(chatLang === "en" ? "hi" : "en")}
                    className="h-6 px-2 text-[9px] font-black border border-white/20 hover:bg-white/10 text-white rounded-md ml-1 transition-all"
                  >
                    {chatLang === "en" ? "हिन्दी" : "ENGLISH"}
                  </Button>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setIsOpen(false)}
                  className="text-white/70 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all"
                >
                  <X className="h-5 w-5" />
                </Button>
              </CardHeader>

              <CardContent className="flex-1 p-0 overflow-hidden bg-[#f8f9fa]">
                <ScrollArea ref={scrollRef} className="h-full p-6">
                  <div className="space-y-6">
                    {messages.map((m) => (
                      <motion.div
                        key={m.id}
                        initial={{ opacity: 0, y: 10, x: m.sender === "user" ? 10 : -10 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
                        >
                          <div
                            className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-md transition-all ${
                              m.sender === "user"
                                ? "bg-primary text-white rounded-tr-none shadow-primary/20 font-medium"
                                : "bg-white text-slate-700 border border-slate-200/50 rounded-tl-none shadow-slate-200/40"
                            }`}
                          >
                            <div className="whitespace-pre-wrap">{formatText(m.text)}</div>
                          </div>
                          <span className="text-[9px] font-bold opacity-30 mt-2 px-1 uppercase tracking-wider text-slate-500">
                            {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                    {isLoading && (
                      <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        className="flex justify-start"
                      >
                        <div className="bg-white border border-primary/5 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm">
                          <div className="flex gap-1.5">
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-primary/40 rounded-full animate-bounce" />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>

              <CardFooter className="p-4 border-t bg-white/50 backdrop-blur-md flex gap-3 shrink-0">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={startListening}
                  disabled={isLoading || isListening}
                  className={`shrink-0 rounded-2xl h-11 w-11 transition-all duration-300 border-primary/10 shadow-sm ${
                    isListening 
                      ? "bg-red-50 border-red-200 text-red-500 animate-pulse ring-4 ring-red-50" 
                      : "hover:bg-primary/5 hover:text-primary hover:border-primary/20"
                  }`}
                >
                  {isListening ? <Loader2 className="h-5 w-5 animate-spin" /> : <Mic className="h-5 w-5" />}
                </Button>
                <div className="flex-1 relative group">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder={t("chatbot.placeholder")}
                    disabled={isLoading}
                    className="bg-muted/30 border-primary/5 focus-visible:ring-2 focus-visible:ring-primary/20 h-11 px-4 rounded-2xl transition-all group-hover:bg-muted/50"
                  />
                </div>
                <Button 
                  size="icon" 
                  onClick={() => handleSend()}
                  disabled={isLoading || !inputValue.trim()}
                  className="shrink-0 rounded-2xl h-11 w-11 shadow-lg shadow-primary/20 transition-all hover:translate-y-[-2px] hover:shadow-xl active:translate-y-0"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary text-primary-foreground h-16 w-16 rounded-3xl shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all duration-500 flex items-center justify-center group relative overflow-hidden ring-4 ring-white"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-primary to-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-7 w-7 relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="h-7 w-7 relative z-10" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default SahayataAI;
