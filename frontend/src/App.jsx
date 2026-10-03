import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, BarChart, ShieldCheck, MapPin, Briefcase, GraduationCap, ChevronRight, Send, User, Bot, AlertTriangle, ArrowLeft } from 'lucide-react';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'https://dishasetu-backend.onrender.com/api' });

// --- UI COMPONENTS ---
const Navbar = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? "border-b-2 border-indigo-600 text-indigo-800 font-semibold" : "text-gray-600 hover:text-indigo-600 font-medium transition-colors";
  
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer">
            <div className="bg-indigo-600 p-2 rounded-lg"><GraduationCap className="text-white w-6 h-6" /></div>
            <Link to="/" className="text-2xl font-bold text-gray-900 tracking-tight">Dishasetu</Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/careers" className={isActive('/careers')}>Career Explorer</Link>
            <Link to="/counselling" className={isActive('/counselling')}>AI Counsellor</Link>
            <Link to="/family-decision" className={isActive('/family-decision')}>Family Mode</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Landing = () => (
  <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
        Better Career Decisions. <br/>
        <span className="text-indigo-600">Stronger Family Confidence.</span>
      </h1>
      <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto mb-10">
        Evidence-based vocational career counselling for learners and families. Discover verified opportunities, compare trades, and get AI-assisted guidance in your regional language.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link to="/counselling" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
          Start Career Guidance <ChevronRight className="w-5 h-5"/>
        </Link>
        <Link to="/careers" className="px-8 py-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold rounded-lg shadow-sm transition-all">
          Explore Careers
        </Link>
      </div>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="bg-blue-100 p-4 rounded-full mb-4"><ShieldCheck className="text-blue-700 w-8 h-8"/></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Verified Data</h3>
        <p className="text-gray-600">Access accurate, up-to-date salary and placement statistics for every vocational trade.</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="bg-green-100 p-4 rounded-full mb-4"><Users className="text-green-700 w-8 h-8"/></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Family Inclusive</h3>
        <p className="text-gray-600">Specialized modes to address parental concerns regarding income, safety, and social perception.</p>
      </div>
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
        <div className="bg-purple-100 p-4 rounded-full mb-4"><BookOpen className="text-purple-700 w-8 h-8"/></div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">AI & Human Support</h3>
        <p className="text-gray-600">Get instant AI guidance or effortlessly escalate to human counsellors when you need personal assistance.</p>
      </div>
    </div>
  </div>
);

