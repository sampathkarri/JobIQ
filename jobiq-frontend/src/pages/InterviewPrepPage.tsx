import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Sparkles,
  BookOpen,
  RotateCcw,
  Award,
  Timer,
  CheckCircle,
  XCircle,
  ChevronRight,
  Brain,
  Target,
  TrendingUp,
  Lightbulb,
  Globe,
  Loader2,
} from "lucide-react";
import { interviewPrepApi } from "../api/interviewPrep";

interface Question {
  id: number;
  category: "Technical" | "Behavioral" | "System Design" | "HR" | "DSA";
  role: string;
  difficulty: "Easy" | "Medium" | "Hard";
  title: string;
  tips: string;
  keywords: string[];
  ideal_points: string[];
  company?: string;
  source_url?: string;
}

const INITIAL_QUESTION_BANK: Question[] = [
  {
    id: 1, category: "Technical", role: "Full-Stack Engineer", difficulty: "Medium",
    title: "Explain how FastAPI handles asynchronous requests and how it compares to Flask.",
    tips: "Mention Python async/await, Starlette event loops, ASGI servers (Uvicorn), and non-blocking I/O.",
    keywords: ["async", "await", "uvicorn", "asgi", "starlette", "non-blocking", "event loop"],
    ideal_points: ["Async/await syntax", "ASGI vs WSGI", "Uvicorn server", "Performance benefits", "Comparison with Flask"],
    company: "Google",
  },
  {
    id: 2, category: "System Design", role: "Backend Engineer", difficulty: "Hard",
    title: "Design a high-throughput job scraper system that aggregates 1000+ listings daily with deduplication.",
    tips: "Discuss Celery task queues, Redis brokers, fuzzy deduplication (SequenceMatcher), and rate limiting.",
    keywords: ["celery", "redis", "queue", "deduplication", "rate limit", "scraper", "scheduler"],
    ideal_points: ["Task queue architecture", "Redis as broker", "Deduplication strategy", "Rate limiting", "Error handling"],
    company: "Uber",
  },
  {
    id: 3, category: "Behavioral", role: "Software Engineer", difficulty: "Easy",
    title: "Tell me about a time you encountered a tight deadline and had to make technical trade-offs.",
    tips: "Use the STAR method: Situation, Task, Action, Result. Highlight communication and prioritizing MVP.",
    keywords: ["star", "situation", "task", "action", "result", "deadline", "trade-off", "priority"],
    ideal_points: ["STAR structure", "Specific situation", "Clear trade-offs made", "Quantifiable result", "Learnings"],
    company: "Amazon",
  },
  {
    id: 4, category: "HR", role: "Any Role", difficulty: "Easy",
    title: "Tell me about yourself and walk me through your resume.",
    tips: "Keep it under 2 minutes. Structure: current project → key skills → why you're here.",
    keywords: ["project", "built", "developed", "skills", "passion", "achieve", "learn", "result"],
    ideal_points: ["Clear narrative", "Relevant highlights", "Key technical skills", "Recent project", "Why this role"],
    company: "General",
  },
  {
    id: 5, category: "DSA", role: "SDE", difficulty: "Medium",
    title: "Explain how you would find two numbers in an array that add up to a target sum efficiently.",
    tips: "Describe the brute force O(n²) approach, then optimize with a HashMap to get O(n) time complexity.",
    keywords: ["hashmap", "dictionary", "two pointer", "o(n)", "complement", "brute force", "optimize", "time complexity"],
    ideal_points: ["Brute force mention", "HashMap optimization", "Time complexity", "Space complexity", "Edge cases"],
    company: "Microsoft",
  },
];

const CATEGORY_COLORS: Record<string, string> = {
  Technical: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  Behavioral: "bg-amber-500/10 text-amber-300 border-amber-500/20",
  "System Design": "bg-purple-500/10 text-purple-300 border-purple-500/20",
  HR: "bg-teal-500/10 text-teal-300 border-teal-500/20",
  DSA: "bg-rose-500/10 text-rose-300 border-rose-500/20",
};

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "text-emerald-400",
  Medium: "text-amber-400",
  Hard: "text-rose-400",
};

interface FeedbackResult {
  score: number;
  keywordsFound: string[];
  keywordsMissed: string[];
  pointsCovered: string[];
  pointsMissed: string[];
  wordCount: number;
  verdict: string;
  suggestion: string;
}

