import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, BarChart, ShieldCheck, MapPin, Briefcase, GraduationCap, ChevronRight, Send, User, Bot, AlertTriangle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

const MOCK_CAREERS = [
  { id: 1, name: "Electrician", sector: "Power", nsqf_level: 4, placement_rate: 85, salary_range: "₹18,000 - ₹25,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Electricians install, maintain, and repair electrical systems in homes, commercial buildings, and industrial facilities.", skills: ["Wiring & Circuits","Safety Protocols","Panel Installation","Fault Diagnosis","Motor Winding"], job_roles: ["Industrial Electrician","Residential Electrician","Solar Technician","Panel Operator"], career_progression: "Apprentice → Journeyman → Master Electrician → Electrical Contractor", safety_info: "Work involves standard electrical safety gear. Modern sites strictly follow IS:732 standards. Low risk with proper PPE.", higher_education: "B.Tech Electrical Engineering via lateral entry after diploma" },
  { id: 2, name: "Fitter", sector: "Manufacturing", nsqf_level: 4, placement_rate: 82, salary_range: "₹16,000 - ₹22,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Fitters assemble, install, and maintain mechanical parts and machinery in manufacturing plants.", skills: ["Precision Measurement","Lathe Operation","Blueprint Reading","CNC Basics","Hydraulics"], job_roles: ["Production Fitter","Maintenance Fitter","Tool Room Fitter","CNC Operator"], career_progression: "Fitter → Senior Fitter → Supervisor → Production Manager", safety_info: "Clean, structured factory environment. Safety helmets and gloves required. Covered by Factories Act 1948.", higher_education: "Diploma in Mechanical Engineering via NCVT certification" },
  { id: 3, name: "Welder", sector: "Manufacturing", nsqf_level: 3, placement_rate: 78, salary_range: "₹15,000 - ₹20,000", verification_status: "VERIFIED", duration: "1 Year", min_qualification: "Class 8", description: "Welders join metal parts using heat and specialized equipment in construction, automotive, and shipbuilding industries.", skills: ["MIG/TIG Welding","Arc Welding","Safety Practices","Metal Cutting","Blueprint Reading"], job_roles: ["Structural Welder","Pipeline Welder","Automotive Welder","Fabricator"], career_progression: "Helper → Welder → Senior Welder → Welding Inspector → Supervisor", safety_info: "Proper PPE (mask, gloves, apron) is mandatory and provided. Well-ventilated modern workshops minimize fume exposure.", higher_education: "Diploma in Welding Technology or Fabrication Engineering" },
  { id: 4, name: "Mechatronics Technician", sector: "Automotive", nsqf_level: 5, placement_rate: 92, salary_range: "₹25,000 - ₹35,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Mechatronics technicians integrate mechanical, electronic, and computer systems to maintain automated machinery and robots.", skills: ["PLC Programming","Robotics","Sensors & Actuators","CAD Basics","Troubleshooting"], job_roles: ["Automation Technician","Robotics Operator","Production Engineer","CNC Programmer"], career_progression: "Technician → Senior Technician → Team Lead → Automation Engineer", safety_info: "Modern, climate-controlled facilities. Industry 4.0 workplaces have highest safety standards globally.", higher_education: "B.Tech Mechatronics or Robotics via lateral entry" },
  { id: 5, name: "Solar Panel Installer", sector: "Renewable Energy", nsqf_level: 4, placement_rate: 88, salary_range: "₹20,000 - ₹28,000", verification_status: "VERIFIED", duration: "6 Months", min_qualification: "Class 8", description: "Solar technicians install, inspect, and maintain photovoltaic systems on rooftops and solar farms.", skills: ["PV Panel Installation","Electrical Wiring","Inverter Setup","Safety at Height","Net Metering"], job_roles: ["Solar Installer","O&M Technician","Solar Auditor","Project Supervisor"], career_progression: "Helper → Installer → O&M Technician → Site Supervisor → Project Manager", safety_info: "Height safety training is mandatory. Harnesses and helmets required. Outdoor work with flexible hours.", higher_education: "Diploma in Renewable Energy Technology" },
  { id: 6, name: "Plumber", sector: "Construction", nsqf_level: 4, placement_rate: 80, salary_range: "₹16,000 - ₹24,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Plumbers install and repair water supply, drainage, and sanitation systems in residential and commercial buildings.", skills: ["Pipe Fitting","Drainage Systems","Sanitation","Water Heating","Blueprint Reading"], job_roles: ["Residential Plumber","Industrial Plumber","Sanitation Engineer","Water Treatment Operator"], career_progression: "Helper → Plumber → Master Plumber → Plumbing Contractor", safety_info: "Standard PPE required. Modern plumbing uses safe, non-toxic materials. Good work-life balance.", higher_education: "Diploma in Civil Engineering (Sanitation)" },
  { id: 7, name: "COPA (Computer Operator)", sector: "IT & Computing", nsqf_level: 4, placement_rate: 87, salary_range: "₹14,000 - ₹22,000", verification_status: "VERIFIED", duration: "1 Year", min_qualification: "Class 10", description: "COPA professionals handle data entry, office software, programming basics, and computer maintenance.", skills: ["MS Office","Tally ERP","Basic Programming","Hardware Maintenance","Internet & Networking"], job_roles: ["Data Entry Operator","Office Assistant","Computer Lab Instructor","IT Support"], career_progression: "Operator → Senior Operator → IT Assistant → IT Manager", safety_info: "100% indoor, air-conditioned office environment. One of the safest trade options available.", higher_education: "BCA or B.Sc. Computer Science via lateral entry" },
  { id: 8, name: "Draughtsman Civil", sector: "Construction", nsqf_level: 5, placement_rate: 83, salary_range: "₹18,000 - ₹30,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Civil draughtsmen prepare technical drawings and plans for buildings, roads, bridges, and infrastructure using CAD.", skills: ["AutoCAD","Civil Engineering Drawing","Structural Plans","Site Survey","BIM Basics"], job_roles: ["CAD Draftsman","Site Engineer Assistant","Estimation Engineer","BIM Modeller"], career_progression: "Junior Draftsman → Senior Draftsman → Design Engineer → Project Engineer", safety_info: "Office-based, completely safe environment. Uses industry-standard software tools.", higher_education: "Diploma/B.Tech in Civil Engineering via lateral entry" },
  { id: 9, name: "Refrigeration & AC Mechanic", sector: "HVAC", nsqf_level: 4, placement_rate: 89, salary_range: "₹20,000 - ₹32,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "RAC mechanics install, service, and repair air conditioners, refrigerators, and industrial cooling systems.", skills: ["Refrigerant Handling","Compressor Servicing","Electrical Wiring","HVAC Ducting","Inverter AC"], job_roles: ["AC Technician","HVAC Engineer","Refrigeration Mechanic","Cold Storage Supervisor"], career_progression: "Helper → Technician → Senior Technician → HVAC Supervisor → Contractor", safety_info: "Indoor work, safe refrigerants (R-32, R-410A) widely used. High demand sector, especially in summer.", higher_education: "Diploma in HVAC & Refrigeration Technology" },
  { id: 10, name: "Turner", sector: "Manufacturing", nsqf_level: 4, placement_rate: 79, salary_range: "₹16,000 - ₹24,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Turners operate lathes and precision machining equipment to create metal components with exact specifications.", skills: ["Lathe Operation","CNC Turning","Precision Measurement","Tool Setting","Quality Control"], job_roles: ["Lathe Operator","CNC Turner","Tool Maker","Quality Inspector"], career_progression: "Helper → Turner → CNC Operator → Senior Machinist → Production Supervisor", safety_info: "Structured factory setting with safety guards on all machines. Ear protection and gloves provided.", higher_education: "Diploma in Mechanical Engineering or Production Technology" },
  { id: 11, name: "Carpenter", sector: "Construction", nsqf_level: 3, placement_rate: 76, salary_range: "₹15,000 - ₹22,000", verification_status: "VERIFIED", duration: "1 Year", min_qualification: "Class 8", description: "Carpenters construct, install, and repair structures and fixtures made of wood, plywood, and similar materials.", skills: ["Wood Joinery","Furniture Making","Blueprint Reading","Power Tools","Interior Fitting"], job_roles: ["Furniture Carpenter","Construction Carpenter","Interior Fitter","Cabinet Maker"], career_progression: "Helper → Carpenter → Master Carpenter → Contractor → Furniture Entrepreneur", safety_info: "Modern workshops have dust extraction and machine guards. Safety goggles and gloves mandatory.", higher_education: "Diploma in Interior Design or Wood Technology" },
  { id: 12, name: "Health Sanitary Inspector", sector: "Healthcare", nsqf_level: 4, placement_rate: 91, salary_range: "₹22,000 - ₹35,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Health sanitary inspectors ensure public health and hygiene standards in communities, hospitals, and food establishments.", skills: ["Disease Prevention","Food Safety Inspection","Sanitation Standards","Record Keeping","Community Health"], job_roles: ["Sanitary Inspector","Public Health Worker","Food Safety Officer","Hospital Hygiene Supervisor"], career_progression: "Sanitary Inspector → Senior Inspector → Health Supervisor → Public Health Officer", safety_info: "Government-regulated, structured job. Highly respected community service role with job security.", higher_education: "B.Sc. Public Health or Environmental Health" },
  { id: 13, name: "Electronics Mechanic", sector: "Electronics", nsqf_level: 4, placement_rate: 84, salary_range: "₹17,000 - ₹26,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Electronics mechanics repair and maintain consumer electronics, medical equipment, and industrial electronic devices.", skills: ["Circuit Diagnosis","Soldering","PCB Repair","Oscilloscope","Microcontroller Basics"], job_roles: ["Electronics Technician","Service Engineer","PCB Repair Expert","Medical Equipment Technician"], career_progression: "Technician → Senior Technician → Service Manager → Electronics Entrepreneur", safety_info: "Clean, climate-controlled workshop environment. ESD safety protocols followed. Very safe trade.", higher_education: "B.Tech in Electronics & Communication" },
  { id: 14, name: "Surveyor", sector: "Construction", nsqf_level: 5, placement_rate: 86, salary_range: "₹20,000 - ₹32,000", verification_status: "VERIFIED", duration: "2 Years", min_qualification: "Class 10", description: "Surveyors measure land boundaries and topography using advanced instruments for construction and urban planning.", skills: ["Total Station","GPS/GIS","AutoCAD","Land Measurement","Map Reading"], job_roles: ["Land Surveyor","GIS Analyst","Civil Survey Assistant","Urban Planner Assistant"], career_progression: "Junior Surveyor → Licensed Surveyor → Senior Surveyor → Project Lead", safety_info: "Outdoor fieldwork with structured safety protocols. High-demand profession for Smart City projects.", higher_education: "Diploma/B.Tech in Civil Engineering or Geomatics" },
  { id: 15, name: "Stenographer", sector: "Office & Administration", nsqf_level: 4, placement_rate: 81, salary_range: "₹18,000 - ₹28,000", verification_status: "VERIFIED", duration: "1 Year", min_qualification: "Class 10", description: "Stenographers record and transcribe spoken communications at high speed, working in courts, offices, and government departments.", skills: ["Shorthand Writing","MS Office","Typing Speed (80+ WPM)","Office Management","Communication"], job_roles: ["Court Stenographer","Personal Secretary","Transcriptionist","Government Clerk"], career_progression: "Stenographer → Senior Stenographer → Personal Assistant → Office Superintendent", safety_info: "100% office-based, government jobs available. Permanent employment with pension benefits.", higher_education: "B.A. in Office Management or Secretarial Practice" },
];

const CareerDetail = ({ career, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 px-4 py-8" onClick={onClose}>
    <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-auto" onClick={e => e.stopPropagation()}>
      <div className="bg-indigo-600 rounded-t-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">{career.sector}</span>
          <button onClick={onClose} className="text-white/70 hover:text-white text-2xl leading-none">×</button>
        </div>
        <h2 className="text-2xl font-extrabold">{career.name}</h2>
        <p className="text-indigo-200 text-sm mt-1">NSQF Level {career.nsqf_level} · {career.duration || '2 Years'} · Min: {career.min_qualification || 'Class 10'}</p>
      </div>
      <div className="p-6 space-y-5">
        <p className="text-gray-600 leading-relaxed">{career.description || 'A skilled vocational trade with excellent career prospects.'}</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
            <p className="text-2xl font-extrabold text-green-700">{career.placement_rate}%</p>
            <p className="text-xs text-green-600 font-medium mt-1">Placement Rate</p>
          </div>
          <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 text-center">
            <p className="text-base font-extrabold text-indigo-700">{career.salary_range}</p>
            <p className="text-xs text-indigo-600 font-medium mt-1">Monthly Salary (Est.)</p>
          </div>
        </div>
        {career.skills && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">🛠 Key Skills</h4>
            <div className="flex flex-wrap gap-2">{career.skills.map(s => <span key={s} className="bg-indigo-50 text-indigo-700 text-xs px-3 py-1 rounded-full border border-indigo-100">{s}</span>)}</div>
          </div>
        )}
        {career.job_roles && (
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">💼 Job Roles</h4>
            <div className="flex flex-wrap gap-2">{career.job_roles.map(r => <span key={r} className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">{r}</span>)}</div>
          </div>
        )}
        {career.career_progression && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <h4 className="font-semibold text-blue-900 mb-1">📈 Career Progression</h4>
            <p className="text-sm text-blue-800">{career.career_progression}</p>
          </div>
        )}
        {career.safety_info && (
          <div className="bg-green-50 border border-green-100 rounded-xl p-4">
            <h4 className="font-semibold text-green-900 mb-1 flex items-center gap-1"><ShieldCheck className="w-4 h-4"/> Safety & Environment</h4>
            <p className="text-sm text-green-800">{career.safety_info}</p>
          </div>
        )}
        {career.higher_education && (
          <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
            <h4 className="font-semibold text-purple-900 mb-1 flex items-center gap-1"><GraduationCap className="w-4 h-4"/> Higher Education Path</h4>
            <p className="text-sm text-purple-800">{career.higher_education}</p>
          </div>
        )}
        <Link to="/counselling" onClick={onClose} className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-colors">
          Ask Disha AI about this trade 🤖
        </Link>
      </div>
    </div>
  </div>
);

const CareerExplorer = () => {
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('All');

  useEffect(() => {
    api.get('/careers')
      .then(res => {
        if(res.data && res.data.length > 0) setCareers(res.data);
        else setCareers(MOCK_CAREERS);
        setLoading(false);
      })
      .catch(() => { setCareers(MOCK_CAREERS); setLoading(false); });
  }, []);

  const sectors = ['All', ...new Set(careers.map(c => c.sector))];
  const filtered = careers.filter(c => {
    const matchSector = sectorFilter === 'All' || c.sector === sectorFilter;
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.sector.toLowerCase().includes(search.toLowerCase());
    return matchSector && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {selected && <CareerDetail career={selected} onClose={() => setSelected(null)} />}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800 mb-4"><ArrowLeft className="w-4 h-4 mr-1"/> Back</Link>
        <h2 className="text-3xl font-extrabold text-gray-900">Career Explorer</h2>
        <p className="mt-2 text-lg text-gray-600">Discover and compare {careers.length} vocational trades based on verified outcomes.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <input type="text" placeholder="Search trades..." value={search} onChange={e => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400" />
        <div className="flex gap-2 flex-wrap">
          {sectors.map(s => (
            <button key={s} onClick={() => setSectorFilter(s)}
              className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors ${sectorFilter === s ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}>{s}</button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20"><div className="animate-pulse flex flex-col items-center"><div className="h-12 w-12 bg-indigo-200 rounded-full mb-4"></div><p className="text-gray-500 font-medium">Loading trades...</p></div></div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(c => (
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
                  <div className="flex items-center text-sm text-gray-600 gap-2"><Briefcase className="w-4 h-4 text-gray-400" /><span>NSQF Level {c.nsqf_level}</span></div>
                  <div className="flex items-center text-sm text-gray-600 gap-2"><BarChart className="w-4 h-4 text-gray-400" /><span>Placement: <strong className="text-gray-900">{c.placement_rate}%</strong></span></div>
                  <div className="flex items-center text-sm text-gray-600 gap-2"><BookOpen className="w-4 h-4 text-gray-400" /><span>Est. {c.salary_range}</span></div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-4 border-t border-gray-100">
                <button onClick={() => setSelected(c)} className="w-full text-indigo-600 font-semibold text-sm hover:text-indigo-800 flex justify-between items-center">
                  View Full Details <ChevronRight className="w-4 h-4"/>
                </button>
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="col-span-3 text-center py-16 text-gray-400">No trades found for "{search}". Try a different search or filter.</div>
          )}
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
      const res = await api.post('/counselling/message', { text: userMsg, lang: selectedLang });
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
              <div className="text-[14px] leading-relaxed prose prose-sm prose-indigo max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
              </div>
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
  const [messages, setMessages] = useState([{ text: "Namaste. I am Disha AI. Please ask any questions or concerns you have as a parent regarding your child's vocational career. You can also use the microphone to speak.", sender: "ai" }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLang, setSelectedLang] = useState('en-IN');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoSpeak, setAutoSpeak] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const endOfMessagesRef = useRef(null);
  const recognitionRef = useRef(null);

  const scrollToBottom = () => endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

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
    recognition.onerror = (event) => {
      console.error(event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { text: userMsg, sender: "user" }]);
    setInput('');
    setLoading(true);
    stopSpeaking();

    try {
      const res = await api.post('/counselling/message', { 
        text: `[Context: You are speaking to concerned Indian parents about their child's vocational career. Be reassuring, factual, and address safety/social stigma.] ${userMsg}`, 
        lang: selectedLang 
      });
      let replyText = res.data.reply;
      if (replyText && replyText.includes('AI Error:')) {
         replyText = "I am having trouble connecting. Vocational jobs are very safe today, please don't worry!";
      }
      setMessages(prev => [...prev, { text: replyText, sender: "ai" }]);
      if (autoSpeak) speak(replyText);
    } catch (err) {
      console.error(err);
      setMessages(prev => [...prev, { text: "I am having trouble connecting right now. Please try again later.", sender: "ai" }]);
    } finally {
      setLoading(false);
    }
  };

  const currentLangLabel = LANGUAGES.find(l => l.code === selectedLang)?.label || 'English';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-4">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"><ArrowLeft className="w-4 h-4 mr-1"/> Back</Link>
      </div>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold text-gray-900">Family Decision Room</h2>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">We understand that choosing a career is a family decision. Explore verified data to address common concerns about vocational trades.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Static info */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden h-fit">
          <div className="flex border-b border-gray-200">
            <button onClick={() => setActiveTab('safety')} className={`flex-1 py-4 px-2 text-center font-medium text-xs sm:text-sm ${activeTab === 'safety' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>Safety & Environment</button>
            <button onClick={() => setActiveTab('earnings')} className={`flex-1 py-4 px-2 text-center font-medium text-xs sm:text-sm ${activeTab === 'earnings' ? 'bg-green-50 text-green-700 border-b-2 border-green-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>Earnings & Growth</button>
            <button onClick={() => setActiveTab('perception')} className={`flex-1 py-4 px-2 text-center font-medium text-xs sm:text-sm ${activeTab === 'perception' ? 'bg-purple-50 text-purple-700 border-b-2 border-purple-700' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}>Social Perception</button>
          </div>
          
          <div className="p-6">
            {activeTab === 'safety' && (
              <div className="flex gap-4">
                <div className="bg-blue-100 p-3 rounded-full h-fit"><ShieldCheck className="w-6 h-6 text-blue-700" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Are vocational jobs safe?</h3>
                  <p className="text-gray-600 leading-relaxed">Modern manufacturing and technical roles strictly follow national safety protocols (e.g., OSHA standards). Facilities are equipped with advanced safety gear, automated machinery, and continuous monitoring. Many trades now involve operating computers and robotic systems rather than manual heavy lifting.</p>
                </div>
              </div>
            )}
            {activeTab === 'earnings' && (
              <div className="flex gap-4">
                <div className="bg-green-100 p-3 rounded-full h-fit"><BarChart className="w-6 h-6 text-green-700" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Can my child earn a good living?</h3>
                  <p className="text-gray-600 leading-relaxed">Yes. Skilled trades often offer starting salaries comparable to or higher than entry-level corporate jobs, with the added benefit of entering the workforce earlier without massive student debt. Experienced professionals in fields like mechatronics and advanced welding often earn premium wages.</p>
                </div>
              </div>
            )}
            {activeTab === 'perception' && (
              <div className="flex gap-4">
                <div className="bg-purple-100 p-3 rounded-full h-fit"><Users className="w-6 h-6 text-purple-700" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Is this a respected career path?</h3>
                  <p className="text-gray-600 leading-relaxed">Vocational careers are the backbone of modern infrastructure. Today’s tradespeople are highly skilled technologists, engineers, and specialists. The stigma of "blue-collar" work is rapidly fading as these roles become increasingly high-tech, essential, and highly respected in society.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: AI Chat for Parents */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col h-[600px]">
          <div className="bg-indigo-600 text-white rounded-t-xl p-3 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full"><Bot className="w-5 h-5"/></div>
              <div>
                <h3 className="font-bold">Ask Disha AI (Parent Mode)</h3>
                <p className="text-indigo-200 text-xs">Clear your doubts about your child's career</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={() => setAutoSpeak(v => !v)}
                title={autoSpeak ? "Auto-speak ON" : "Auto-speak OFF"}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${autoSpeak ? 'bg-white text-indigo-700' : 'bg-indigo-700/50 text-white border-transparent hover:bg-indigo-700'}`}
              >
                🔊 {autoSpeak ? 'Speaker ON' : 'Speaker OFF'}
              </button>

              <div className="relative">
                <button
                  onClick={() => setShowLangMenu(v => !v)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-transparent bg-indigo-700/50 text-white hover:bg-indigo-700"
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
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center mr-2 flex-shrink-0 mt-1"><Bot className="w-4 h-4 text-white"/></div>}
                <div className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'}`}>
                  <div className={`text-sm leading-relaxed prose prose-sm ${m.sender === 'user' ? 'prose-invert' : 'prose-indigo'} max-w-none`}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                  </div>
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

          <div className="p-3 bg-white border-t border-gray-200 rounded-b-xl">
            <form onSubmit={sendMessage} className="flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                disabled={loading || isListening}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow text-sm"
                placeholder={isListening ? `Listening in ${currentLangLabel.split(' ')[0]}...` : "Type or speak your concern (e.g., Is welding safe?)"}
              />
              <button
                type="button"
                onClick={isListening ? stopListening : startListening}
                title={isListening ? "Stop listening" : `Speak in ${currentLangLabel}`}
                className={`p-2.5 rounded-lg transition-all flex-shrink-0 ${isListening ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
              >
                🎙️
              </button>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white px-4 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 text-sm flex-shrink-0"
              >
                <Send className="w-4 h-4"/>
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-1 text-center">🌐 Mic/Voice language: <strong>{currentLangLabel}</strong></p>
          </div>
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
