import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  onSubmitQuestion: (question: string) => void;
}

const QuestionInput: React.FC<Props> = ({ onSubmitQuestion }) => {
  const [question, setQuestion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() === "") return;
    onSubmitQuestion(question);
    setQuestion("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-100 p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-2">Ask a question about this paper:</h3>
      <Textarea
        rows={3}
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        className="mb-4"
      />
      <Button type="submit" className="bg-indigo-600 text-white hover:bg-indigo-700">
        Submit Question
      </Button>
    </form>
  );
};

export default QuestionInput;