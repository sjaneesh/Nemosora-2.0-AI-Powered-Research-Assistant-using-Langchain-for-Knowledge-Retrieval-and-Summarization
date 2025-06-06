import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import SearchBar from "@/components/search/SearchBar";
import PaperPreview from "@/components/paper/PaperPreview";
import PaperSummary from "@/components/paper/PaperSummary";
import QuestionInput from "@/components/question/QuestionInput";
import AnswerCard from "@/components/question/AnswerCard";
import Footer from "@/components/layout/Footer";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [paperContent, setPaperContent] = useState("");
  const [paperTitle, setPaperTitle] = useState("");
  const [source, setSource] = useState("");
  const [showPaper, setShowPaper] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [summary, setSummary] = useState("");
  const [summaryTokens, setSummaryTokens] = useState(0);
  const [summaryReadability, setSummaryReadability] = useState(0);
  const [showQuestionInput, setShowQuestionInput] = useState(false);
  const [questions, setQuestions] = useState<{ question: string; answer: string; tokensUsed: number; readabilityScore: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [tokenMode, setTokenMode] = useState("standard");
  const [totalTokensUsed, setTotalTokensUsed] = useState(0);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setShowSummary(false);
    setShowQuestionInput(false);
    setQuestions([]);
    setTotalTokensUsed(0);

    try {
      const response = await fetch("http://localhost:5000/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      });

      const data = await response.json();

      if (data.error) {
        alert("No relevant paper found!");
        return;
      }

      setPaperTitle(data.title);
      setPaperContent(data.content);
      setSource(data.source);
      setShowPaper(true);
    } catch (error) {
      console.error("Search failed:", error);
      alert("Something went wrong with the search.");
    }
  };

  const handleSummarize = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: paperContent, mode: tokenMode })
      });

      const data = await response.json();
      setSummary(data.summary);
      setSummaryTokens(data.tokens_used);
      setSummaryReadability(data.readability_score);
      setTotalTokensUsed((prev) => prev + data.tokens_used);
      setShowSummary(true);
    } catch (error) {
      console.error("Summarization failed:", error);
      alert("Something went wrong while summarizing.");
    }
    setLoading(false);
  };

  const handleAskQuestion = () => {
    setShowQuestionInput(true);
  };

  const handleSubmitQuestion = async (question: string) => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          question,
          context: paperContent,
          mode: tokenMode
        })
      });

      const data = await response.json();

      const newQuestion = {
        question,
        answer: data.answer,
        tokensUsed: data.tokens_used,
        readabilityScore: data.readability_score
      };

      setQuestions([...questions, newQuestion]);
      setTotalTokensUsed((prev) => prev + data.tokens_used);
    } catch (error) {
      console.error("Q&A failed:", error);
      alert("Something went wrong while answering the question.");
    }
    setLoading(false);
  };

  const renderLanding = () => (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center relative z-10 px-4">
      <h1 className="text-5xl font-serif font-bold text-accent mb-2">Nemosora</h1>
      <p className="text-gray-500 mb-8">Recall. Refine. Radiate.</p>

      <div className="w-full max-w-3xl mx-auto mb-12">
        <SearchBar onSearch={handleSearch} />
      </div>

      <h2 className="text-3xl font-semibold mb-6">Your Intelligent Research Assistant</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl w-full mb-8">
        <Card className="p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Context-Aware Search</h3>
          <p className="text-gray-600 text-sm">Finds papers based on meaning, not just keywords</p>
        </Card>
        <Card className="p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Insightful Summaries</h3>
          <p className="text-gray-600 text-sm">From bite-sized to deep dives, you choose the depth</p>
        </Card>
        <Card className="p-5 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-lg font-semibold mb-2">Knowledge Integration</h3>
          <p className="text-gray-600 text-sm">Connects findings across multiple papers</p>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white to-[#f0edff]">
      <Navbar userEmail="researcher@gmail.com" />
      <main className="flex-grow container mx-auto px-4 py-8">
        {!showPaper ? (
          renderLanding()
        ) : (
          <>
            <div className="mb-4">
              <SearchBar onSearch={handleSearch} />
            </div>

            <div className="flex items-center justify-between mb-6">
              <div className="text-sm text-gray-700">
                <span className="font-semibold">Total Tokens Used:</span> {totalTokensUsed}
              </div>

              <div className="flex items-center space-x-2">
                <Label htmlFor="tokenMode" className="text-sm">
                  Token Efficiency Mode
                </Label>
                <Switch
                  id="tokenMode"
                  checked={tokenMode === "efficient"}
                  onCheckedChange={(checked) => setTokenMode(checked ? "efficient" : "standard")}
                />
              </div>
            </div>

            <PaperPreview
              title={paperTitle}
              content={paperContent}
              source={source}
              onSummarize={handleSummarize}
              onAskQuestion={handleAskQuestion}
            />

            {loading && (
              <p className="text-center text-indigo-600 font-medium my-4 animate-pulse">
                Processing... please wait
              </p>
            )}

            {showSummary && (
              <PaperSummary
                summary={summary}
                tokensUsed={summaryTokens}
                readabilityScore={summaryReadability}
              />
            )}

            {showQuestionInput && (
              <QuestionInput onSubmitQuestion={handleSubmitQuestion} />
            )}

            {questions.map((q, index) => (
              <AnswerCard
                key={index}
                question={q.question}
                answer={q.answer}
                tokensUsed={q.tokensUsed}
                readabilityScore={q.readabilityScore}
              />
            ))}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Index;