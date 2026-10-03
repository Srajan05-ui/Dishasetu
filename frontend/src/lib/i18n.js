export const translations = {
  en: {
    parent: "Parent", learner: "Learner",
    electrician: "Electrician", solar: "Solar Tech", plumber: "Plumber", mechanic: "Mechanic", welder: "Welder", dataEntry: "Data Entry",
    chatPlaceholder: "Ask Saathi a question...",
    proofTitle: "Real-World Data",
    placement: "Placement Rate", salary: "Starting Salary",
    back: "Back"
  },
  hi: {
    parent: "अभिभावक", learner: "छात्र",
    electrician: "इलेक्ट्रीशियन", solar: "सोलर टेक", plumber: "प्लंबर", mechanic: "मैकेनिक", welder: "वेल्डर", dataEntry: "डेटा एंट्री",
    chatPlaceholder: "साथी से सवाल पूछें...",
    proofTitle: "वास्तविक डेटा",
    placement: "प्लेसमेंट दर", salary: "शुरुआती वेतन",
    back: "पीछे"
  },
  mr: {
    parent: "पालक", learner: "विद्यार्थी",
    electrician: "इलेक्ट्रिशियन", solar: "सोलर टेक", plumber: "प्लंबर", mechanic: "मेकॅनिक", welder: "वेल्डर", dataEntry: "डेटा एंट्री",
    chatPlaceholder: "साथीला प्रश्न विचारा...",
    proofTitle: "वास्तविक डेटा",
    placement: "प्लेसमेंट दर", salary: "सुरुवातीचे वेतन",
    back: "मागे"
  }
};
export function t(lang, key) { return translations[lang][key] || key; }
