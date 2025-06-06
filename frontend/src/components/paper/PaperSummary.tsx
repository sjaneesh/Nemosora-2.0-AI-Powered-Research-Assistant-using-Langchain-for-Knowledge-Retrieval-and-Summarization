import React from "react";
import { Card } from "@/components/ui/card";

interface Props {
  summary: string;
  tokensUsed: number;
  readabilityScore: number;
}

const PaperSummary: React.FC<Props> = ({ summary, tokensUsed, readabilityScore }) => {
  return (
    <Card className="bg-green-100 p-6 rounded-lg mb-6">
      <h3 className="text-lg font-bold mb-2">Here's what I found:</h3>
      <p className="text-green-800 whitespace-pre-line">{summary}</p>
      <div className="mt-4 text-sm text-gray-600">
        <p>Tokens used: {tokensUsed}</p>
        <p>Readability Score: {readabilityScore}</p>
      </div>
    </Card>
  );
};

export default PaperSummary;
