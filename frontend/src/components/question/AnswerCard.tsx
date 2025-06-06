import React from "react";
import { Card } from "@/components/ui/card";

interface Props {
  question: string;
  answer: string;
  tokensUsed: number;
  readabilityScore: number;
}

const AnswerCard: React.FC<Props> = ({ question, answer, tokensUsed, readabilityScore }) => {
  return (
    <Card className="bg-violet-100 p-6 rounded-lg mb-6">
      <h4 className="font-semibold text-gray-800 mb-2">Q: {question}</h4>
      <p className="text-violet-900 whitespace-pre-line">{answer}</p>
      <div className="mt-4 text-sm text-gray-700">
        <p>Tokens used: {tokensUsed}</p>
        <p>Readability Score: {readabilityScore}</p>
      </div>
    </Card>
  );
};

export default AnswerCard;