export interface SchemeInfo {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  applySteps: string[];
  applyStepsHi: string[];
}

export const schemes: SchemeInfo[] = [
  {
    id: "MGNREGA",
    name: "MGNREGA — Rural Employment Guarantee",
    nameHi: "मनरेगा — ग्रामीण रोजगार गारंटी",
    description: "Guarantees 100 days of wage employment per year to rural households.",
    descriptionHi: "ग्रामीण परिवारों को प्रति वर्ष 100 दिन का वेतन रोजगार गारंटी।",
    applySteps: ["Visit your Gram Panchayat office", "Submit a written application for a job card", "Provide ID proof and passport photo", "Collect your Job Card within 15 days"],
    applyStepsHi: ["अपने ग्राम पंचायत कार्यालय जाएं", "जॉब कार्ड के लिए लिखित आवेदन दें", "पहचान पत्र और पासपोर्ट फोटो दें", "15 दिनों में जॉब कार्ड प्राप्त करें"],
  },
  {
    id: "PMAY",
    name: "PMAY — Housing for the Poor",
    nameHi: "प्रधानमंत्री आवास योजना — गरीबों के लिए आवास",
    description: "Financial assistance for building pucca houses for eligible families.",
    descriptionHi: "पात्र परिवारों को पक्का मकान बनाने के लिए वित्तीय सहायता।",
    applySteps: ["Visit nearest CSC or Gram Panchayat", "Fill PMAY-G application form", "Submit Aadhaar, income, and land documents", "Wait for verification and approval"],
    applyStepsHi: ["निकटतम CSC या ग्राम पंचायत जाएं", "PMAY-G आवेदन पत्र भरें", "आधार, आय और भूमि दस्तावेज जमा करें", "सत्यापन और स्वीकृति की प्रतीक्षा करें"],
  },
  {
    id: "PMJDY",
    name: "PMJDY — Financial Inclusion",
    nameHi: "प्रधानमंत्री जन धन योजना — वित्तीय समावेशन",
    description: "Zero-balance bank accounts with RuPay debit card and insurance.",
    descriptionHi: "RuPay डेबिट कार्ड और बीमा के साथ शून्य-शेष बैंक खाते।",
    applySteps: ["Visit any bank branch or Banking Correspondent", "Fill account opening form", "Submit Aadhaar or any valid ID", "Receive RuPay card and passbook"],
    applyStepsHi: ["किसी भी बैंक शाखा जाएं", "खाता खोलने का फॉर्म भरें", "आधार या कोई वैध पहचान पत्र दें", "RuPay कार्ड और पासबुक प्राप्त करें"],
  },
  {
    id: "PM-KISAN",
    name: "PM-KISAN — Farmer Income Support",
    nameHi: "पीएम-किसान — किसान आय सहायता",
    description: "₹6,000 per year direct income support for small and marginal farmers.",
    descriptionHi: "छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।",
    applySteps: ["Visit pmkisan.gov.in or CSC", "Register with Aadhaar, bank details, and land records", "Get verified by state/district officials", "Receive ₹2,000 every 4 months"],
    applyStepsHi: ["pmkisan.gov.in या CSC जाएं", "आधार, बैंक विवरण और भूमि रिकॉर्ड से पंजीकरण करें", "राज्य/जिला अधिकारियों से सत्यापन कराएं", "हर 4 महीने में ₹2,000 प्राप्त करें"],
  },
  {
    id: "NSAP",
    name: "NSAP — Pensions for Vulnerable Groups",
    nameHi: "राष्ट्रीय सामाजिक सहायता — कमजोर वर्गों के लिए पेंशन",
    description: "Monthly pensions for elderly, widows, and persons with disabilities.",
    descriptionHi: "बुजुर्गों, विधवाओं और विकलांग व्यक्तियों के लिए मासिक पेंशन।",
    applySteps: ["Apply at Gram Panchayat or Block office", "Submit age/disability/widow proof", "Provide BPL certificate and bank details", "Pension credited monthly after approval"],
    applyStepsHi: ["ग्राम पंचायत या ब्लॉक कार्यालय में आवेदन करें", "उम्र/विकलांगता/विधवा प्रमाण दें", "BPL प्रमाणपत्र और बैंक विवरण दें", "स्वीकृति के बाद मासिक पेंशन"],
  },
  {
    id: "PM-JAY",
    name: "Ayushman Bharat PM-JAY — Health Insurance",
    nameHi: "आयुष्मान भारत पीएम-जय — स्वास्थ्य बीमा",
    description: "₹5 lakh health insurance cover per family per year.",
    descriptionHi: "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवर।",
    applySteps: ["Check eligibility at mera.pmjay.gov.in", "Visit nearest Ayushman Mitra at empanelled hospital", "Verify identity with Aadhaar and ration card", "Get e-card for cashless treatment"],
    applyStepsHi: ["mera.pmjay.gov.in पर पात्रता जाँचें", "निकटतम आयुष्मान मित्र से मिलें", "आधार और राशन कार्ड से पहचान सत्यापित करें", "कैशलेस इलाज के लिए ई-कार्ड प्राप्त करें"],
  },
  {
    id: "PDS",
    name: "PDS — Subsidized Food Grains",
    nameHi: "सार्वजनिक वितरण प्रणाली — रियायती खाद्यान्न",
    description: "Subsidized rice, wheat, and other essentials through ration shops.",
    descriptionHi: "राशन दुकानों के माध्यम से रियायती चावल, गेहूं और अन्य आवश्यक वस्तुएं।",
    applySteps: ["Apply for ration card at Taluk office", "Submit family details and income proof", "Get ration card after verification", "Collect grains monthly from Fair Price Shop"],
    applyStepsHi: ["तालुक कार्यालय में राशन कार्ड के लिए आवेदन करें", "परिवार विवरण और आय प्रमाण दें", "सत्यापन के बाद राशन कार्ड प्राप्त करें", "उचित मूल्य दुकान से मासिक अनाज लें"],
  },
  {
    id: "NRLM",
    name: "NRLM — Rural Livelihoods Mission",
    nameHi: "राष्ट्रीय ग्रामीण आजीविका मिशन",
    description: "Self-help groups and skill training for rural women.",
    descriptionHi: "ग्रामीण महिलाओं के लिए स्वयं सहायता समूह और कौशल प्रशिक्षण।",
    applySteps: ["Contact your Block Development Officer", "Join or form a Self Help Group (SHG)", "Open SHG bank account", "Access revolving fund and skill training"],
    applyStepsHi: ["ब्लॉक विकास अधिकारी से संपर्क करें", "स्वयं सहायता समूह (SHG) में शामिल हों", "SHG बैंक खाता खोलें", "रिवॉल्विंग फंड और कौशल प्रशिक्षण प्राप्त करें"],
  },
  {
    id: "ICDS",
    name: "ICDS — Child and Mother Nutrition",
    nameHi: "ICDS — बाल और माता पोषण",
    description: "Nutrition, health checkups, and preschool education for children under 6 and mothers.",
    descriptionHi: "6 वर्ष से कम उम्र के बच्चों और माताओं के लिए पोषण, स्वास्थ्य जाँच और प्रीस्कूल शिक्षा।",
    applySteps: ["Visit nearest Anganwadi Centre", "Register pregnant woman or child under 6", "Submit Aadhaar and health records", "Receive supplementary nutrition and health checkups"],
    applyStepsHi: ["निकटतम आंगनवाड़ी केंद्र जाएं", "गर्भवती महिला या 6 वर्ष से कम बच्चे का पंजीकरण करें", "आधार और स्वास्थ्य रिकॉर्ड जमा करें", "पूरक पोषण और स्वास्थ्य जाँच प्राप्त करें"],
  },
];

export const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry",
];