function analyzeAnswer(transcript: string, question: Question): FeedbackResult {
  const lower = transcript.toLowerCase();
  const words = transcript.trim().split(/\s+/);
  const wordCount = words.length;

  const keywordsFound = question.keywords.filter((kw) => lower.includes(kw.toLowerCase()));
  const keywordsMissed = question.keywords.filter((kw) => !lower.includes(kw.toLowerCase()));

  const pointsCovered = question.ideal_points.filter((pt) =>
    pt.toLowerCase().split(" ").some((w) => w.length > 4 && lower.includes(w))
  );
  const pointsMissed = question.ideal_points.filter((pt) => !pointsCovered.includes(pt));

  const keywordScore = (keywordsFound.length / Math.max(question.keywords.length, 1)) * 35;
  const pointScore = (pointsCovered.length / Math.max(question.ideal_points.length, 1)) * 40;
  const lengthScore = Math.min(25, (wordCount / 150) * 25);
  const score = Math.min(99, Math.round(keywordScore + pointScore + lengthScore));

  let verdict = "";
  let suggestion = "";

  if (score >= 80) {
    verdict = "Excellent Answer! 🎉";
    suggestion = "Great structure and depth. In a real interview, end with a concrete example or number.";
  } else if (score >= 60) {
    verdict = "Good Answer 👍";
    suggestion = `You covered the basics well. Try to also mention: ${keywordsMissed.slice(0, 3).join(", ")}.`;
  } else if (score >= 40) {
    verdict = "Needs Improvement 🔧";
    suggestion = `Your answer lacked key concepts. Focus on: ${question.ideal_points.slice(0, 3).join(", ")}.`;
  } else {
    verdict = "Incomplete Answer ⚠️";
    suggestion = `Too brief or off-topic. Use the Pro Tip and cover: ${question.ideal_points.join(", ")}.`;
  }

  return { score, keywordsFound, keywordsMissed, pointsCovered, pointsMissed, wordCount, verdict, suggestion };
}

