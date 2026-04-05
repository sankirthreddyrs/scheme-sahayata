export interface SchemeInfo {
  id: string;
  name: string;
  nameHi: string;
  description: string;
  descriptionHi: string;
  applySteps: string[];
  applyStepsHi: string[];
  documents: string[];
  documentsHi: string[];
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
    documents: ["Aadhaar Card", "Job Card Application", "Passport size photograph", "Bank Passbook"],
    documentsHi: ["आधार कार्ड", "जॉब कार्ड आवेदन", "पासपोर्ट साइज फोटो", "बैंक पासबुक"],
  },
  {
    id: "PMAY",
    name: "PMAY — Housing for the Poor",
    nameHi: "प्रधानमंत्री आवास योजना — गरीबों के लिए आवास",
    description: "Financial assistance for building pucca houses for eligible families.",
    descriptionHi: "पात्र परिवारों को पक्का मकान बनाने के लिए वित्तीय सहायता।",
    applySteps: ["Visit nearest CSC or Gram Panchayat", "Fill PMAY-G application form", "Submit Aadhaar, income, and land documents", "Wait for verification and approval"],
    applyStepsHi: ["निकटतम CSC या ग्राम पंचायत जाएं", "PMAY-G आवेदन पत्र भरें", "आधार, आय और भूमि दस्तावेज जमा करें", "सत्यापन और स्वीकृति की प्रतीक्षा करें"],
    documents: ["Aadhaar Card", "Income Certificate", "Land Ownership Documents", "Bank Account Details", "BPL Card (if applicable)"],
    documentsHi: ["आधार कार्ड", "आय प्रमाण पत्र", "भूमि स्वामित्व दस्तावेज", "बैंक खाता विवरण", "BPL कार्ड (यदि लागू हो)"],
  },
  {
    id: "PMJDY",
    name: "PMJDY — Financial Inclusion",
    nameHi: "प्रधानमंत्री जन धन योजना — वित्तीय समावेशन",
    description: "Zero-balance bank accounts with RuPay debit card and insurance.",
    descriptionHi: "RuPay डेबिट कार्ड और बीमा के साथ शून्य-शेष बैंक खाते।",
    applySteps: ["Visit any bank branch or Banking Correspondent", "Fill account opening form", "Submit Aadhaar or any valid ID", "Receive RuPay card and passbook"],
    applyStepsHi: ["किसी भी बैंक शाखा जाएं", "खाता खोलने का फॉर्म भरें", "आधार या कोई वैध पहचान पत्र दें", "RuPay कार्ड और पासबुक प्राप्त करें"],
    documents: ["Aadhaar Card (Mandatory)", "PAN Card (Optional)", "Voter ID or NREGA Card", "Two Passport size photographs"],
    documentsHi: ["आधार कार्ड (अनिवार्य)", "पैन कार्ड (वैकल्पिक)", "वोटर आईडी या नरेगा कार्ड", "दो पासपोर्ट साइज फोटो"],
  },
  {
    id: "PM-KISAN",
    name: "PM-KISAN — Farmer Income Support",
    nameHi: "पीएम-किसान — किसान आय सहायता",
    description: "₹6,000 per year direct income support for small and marginal farmers.",
    descriptionHi: "छोटे और सीमांत किसानों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता।",
    applySteps: ["Visit pmkisan.gov.in or CSC", "Register with Aadhaar, bank details, and land records", "Get verified by state/district officials", "Receive ₹2,000 every 4 months"],
    applyStepsHi: ["pmkisan.gov.in या CSC जाएं", "आधार, बैंक विवरण और भूमि रिकॉर्ड से पंजीकरण करें", "राज्य/जिला अधिकारियों से सत्यापन कराएं", "हर 4 महीने में ₹2,000 प्राप्त करें"],
    documents: ["Aadhaar Card", "Land Record Documents (Khasra Khatauni)", "Bank Passbook", "Mobile Number linked with Aadhaar"],
    documentsHi: ["आधार कार्ड", "भूमि रिकॉर्ड दस्तावेज (खसरा खतौनी)", "बैंक पासबुक", "आधार से लिंक मोबाइल नंबर"],
  },
  {
    id: "NSAP",
    name: "NSAP — Pensions for Vulnerable Groups",
    nameHi: "राष्ट्रीय सामाजिक सहायता — कमजोर वर्गों के लिए पेंशन",
    description: "Monthly pensions for elderly, widows, and persons with disabilities.",
    descriptionHi: "बुजुर्गों, विधवाओं और विकलांग व्यक्तियों के लिए मासिक पेंशन।",
    applySteps: ["Apply at Gram Panchayat or Block office", "Submit age/disability/widow proof", "Provide BPL certificate and bank details", "Pension credited monthly after approval"],
    applyStepsHi: ["ग्राम पंचायत या ब्लॉक कार्यालय में आवेदन करें", "उम्र/विकलांगता/विधवा प्रमाण दें", "BPL प्रमाणपत्र और बैंक विवरण दें", "स्वीकृति के बाद मासिक पेंशन"],
    documents: ["Aadhaar Card", "Age Proof (Birth Certificate/Voter ID)", "Disability Certificate (for IGNDPS)", "Death Certificate of Spouse (for IGNWPS)", "BPL Card"],
    documentsHi: ["आधार कार्ड", "आयु प्रमाण (जन्म प्रमाण पत्र/वोटर आईडी)", "विकलांगता प्रमाण पत्र", "पति/पत्नी का मृत्यु प्रमाण पत्र", "BPL कार्ड"],
  },
  {
    id: "PM-JAY",
    name: "Ayushman Bharat PM-JAY — Health Insurance",
    nameHi: "आयुष्मान भारत पीएम-जय — स्वास्थ्य बीमा",
    description: "₹5 lakh health insurance cover per family per year.",
    descriptionHi: "प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवर।",
    applySteps: ["Check eligibility at mera.pmjay.gov.in", "Visit nearest Ayushman Mitra at empanelled hospital", "Verify identity with Aadhaar and ration card", "Get e-card for cashless treatment"],
    applyStepsHi: ["mera.pmjay.gov.in पर पात्रता जाँचें", "निकटतम आयुष्मान मित्र से मिलें", "आधार और राशन कार्ड से पहचान सत्यापित करें", "कैशलेस इलाज के लिए ई-कार्ड प्राप्त करें"],
    documents: ["Aadhaar Card", "Ration Card", "Identity Proof", "Family Member Identification"],
    documentsHi: ["आधार कार्ड", "राशन कार्ड", "पहचान प्रमाण", "परिवार के सदस्य की पहचान"],
  },
  {
    id: "PDS",
    name: "PDS — Subsidized Food Grains",
    nameHi: "सार्वजनिक वितरण प्रणाली — रियायती खाद्यान्न",
    description: "Subsidized rice, wheat, and other essentials through ration shops.",
    descriptionHi: "राशन दुकानों के माध्यम से रियायती चावल, गेहूं और अन्य आवश्यक वस्तुएं।",
    applySteps: ["Apply for ration card at Taluk office", "Submit family details and income proof", "Get ration card after verification", "Collect grains monthly from Fair Price Shop"],
    applyStepsHi: ["तालुक कार्यालय में राशन कार्ड के लिए आवेदन करें", "परिवार विवरण और आय प्रमाण दें", "सत्यापन के बाद राशन कार्ड प्राप्त करें", "उचित मूल्य दुकान से मासिक अनाज लें"],
    documents: ["Income Certificate", "Aadhaar Card of all family members", "Residence Proof", "Passport size photograph of Head of Family"],
    documentsHi: ["आय प्रमाण पत्र", "परिवार के सभी सदस्यों का आधार कार्ड", "निवास प्रमाण पत्र", "परिवार के मुखिया का पासपोर्ट साइज फोटो"],
  },
  {
    id: "NRLM",
    name: "NRLM — Rural Livelihoods Mission",
    nameHi: "राष्ट्रीय ग्रामीण आजीविका मिशन",
    description: "Self-help groups and skill training for rural women.",
    descriptionHi: "ग्रामीण महिलाओं के लिए स्वयं सहायता समूह और कौशल प्रशिक्षण।",
    applySteps: ["Contact your Block Development Officer", "Join or form a Self Help Group (SHG)", "Open SHG bank account", "Access revolving fund and skill training"],
    applyStepsHi: ["ब्लॉक विकास अधिकारी से संपर्क करें", "स्वयं सहायता समूह (SHG) में शामिल हों", "SHG बैंक खाता खोलें", "रिवॉल्विंग फंड और कौशल प्रशिक्षण प्राप्त करें"],
    documents: ["Aadhaar Card", "BPL Card", "Residence Proof", "Bank Account Details of SHG"],
    documentsHi: ["आधार कार्ड", "BPL कार्ड", "निवास प्रमाण पत्र", "SHG का बैंक खाता विवरण"],
  },
  {
    id: "ICDS",
    name: "ICDS — Child and Mother Nutrition",
    nameHi: "ICDS — बाल और माता पोषण",
    description: "Nutrition, health checkups, and preschool education for children under 6 and mothers.",
    descriptionHi: "6 वर्ष से कम उम्र के बच्चों और माताओं के लिए पोषण, स्वास्थ्य जाँच और प्रीस्कूल शिक्षा।",
    applySteps: ["Visit nearest Anganwadi Centre", "Register pregnant woman or child under 6", "Submit Aadhaar and health records", "Receive supplementary nutrition and health checkups"],
    applyStepsHi: ["निकटतम आंगनवाड़ी केंद्र जाएं", "गर्भवती महिला या 6 वर्ष से कम बच्चे का पंजीकरण करें", "आधार और स्वास्थ्य रिकॉर्ड जमा करें", "पूरक पोषण और स्वास्थ्य जाँच प्राप्त करें"],
    documents: ["Aadhaar Card of Mother/Child", "Birth Certificate of Child", "MCP Card (Mother and Child Protection Card)", "Ration Card"],
    documentsHi: ["माता/बच्चे का आधार कार्ड", "बच्चे का जन्म प्रमाण पत्र", "MCP कार्ड", "राशन कार्ड"],
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

export const stateDistricts: Record<string, string[]> = {
  "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "Srikakulam", "Sri Potti Sriramulu Nellore", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
  "Arunachal Pradesh": ["Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", "Lower Siang", "Lower Subansiri", "Namsai", "Pakke Kessang", "Papum Pare", "Shi Yomi", "Siang", "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"],
  "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
  "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
  "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udepur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
  "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
  "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
  "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"],
  "Karnataka": [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban",
    "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga",
    "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan",
    "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal",
    "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga",
    "Tumakuru", "Udupi", "Uttara Kannada", "Vijayapura", "Yadgir"
  ],
  "Kerala": ["Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"],
  "Madhya Pradesh": ["Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur", "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", "Dhule", "Gadchiroli",
    "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", "Mumbai Suburban", "Nagpur", "Nanded",
    "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara",
    "Sindhudurg", "Solapur", "Thane", "Wardha", "Washim", "Yavatmal"
  ],
  "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"],
  "Meghalaya": ["East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", "West Jaintia Hills", "West Khasi Hills"],
  "Mizoram": ["Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Saitual", "Serchhip"],
  "Nagaland": ["Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"],
  "Odisha": ["Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Baudh", "Cuttack", "Deogarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
  "Punjab": ["Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Mansa", "Moga", "Muktsar", "Pathankot", "Patiala", "Rupnagar", "Sahibzada Ajit Singh Nagar", "Sangrur", "Shahid Bhagat Singh Nagar", "Tarn Taran"],
  "Rajasthan": ["Ajmer", "Alwar", "Banswara", "Baran", "Barmer", "Bharatpur", "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Dholpur", "Dungarpur", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Karauli", "Kota", "Nagaur", "Pali", "Pratapgarh", "Rajsamand", "Sawai Madhopur", "Sikar", "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"],
  "Sikkim": ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
  "Tamil Nadu": ["Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", "Tiruppur", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Vellore", "Viluppuram", "Virudhunagar"],
  "Telangana": ["Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", "Warangal Urban", "Yadadri Bhuvanagiri"],
  "Tripura": ["Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Prayagraj", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", "Baghpat",
    "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bijnor", "Budaun",
    "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar",
    "Ghaziabad", "Ghazipur", "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur",
    "Jhansi", "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kheri", "Kushinagar", "Lalitpur", "Lucknow",
    "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", "Moradabad", "Muzaffarnagar", "Pilibhit",
    "Pratapgarh", "Raebareli", "Rampur", "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar",
    "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  "Uttarakhand": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"],
  "West Bengal": ["Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Malda", "Murshidabad", "Nadia", "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", "Purulia", "South 24 Parganas", "Uttar Dinajpur"],
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Dadra and Nagar Haveli", "Daman", "Diu"],
  "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"],
  "Jammu and Kashmir": ["Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", "Srinagar", "Udhampur"],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
};
