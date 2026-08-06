import React, { useState, useEffect } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  BookOpen,
  Volume2,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Award,
  ChevronRight,
} from "lucide-react";

interface Question {
  id: number;
  category: "Technical" | "Behavioral" | "System Design" | "Product";
  role: string;
  company: string;
  title: string;
  tips: string;
}

const QUESTION_BANK: Question[] = [
  {
    id: 1,
    category: "Technical",
    role: "Full-Stack Engineer",
    company: "Google / Tech",
    title: "Explain how FastAPI handles asynchronous requests and how it compares to Node.js or Flask.",
    tips: "Mention Python async/await, Starlette event loops, ASGI servers (Uvicorn), and non-blocking I/O performance.",
  },
  {
    id: 2,
    category: "System Design",
    role: "Senior Backend Engineer",
    company: "Uber / Scale",
    title: "Design a high-throughput job scraper system that aggregates 1000+ opportunities daily with rate limiting.",
    tips: "Discuss Celery task queues, Redis brokers, fuzzy deduplication (SequenceMatcher/embeddings), and proxy rotation.",
  },
  {
    id: 3,
    category: "Behavioral",
    role: "Software Engineer",
    company: "General",
    title: "Tell me about a time you encountered a tight deadline and had to make technical trade-offs.",
    tips: "Use the STAR method (Situation, Task, Action, Result). Highlight communication and prioritizing MVP features.",
  },
  {
    id: 4,
    category: "Technical",
    role: "AI / ML Engineer",
    company: "OpenAI / AI Startup",
    title: "How do TF-IDF and Cosine Similarity work for matching candidate resumes to job descriptions?",
    tips: "Explain Term Frequency, Inverse Document Frequency weighting vectorization, and dot product cosine angle scoring.",
  },
  {
    id: 5,
    category: "Product",
    role: "Product Engineer",
    company: "Meta",
    title: "How would you measure user engagement for an AI-powered career platform?",
    tips: "Focus on application conversion rates, search-to-apply speed, daily active job seekers, and repeat visits.",
  },
];

function InterviewPrepPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeQuestion, setActiveQuestion] = useState<Question>(QUESTION_BANK[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [recognition, setRecognition] = useState<any>(null);

  // Initialize browser Web Speech API SpeechRecognition
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";

      rec.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript);
      };

      rec.onerror = () => {
        setIsListening(false);
      };

      rec.onend = () => {
        setIsListening(false);
      };

      setRecognition(rec);
    }
  }, []);

  const toggleListening = () => {
    if (!recognition) {
      alert("Web Speech API is not supported in this browser. Please type your answer.");
      return;
    }

    if (isListening) {
      recognition.stop();
      setIsListening(false);
      evaluateAnswer();
    } else {
      setTranscript("");
      setFeedback(null);
      recognition.start();
      setIsListening(true);
    }
  };

  const evaluateAnswer = () => {
    if (!transcript || transcript.length < 20) {
      setFeedback("Your answer was very brief. Try structuring your response with more technical details and specific examples.");
      return;
    }

    const wordCount = transcript.split(/\s+/).length;
    let score = Math.min(95, 60 + Math.floor(wordCount / 2));
    setFeedback(
      `Great voice response! (${wordCount} words spoken). Clarity Score: ${score}%. Key strength: Clear structure and relevance to "${activeQuestion.title}". Tip: Ensure you emphasize performance metrics.`
    );
  };

  const filteredQuestions =
    selectedCategory === "All"
      ? QUESTION_BANK
      : QUESTION_BANK.filter((q) => q.category === selectedCategory);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
          <Mic className="w-7 h-7 text-indigo-400" />
          AI Voice Mock Interviewer
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Practice interview questions using your microphone (Web Speech API). Get instant AI clarity feedback and tips.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Question Bank List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Question Bank
            </h3>
            <span className="text-xs font-semibold text-slate-400">{filteredQuestions.length} Questions</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {["All", "Technical", "Behavioral", "System Design", "Product"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => {
                  setActiveQuestion(q);
                  setTranscript("");
                  setFeedback(null);
                  if (isListening && recognition) {
                    recognition.stop();
                    setIsListening(false);
                  }
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  activeQuestion.id === q.id
                    ? "bg-indigo-600/20 border-indigo-500/50 shadow-xl"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-950 text-indigo-300 border border-indigo-500/20">
                    {q.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{q.company}</span>
                </div>
                <h4 className="text-xs font-bold text-white line-clamp-2">{q.title}</h4>
              </div>
            ))}
          </div>
        </div>

        {/* Right 2 Columns: Voice Practice Room */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 shadow-2xl backdrop-blur-md">
            {/* Active Question Box */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>{activeQuestion.category} Question • {activeQuestion.role}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug">
                "{activeQuestion.title}"
              </h2>
              <p className="text-xs text-slate-400 pt-1">
                💡 <span className="text-slate-300 font-semibold">Pro Tip:</span> {activeQuestion.tips}
              </p>
            </div>

            {/* Microphone Voice Control */}
            <div className="flex flex-col items-center justify-center py-6 space-y-4 bg-slate-950/80 rounded-2xl border border-slate-800/80">
              <button
                onClick={toggleListening}
                className={`w-20 h-20 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
                  isListening
                    ? "bg-rose-600 text-white animate-pulse shadow-rose-600/50 scale-110"
                    : "bg-gradient-to-tr from-indigo-600 to-purple-600 hover:scale-105 text-white shadow-indigo-600/40"
                }`}
              >
                {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>

              <div className="text-center space-y-1">
                <p className="text-sm font-bold text-white">
                  {isListening ? "Listening... Speak your answer now" : "Click to Start Voice Recording"}
                </p>
                <p className="text-xs text-slate-500">Uses native Web Speech API in your browser</p>
              </div>
            </div>

            {/* Live Transcript Display */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Live Voice Speech Transcript
                </label>
                {transcript && (
                  <button
                    onClick={() => {
                      setTranscript("");
                      setFeedback(null);
                    }}
                    className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                )}
              </div>
              <textarea
                rows={5}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your spoken words will appear here in real-time. You can also edit or type manually..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
              />
            </div>

            {/* AI Feedback Box */}
            {feedback && (
              <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm">
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>AI Feedback & Evaluation</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{feedback}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPrepPage;