const CareerExplorer = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const mockCareers = [
    { id: 1, name: "Electrician", sector: "Power", nsqf_level: 4, placement_rate: 85, salary_range: "₹18,000 - ₹25,000", verification_status: "VERIFIED" },
    { id: 2, name: "Fitter", sector: "Manufacturing", nsqf_level: 4, placement_rate: 82, salary_range: "₹16,000 - ₹22,000", verification_status: "VERIFIED" },
    { id: 3, name: "Welder", sector: "Manufacturing", nsqf_level: 3, placement_rate: 78, salary_range: "₹15,000 - ₹20,000", verification_status: "VERIFIED" },
    { id: 4, name: "Mechatronics Technician", sector: "Automotive", nsqf_level: 5, placement_rate: 92, salary_range: "₹25,000 - ₹35,000", verification_status: "VERIFIED" },
    { id: 5, name: "Solar Panel Installer", sector: "Renewable Energy", nsqf_level: 4, placement_rate: 88, salary_range: "₹20,000 - ₹28,000", verification_status: "VERIFIED" }
  ];

  useEffect(() => {
    api.get('/careers')
      .then(res => { 
        if(res.data && res.data.length > 0) {
          setCareers(res.data);
        } else {
          setCareers(mockCareers);
        }
        setLoading(false); 
      })
      .catch(err => { 
        console.error(err); 
        setCareers(mockCareers);
        setLoading(false); 
      });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"><ArrowLeft className="w-4 h-4 mr-1"/> Back</Link>
        <h2 className="text-3xl font-extrabold text-gray-900">Career Explorer</h2>
        <p className="mt-2 text-lg text-gray-600">Discover and compare vocational trades based on verified outcomes.</p>
      </div>
      
      {loading ? (
        <div className="text-center py-20"><div className="animate-pulse flex flex-col items-center"><div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div><p className="text-gray-500 font-medium">Loading trades...</p></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careers.map(c => (
            <div key={c.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow overflow-hidden flex flex-col">
              <div className="p-6 flex-1">
                <div className="flex justify-between items-start mb-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">{c.sector}</span>
                  {c.verification_status === 'VERIFIED' ? (
                     <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 px-2 py-1 rounded border border-green-200"><ShieldCheck className="w-3 h-3"/> Verified</span>
                  ) : (
                     <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 bg-amber-50 px-2 py-1 rounded border border-amber-200"><AlertTriangle className="w-3 h-3"/> {c.verification_status}</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{c.name}</h3>
                
                <div className="space-y-3 mt-4">
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span>NSQF Level {c.nsqf_level}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <BarChart className="w-4 h-4 text-gray-400" />
                    <span>Placement: <strong className="text-gray-900">{c.placement_rate}%</strong></span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span>Est. {c.salary_range}</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <button className="w-full text-indigo-600 font-semibold text-sm hover:text-indigo-800 flex justify-between items-center">
                  View Full Details <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const LANGUAGES = [
  { label: 'English', code: 'en-IN' },
  { label: 'हिंदी (Hindi)', code: 'hi-IN' },
  { label: 'मराठी (Marathi)', code: 'mr-IN' },
  { label: 'বাংলা (Bengali)', code: 'bn-IN' },
  { label: 'தமிழ் (Tamil)', code: 'ta-IN' },
  { label: 'తెలుగు (Telugu)', code: 'te-IN' },
  { label: 'ಕನ್ನಡ (Kannada)', code: 'kn-IN' },
  { label: 'മലയാളം (Malayalam)', code: 'ml-IN' },
  { label: 'ગુજરાતી (Gujarati)', code: 'gu-IN' },
  { label: 'ਪੰਜਾਬੀ (Punjabi)', code: 'pa-IN' },
  { label: 'ଓଡ଼ିଆ (Odia)', code: 'or-IN' },
];

const AICounselling = () => {
  const [messages, setMessages] = useState([{text: "Namaste! I am Disha, your AI Career Counsellor. I can help you and your family explore careers, understand earnings, or address safety concerns. You can type or use the 🎙️ microphone to speak in your language!", sender: "ai"}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const endOfMessagesRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Text-to-Speech ---
  const speak = (text) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = selectedLang;
    utter.rate = 0.95;
    utter.onstart = () => setIsSpeaking(true);
    utter.onend = () => setIsSpeaking(false);
    utter.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    window.speechSynthesis?.cancel();
    setIsSpeaking(false);
  };

  // --- Speech-to-Text ---
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.');
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = selectedLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, {text: userMsg, sender: "user"}]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.post('/counselling/message', { text: userMsg });
      if (res.data.reply && res.data.reply.includes('AI Error:')) {
        const fallback = "I am currently operating in backup offline mode due to a server connection issue. I highly recommend checking out trades like Mechatronics Technician and Solar Panel Installer in our Career Explorer!";
        setMessages(prev => [...prev, {text: fallback, sender: "ai"}]);
        if (autoSpeak) speak(fallback);
      } else {
        setMessages(prev => [...prev, {text: res.data.reply, sender: "ai"}]);
        if (autoSpeak) speak(res.data.reply);
      }
    } catch(err) {
      const fallback = "I am currently in offline mode. Please try again in a moment. Meanwhile, explore our Career Explorer for verified trade data!";
      setMessages(prev => [...prev, {text: fallback, sender: "ai"}]);
      if (autoSpeak) speak(fallback);
    } finally {
      setLoading(false);
    }
  };

  const currentLangLabel = LANGUAGES.find(l => l.code === selectedLang)?.label || 'English';

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 h-[calc(100vh-64px)] flex flex-col">
      {/* Back */}
      <div className="mb-3">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"><ArrowLeft className="w-4 h-4 mr-1"/> Back</Link>
      </div>

      {/* Header */}
      <div className="bg-white border border-gray-200 rounded-t-xl p-3 shadow-sm flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full"><Bot className="w-5 h-5 text-indigo-700"/></div>
          <div>
            <h2 className="text-base font-bold text-gray-900">Disha — AI Career Counsellor</h2>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online | Multilingual</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Auto-speak toggle */}
          <button
            onClick={() => setAutoSpeak(v => !v)}
            title={autoSpeak ? "Auto-speak ON" : "Auto-speak OFF"}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${autoSpeak ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
          >
            🔊 {autoSpeak ? 'Speaker ON' : 'Speaker OFF'}
          </button>

          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(v => !v)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
            >
              🌐 {currentLangLabel.split(' ')[0]}
            </button>
            {showLangMenu && (
              <div className="absolute right-0 top-9 z-50 bg-white border border-gray-200 rounded-xl shadow-xl w-52 max-h-72 overflow-y-auto">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => { setSelectedLang(lang.code); setShowLangMenu(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${selectedLang === lang.code ? 'text-indigo-700 font-semibold bg-indigo-50' : 'text-gray-700'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 space-y-4">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {m.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 mt-1"><Bot className="w-4 h-4 text-white"/></div>}
            <div className={`max-w-[80%] rounded-2xl p-3 shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
              <p className="text-[14px] leading-relaxed whitespace-pre-wrap">{m.text}</p>
              {m.sender === 'ai' && (
                <button
                  onClick={() => isSpeaking ? stopSpeaking() : speak(m.text)}
                  className="mt-2 text-xs text-indigo-500 hover:text-indigo-700 flex items-center gap-1"
                >
                  {isSpeaking ? '⏹ Stop' : '🔊 Listen'}
                </button>
              )}
            </div>
            {m.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center ml-2 flex-shrink-0 mt-1"><User className="w-4 h-4 text-gray-600"/></div>}
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2"><Bot className="w-4 h-4 text-white"/></div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-none p-4 flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Input bar */}
      <div className="bg-white border border-gray-200 rounded-b-xl p-3 shadow-sm">
        <form onSubmit={sendMessage} className="flex gap-2 items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading || isListening}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm"
            placeholder={isListening ? `Listening in ${currentLangLabel.split(' ')[0]}...` : "Type or speak your question..."}
          />
          {/* Mic button */}
          <button
            type="button"
            onClick={isListening ? stopListening : startListening}
            title={isListening ? "Stop listening" : `Speak in ${currentLangLabel}`}
            className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
          >
            🎙️
          </button>
          {/* Send button */}
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 text-sm flex-shrink-0"
          >
            <Send className="w-4 h-4"/>
          </button>
        </form>
        <p className="text-xs text-gray-400 mt-1.5 text-center">🌐 Mic language: <strong>{currentLangLabel}</strong> · Change via the language button above</p>
      </div>
    </div>
  );
};


const FamilyDecision = () => {
  const [activeTab, setActiveTab] = useState('safety');
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"><ArrowLeft className="w-4 h-4 mr-1"/> Back</Link>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900">Family Decision Room</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We understand that choosing a career is a family decision. Explore verified data to address common concerns about vocational trades.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button onClick={() => setActiveTab('safety')} className={`flex-1 py-4 px-6 text-center font-medium text-sm ${activeTab === 'safety' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>Safety & Environment</button>
          <button onClick={() => setActiveTab('earnings')} className={`flex-1 py-4 px-6 text-center font-medium text-sm ${activeTab === 'earnings' ? 'bg-green-50 text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>Earnings & Growth</button>
          <button onClick={() => setActiveTab('perception')} className={`flex-1 py-4 px-6 text-center font-medium text-sm ${activeTab === 'perception' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>Social Perception</button>
        </div>
        
        <div className="p-8">
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-full h-fit"><ShieldCheck className="w-6 h-6 text-blue-700" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Are vocational jobs safe?</h3>
                  <p className="text-gray-600 leading-relaxed">Modern manufacturing and technical roles strictly follow national safety protocols (e.g., OSHA standards). Facilities are equipped with advanced safety gear, automated machinery, and continuous monitoring. Many trades now involve operating computers and robotic systems rather than manual heavy lifting.</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-green-100 p-3 rounded-full h-fit"><BarChart className="w-6 h-6 text-green-700" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Can my child earn a good living?</h3>
                  <p className="text-gray-600 leading-relaxed">Yes. Skilled trades often offer starting salaries comparable to or higher than entry-level corporate jobs, with the added benefit of entering the workforce earlier without massive student debt. Experienced professionals in fields like mechatronics and advanced welding often earn premium wages.</p>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'perception' && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-purple-100 p-3 rounded-full h-fit"><Users className="w-6 h-6 text-purple-700" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is this a respected career path?</h3>
                  <p className="text-gray-600 leading-relaxed">Vocational careers are the backbone of modern infrastructure. Today’s tradespeople are highly skilled technologists, engineers, and specialists. The stigma of "blue-collar" work is rapidly fading as these roles become increasingly high-tech, essential, and highly respected in society.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/careers" element={<CareerExplorer />} />
            <Route path="/counselling" element={<AICounselling />} />
            <Route path="/family-decision" element={<FamilyDecision />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
