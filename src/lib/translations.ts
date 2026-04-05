export type Language = "en" | "hi";

export const translations: Record<string, Record<Language, string>> = {
  "app.title": { en: "BeneficiaryChecker", hi: "लाभार्थी जाँच" },
  "app.tagline": { en: "Know your rights. Claim what is yours.", hi: "अपने अधिकार जानें। जो आपका है, उसे पाएं।" },
  "app.tagline.hindi": { en: "अपने अधिकार जानें।", hi: "अपने अधिकार जानें।" },
  "footer.text": { en: "Powered by AI — Free to use — Your data is private", hi: "AI द्वारा संचालित — मुफ्त — आपका डेटा सुरक्षित है" },

  "card1.title": { en: "Am I eligible?", hi: "क्या मैं पात्र हूँ?" },
  "card1.subtitle": { en: "Answer a few questions and we will check all 9 government schemes for you automatically", hi: "कुछ सवालों के जवाब दें और हम स्वचालित रूप से 9 सरकारी योजनाओं की जाँच करेंगे" },
  "card1.button": { en: "Start Screening", hi: "जाँच शुरू करें" },
  "card1.heading": { en: "Check My Eligibility", hi: "मेरी पात्रता जाँचें" },

  "card2.title": { en: "I know which scheme I want", hi: "मुझे पता है कौन सी योजना चाहिए" },
  "card2.subtitle": { en: "Choose a scheme directly and check if you qualify", hi: "सीधे योजना चुनें और जाँचें कि आप पात्र हैं" },
  "card2.button": { en: "Choose Scheme", hi: "योजना चुनें" },
  "card2.heading": { en: "Apply for a Scheme", hi: "योजना के लिए आवेदन" },

  "screen.title": { en: "Tell us about yourself", hi: "अपने बारे में बताएं" },
  "screen.subtitle": { en: "We will check all 9 schemes in seconds", hi: "हम सेकंडों में 9 योजनाओं की जाँच करेंगे" },
  "step1.title": { en: "Personal Details", hi: "व्यक्तिगत विवरण" },
  "step2.title": { en: "Economic Details", hi: "आर्थिक विवरण" },
  "step3.title": { en: "Property & Special Categories", hi: "संपत्ति और विशेष श्रेणियाँ" },

  "field.name": { en: "Full Name", hi: "पूरा नाम" },
  "field.age": { en: "Age", hi: "उम्र" },
  "field.gender": { en: "Gender", hi: "लिंग" },
  "field.state": { en: "State", hi: "राज्य" },
  "field.district": { en: "District", hi: "जिला" },
  "field.caste": { en: "Caste Category", hi: "जाति श्रेणी" },
  "field.income": { en: "Annual Household Income (₹)", hi: "वार्षिक घरेलू आय (₹)" },
  "field.bpl": { en: "Do you have a BPL card?", hi: "क्या आपके पास BPL कार्ड है?" },
  "field.ration": { en: "Do you have a Ration Card?", hi: "क्या आपके पास राशन कार्ड है?" },
  "field.bank": { en: "Do you have a Bank Account?", hi: "क्या आपका बैंक खाता है?" },
  "field.familySize": { en: "Family Size", hi: "परिवार का आकार" },
  "field.occupation": { en: "Occupation", hi: "व्यवसाय" },
  "field.land": { en: "Do you own land?", hi: "क्या आपके पास जमीन है?" },
  "field.landAcres": { en: "How many acres?", hi: "कितने एकड़?" },
  "field.puccaHouse": { en: "Do you have a pucca (concrete) house?", hi: "क्या आपका पक्का मकान है?" },
  "field.farmer": { en: "Are you a farmer?", hi: "क्या आप किसान हैं?" },
  "field.disability": { en: "Do you have a disability?", hi: "क्या आपको कोई विकलांगता है?" },
  "field.pregnant": { en: "Is any woman in the household pregnant or lactating?", hi: "क्या घर में कोई महिला गर्भवती या स्तनपान करा रही है?" },

  "gender.male": { en: "Male", hi: "पुरुष" },
  "gender.female": { en: "Female", hi: "महिला" },
  "gender.other": { en: "Other", hi: "अन्य" },

  "caste.general": { en: "General", hi: "सामान्य" },
  "caste.obc": { en: "OBC", hi: "ओबीसी" },
  "caste.sc": { en: "SC", hi: "अनुसूचित जाति" },
  "caste.st": { en: "ST", hi: "अनुसूचित जनजाति" },

  "occ.farmer": { en: "Farmer", hi: "किसान" },
  "occ.daily": { en: "Daily Wage Worker", hi: "दैनिक मजदूर" },
  "occ.self": { en: "Self Employed", hi: "स्वरोजगार" },
  "occ.unemployed": { en: "Unemployed", hi: "बेरोजगार" },
  "occ.govt": { en: "Government Employee", hi: "सरकारी कर्मचारी" },
  "occ.other": { en: "Other", hi: "अन्य" },

  "btn.next": { en: "Next", hi: "आगे" },
  "btn.prev": { en: "Previous", hi: "पीछे" },
  "btn.submit": { en: "Check My Eligibility →", hi: "मेरी पात्रता जाँचें →" },
  "btn.back": { en: "Back", hi: "वापस" },

  "loading.text": { en: "Checking 9 schemes for you...", hi: "आपके लिए 9 योजनाओं की जाँच हो रही है..." },

  "schemes.title": { en: "Choose a Scheme", hi: "योजना चुनें" },
  "schemes.check": { en: "Check Eligibility →", hi: "पात्रता जाँचें →" },

  "results.eligible": { en: "You qualify for {count} schemes!", hi: "आप {count} योजनाओं के लिए पात्र हैं!" },
  "results.none": { en: "You don't qualify yet — but here's why", hi: "आप अभी पात्र नहीं हैं — लेकिन यहाँ कारण है" },
  "results.isEligible": { en: "You are eligible", hi: "आप पात्र हैं" },
  "results.notEligible": { en: "Not eligible", hi: "पात्र नहीं" },
  "results.howToApply": { en: "How to Apply →", hi: "आवेदन कैसे करें →" },
  "results.gapAnalysis": { en: "Gap Analysis", hi: "अंतर विश्लेषण" },
  "results.tryInstead": { en: "Try Instead:", hi: "इसके बजाय प्रयास करें:" },
  "results.download": { en: "Download Eligibility Card", hi: "पात्रता कार्ड डाउनलोड करें" },
  "results.startOver": { en: "Start Over", hi: "फिर से शुरू करें" },
  "results.requiredDocs": { en: "Required Documents", hi: "आवश्यक दस्तावेज" },
  "results.steps": { en: "Application Steps", hi: "आवेदन के चरण" },

  "yes": { en: "Yes", hi: "हाँ" },
  "no": { en: "No", hi: "नहीं" },
  "step": { en: "Step", hi: "चरण" },
  "of": { en: "of", hi: "का" },
};

export const t = (key: string, lang: Language, vars?: Record<string, string>): string => {
  let text = translations[key]?.[lang] || translations[key]?.en || key;
  if (vars) {
    Object.entries(vars).forEach(([k, v]) => {
      text = text.replace(`{${k}}`, v);
    });
  }
  return text;
};
