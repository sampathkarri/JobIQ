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
} from "lucide-react";
import { QUESTION_BANK, Question } from "../data/interviewQuestions";

const CATEGORY_COLORS: Record<string, string> = {
  DBMS: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  OOPs: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  "Computer Networks": "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
  "Software Eng": "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
  Git: "bg-orange-500/10 text-orange-300 border-orange-500/20",
  SQL: "bg-sky-500/10 text-sky-300 border-sky-500/20",
  DSA: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  HR: "bg-teal-500/10 text-teal-300 border-teal-500/20",
  Backend: "bg-purple-500/10 text-purple-300 border-purple-500/20",
  Frontend: "bg-pink-500/10 text-pink-300 border-pink-500/20",
  Python: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
  Java: "bg-amber-500/10 text-amber-300 border-amber-500/20",
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [activeQuestion, setActiveQuestion] = useState<Question>(QUESTION_BANK[0]);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [recognition, setRecognition] = useState<any>(null);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [sessionScores, setSessionScores] = useState<number[]>([]);
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

  const categoriesList = [
    "All",
    "DBMS",
    "OOPs",
    "Computer Networks",
    "Software Eng",
    "Git",
    "SQL",
    "DSA",
    "HR",
    "Backend",
    "Frontend",
    "Python",
    "Java",
  ];

  const filteredQuestions = QUESTION_BANK.filter((q) => {
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
            Practice top interview questions across DBMS, OOPs, Computer Networks, SQL, DSA, Backend, Frontend, Python, and Java.
          </p>
        </div>

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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Question Bank */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Interview Topics
            </h3>
            <span className="text-xs text-slate-500">{filteredQuestions.length} questions</span>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1 max-h-28 overflow-y-auto pr-1 scrollbar-thin">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  selectedCategory === cat
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
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
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1 scrollbar-thin">
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
                <Target className="w-3 h-3" /> Key Points to Cover in Answer
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
