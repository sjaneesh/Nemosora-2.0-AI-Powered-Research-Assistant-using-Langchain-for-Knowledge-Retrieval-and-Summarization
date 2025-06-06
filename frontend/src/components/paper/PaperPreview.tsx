import React from "react";
import { Button } from "@/components/ui/button";

interface Props {
  title: string;
  content: string;
  source: string;
  onSummarize: () => void;
  onAskQuestion: () => void;
}

const PaperPreview: React.FC<Props> = ({ title, content, source, onSummarize, onAskQuestion }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <p className="whitespace-pre-line text-gray-800 mb-4">{content}</p>

      <div className="text-sm text-gray-500 mb-4">
        <span className="italic">Source:</span> {source}
      </div>

      <div className="flex gap-4">
        <Button onClick={onSummarize} className="bg-green-600 text-white hover:bg-green-700">
          Summarize this paper
        </Button>
        <Button onClick={onAskQuestion} className="bg-blue-600 text-white hover:bg-blue-700">
          Ask a question
        </Button>
      </div>
    </div>
  );
};

export default PaperPreview;