function InterviewPrepPage() {
  const [questions, setQuestions] = useState<Question[]>(INITIAL_QUESTION_BANK);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [activeQuestion, setActiveQuestion] = useState<Question>(INITIAL_QUESTION_BANK[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapeSuccessMsg, setScrapeSuccessMsg] = useState<string | null>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = "en-US";
      rec.onresult = (event: any) => {
        let full = "";
        for (let i = 0; i < event.results.length; i++) {
          full += event.results[i][0].transcript;
        }
        setTranscript(full);
      };
      rec.onerror = () => setIsListening(false);
      rec.onend = () => setIsListening(false);
      setRecognition(rec);
    }
  }, []);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => setTimer((t) => t + 1), 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isTimerRunning]);

  const formatTimer = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const toggleListening = () => {
    if (!recognition) {
      alert("Web Speech API not supported. Please use Chrome or Edge and type your answer manually.");
      return;
    }
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setIsTimerRunning(false);
      const result = analyzeAnswer(transcript, activeQuestion);
      setFeedback(result);
      setSessionScores((prev) => [...prev, result.score]);
    } else {
      setTranscript("");
      setFeedback(null);
      setTimer(0);
      recognition.start();
      setIsListening(true);
      setIsTimerRunning(true);
    }
  };

  const handleReset = () => {
    if (isListening && recognition) recognition.stop();
    setIsListening(false);
    setIsTimerRunning(false);
    setTimer(0);
    setTranscript("");
    setFeedback(null);
  };

  const selectQuestion = (q: Question) => {
    handleReset();
    setActiveQuestion(q);
  };

  const nextQuestion = () => {
    const filtered = filteredQuestions;
    const idx = filtered.findIndex((q) => q.id === activeQuestion.id);
    const next = filtered[(idx + 1) % filtered.length];
    selectQuestion(next);
  };

  const handleScrapeInterviewBit = async () => {
    setIsScraping(true);
    setScrapeSuccessMsg(null);
    try {
      const data = await interviewPrepApi.fetchInterviewBitQuestions();
      if (data.questions && data.questions.length > 0) {
        setQuestions((prev) => {
          const existingTitles = new Set(prev.map((q) => q.title.toLowerCase()));
          const newQuestions = data.questions.filter((q) => !existingTitles.has(q.title.toLowerCase()));
          return [...prev, ...newQuestions];
        });
        setScrapeSuccessMsg(`Successfully scraped ${data.questions.length} live InterviewBit questions!`);
      }
    } catch (err) {
      alert("Failed to scrape InterviewBit questions. Make sure backend is running.");
    } finally {
      setIsScraping(false);
    }
  };

  const filteredQuestions = questions.filter((q) => {
    const catOk = selectedCategory === "All" || q.category === selectedCategory;
    const difOk = selectedDifficulty === "All" || q.difficulty === selectedDifficulty;
    return catOk && difOk;
  });

  const avgScore = sessionScores.length
    ? Math.round(sessionScores.reduce((a, b) => a + b, 0) / sessionScores.length)
    : null;

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Brain className="w-7 h-7 text-indigo-400" />
            AI Mock Interviewer
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Practice with curated questions or scrape live questions from InterviewBit!
          </p>
        </div>

        {/* Live Scrape Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleScrapeInterviewBit}
            disabled={isScraping}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all disabled:opacity-50"
          >
            {isScraping ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Scraping InterviewBit...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4 text-purple-200" />
                Fetch Live InterviewBit Questions
              </>
            )}
          </button>

          {/* Session Stats */}
          {sessionScores.length > 0 && (
            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-3 py-2 rounded-xl">
              <div className="text-center">
                <p className="text-[9px] text-slate-500 uppercase">Attempted</p>
                <p className="text-sm font-extrabold text-white">{sessionScores.length}</p>
              </div>
              <div className="w-px h-6 bg-slate-700" />
              <div className="text-center">
                <p className="text-[9px] text-slate-500 uppercase">Avg Score</p>
                <p className={`text-sm font-extrabold ${avgScore! >= 70 ? "text-emerald-400" : avgScore! >= 50 ? "text-amber-400" : "text-rose-400"}`}>
                  {avgScore}%
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {scrapeSuccessMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          {scrapeSuccessMsg}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Question Bank */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Question Bank
            </h3>
            <span className="text-xs text-slate-500">{filteredQuestions.length} questions</span>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-1">
            {["All", "Technical", "Behavioral", "System Design", "HR", "DSA"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-900 border border-slate-800 text-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-1">
            {["All", "Easy", "Medium", "Hard"].map((d) => (
              <button
                key={d}
                onClick={() => setSelectedDifficulty(d)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  selectedDifficulty === d
                    ? "bg-slate-700 text-white"
                    : "bg-slate-900 border border-slate-800 text-slate-500 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Questions List */}
          <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1 scrollbar-thin">
            {filteredQuestions.map((q) => (
              <div
                key={q.id}
                onClick={() => selectQuestion(q)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  activeQuestion.id === q.id
                    ? "bg-indigo-600/20 border-indigo-500/50"
                    : "bg-slate-900/70 border-slate-800 hover:border-slate-700"
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase border ${CATEGORY_COLORS[q.category] || "bg-slate-800 text-slate-300"}`}>
                    {q.category}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {q.company && <span className="text-[9px] text-slate-400 font-semibold">{q.company}</span>}
                    <span className={`text-[9px] font-bold ${DIFFICULTY_COLORS[q.difficulty] || "text-slate-400"}`}>
                      {q.difficulty}
                    </span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-200 line-clamp-2">{q.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Practice Room */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 p-6 rounded-3xl space-y-5 shadow-2xl">

            {/* Question Display */}
            <div className="space-y-2 border-b border-slate-800 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase border ${CATEGORY_COLORS[activeQuestion.category] || "bg-slate-800 text-slate-300"}`}>
                    {activeQuestion.category}
                  </span>
                  <span className={`text-[10px] font-bold ${DIFFICULTY_COLORS[activeQuestion.difficulty] || "text-slate-400"}`}>
                    ● {activeQuestion.difficulty}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {activeQuestion.company && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20 font-bold">
                      {activeQuestion.company}
                    </span>
                  )}
                  <span className="text-[10px] text-slate-500">{activeQuestion.role}</span>
                </div>
              </div>
              <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                "{activeQuestion.title}"
              </h2>
              <div className="flex items-start gap-2 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-200/80">{activeQuestion.tips}</p>
              </div>
            </div>

            {/* Key Points to Cover */}
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                <Target className="w-3 h-3" /> Cover These Points
              </p>
              <div className="flex flex-wrap gap-1.5">
                {activeQuestion.ideal_points.map((pt, i) => (
                  <span
                    key={i}
                    className={`px-2 py-0.5 rounded-full text-[10px] border transition-all ${
                      feedback?.pointsCovered.includes(pt)
                        ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                        : feedback?.pointsMissed.includes(pt)
                        ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                        : "bg-slate-800 text-slate-400 border-slate-700"
                    }`}
                  >
                    {feedback?.pointsCovered.includes(pt) ? "✓ " : ""}{pt}
                  </span>
                ))}
              </div>
            </div>

            {/* Mic + Timer */}
            <div className="flex flex-col items-center py-5 space-y-3 bg-slate-950/80 rounded-2xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl ${isTimerRunning ? "bg-rose-500/10 border border-rose-500/20" : "bg-slate-800 border border-slate-700"}`}>
                  <Timer className={`w-3.5 h-3.5 ${isTimerRunning ? "text-rose-400" : "text-slate-500"}`} />
                  <span className={`text-sm font-bold font-mono ${isTimerRunning ? "text-rose-300" : "text-slate-400"}`}>
                    {formatTimer(timer)}
                  </span>
                </div>
                {isListening && (
                  <div className="flex gap-0.5 items-end h-6">
                    {[3, 5, 7, 5, 3].map((h, i) => (
                      <div
                        key={i}
                        className="w-1 bg-indigo-400 rounded-full animate-bounce"
                        style={{ height: `${h * 3}px`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                )}
              </div>

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

              <p className="text-sm font-bold text-white">
                {isListening ? "🔴 Recording... Click to Stop & Evaluate" : "Click mic to start answering"}
              </p>
              <p className="text-[11px] text-slate-500">Or type your answer below manually</p>
            </div>

            {/* Transcript */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  Your Answer
                </label>
                <div className="flex items-center gap-2">
                  {transcript && (
                    <span className="text-[10px] text-slate-600">
                      {transcript.trim().split(/\s+/).length} words
                    </span>
                  )}
                  <button
                    onClick={handleReset}
                    className="text-[11px] text-slate-500 hover:text-slate-300 flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset
                  </button>
                </div>
              </div>
              <textarea
                rows={4}
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Your spoken words appear here in real-time. You can also type manually and click the mic button to evaluate..."
                className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-sm focus:outline-none focus:border-indigo-500 leading-relaxed resize-none"
              />
              {!isListening && transcript && !feedback && (
                <button
                  onClick={() => {
                    const result = analyzeAnswer(transcript, activeQuestion);
                    setFeedback(result);
                    setSessionScores((prev) => [...prev, result.score]);
                  }}
                  className="mt-2 w-full py-2 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Evaluate My Answer
                </button>
              )}
            </div>

            {/* Feedback Panel */}
            {feedback && (
              <div className="space-y-3 animate-in fade-in duration-300">
                {/* Score */}
                <div className={`p-4 rounded-2xl border space-y-3 ${
                  feedback.score >= 80
                    ? "bg-emerald-500/10 border-emerald-500/30"
                    : feedback.score >= 60
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : feedback.score >= 40
                    ? "bg-amber-500/10 border-amber-500/30"
                    : "bg-rose-500/10 border-rose-500/30"
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className={`w-5 h-5 ${
                        feedback.score >= 80 ? "text-emerald-400"
                        : feedback.score >= 60 ? "text-indigo-400"
                        : feedback.score >= 40 ? "text-amber-400" : "text-rose-400"
                      }`} />
                      <span className="text-sm font-bold text-white">{feedback.verdict}</span>
                    </div>
                    <div className="text-right">
                      <span className={`text-3xl font-extrabold ${
                        feedback.score >= 80 ? "text-emerald-400"
                        : feedback.score >= 60 ? "text-indigo-400"
                        : feedback.score >= 40 ? "text-amber-400" : "text-rose-400"
                      }`}>{feedback.score}</span>
                      <span className="text-slate-400 text-sm">/100</span>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        feedback.score >= 80 ? "bg-emerald-500"
                        : feedback.score >= 60 ? "bg-indigo-500"
                        : feedback.score >= 40 ? "bg-amber-500" : "bg-rose-500"
                      }`}
                      style={{ width: `${feedback.score}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-300">{feedback.suggestion}</p>
                </div>

                {/* Keywords */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-[10px] font-bold text-emerald-400 uppercase mb-2 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Keywords Found ({feedback.keywordsFound.length})
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {feedback.keywordsFound.length > 0 ? feedback.keywordsFound.map((kw, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 text-[9px] border border-emerald-500/20">
                          {kw}
                        </span>
                      )) : <span className="text-[10px] text-slate-600">None detected</span>}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <p className="text-[10px] font-bold text-rose-400 uppercase mb-2 flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Keywords Missed ({feedback.keywordsMissed.length})
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {feedback.keywordsMissed.length > 0 ? feedback.keywordsMissed.map((kw, i) => (
                        <span key={i} className="px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-300 text-[9px] border border-rose-500/20">
                          {kw}
                        </span>
                      )) : <span className="text-[10px] text-emerald-400">All covered! 🎉</span>}
                    </div>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="flex items-center gap-3 text-[10px] text-slate-500">
                  <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {feedback.wordCount} words</span>
                  <span>•</span>
                  <span>{feedback.pointsCovered.length}/{activeQuestion.ideal_points.length} key points covered</span>
                  <span>•</span>
                  <span>{feedback.keywordsFound.length}/{activeQuestion.keywords.length} keywords used</span>
                </div>

                {/* Next Question */}
                <button
                  onClick={nextQuestion}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold transition-all flex items-center justify-center gap-2"
                >
                  Next Question <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewPrepPage;
