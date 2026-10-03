import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, BarChart, ShieldCheck, MapPin, Briefcase, GraduationCap, ChevronRight, Send, User, Bot, AlertTriangle } from 'lucide-react';
import axios from 'axios';

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api' });

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
  
  useEffect(() => {
    api.get('/careers')
      .then(res => { setCareers(res.data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
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

const AICounselling = () => {
  const [messages, setMessages] = useState([{text: "Namaste! I am your AI Career Counsellor. I can help you and your family explore careers, understand earnings, or address safety concerns. What would you like to know?", sender: "ai"}]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if(!input.trim()) return;
    
    const userMsg = input;
    setMessages(prev => [...prev, {text: userMsg, sender: "user"}]);
    setInput('');
    setLoading(true);
    
    try {
      const res = await api.post('/counselling/message', { text: userMsg });
      setMessages(prev => [...prev, {text: res.data.reply, sender: "ai"}]);
    } catch(err) {
      setMessages(prev => [...prev, {text: "I am having trouble connecting to the counselling server right now. Please try again later.", sender: "ai", error: true}]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-64px)] flex flex-col">
      <div className="bg-white border border-gray-200 rounded-t-xl p-4 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-100 p-2 rounded-full"><Bot className="w-6 h-6 text-indigo-700"/></div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">AI Career Counsellor</h2>
            <p className="text-xs text-green-600 font-medium flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500 inline-block"></span> Online | Evidence-based guidance</p>
          </div>
        </div>
        <button className="text-sm border border-gray-300 px-3 py-1.5 rounded hover:bg-gray-50 text-gray-700 font-medium transition-colors">
          Switch to Hindi
        </button>
      </div>
      
      <div className="flex-1 bg-gray-50 border-x border-gray-200 overflow-y-auto p-6 space-y-6">
        {messages.map((m, i) => (
          <div key={i} className={lex }>
            {m.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 mt-1"><Bot className="w-4 h-4 text-white"/></div>}
            <div className={max-w-[80%] rounded-2xl p-4 shadow-sm }>
              <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{m.text}</p>
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
      
      <div className="bg-white border border-gray-200 rounded-b-xl p-4 shadow-sm">
        <form onSubmit={sendMessage} className="flex gap-3">
          <input 
            type="text" 
            value={input} 
            onChange={e => setInput(e.target.value)} 
            disabled={loading}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow" 
            placeholder="E.g. Is the Fitter trade safe? What is the salary?" 
          />
          <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            Send <Send className="w-4 h-4"/>
          </button>
        </form>
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
            <Route path="/family-decision" element={<div className="p-8 text-center text-xl text-gray-500">Family Decision Room coming soon...</div>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
export default App;
