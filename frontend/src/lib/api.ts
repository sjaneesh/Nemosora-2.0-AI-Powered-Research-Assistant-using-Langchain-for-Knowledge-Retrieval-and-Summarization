import axios from "axios";

const BASE_URL = "http://localhost:5000";

// Send search query to backend
export const fetchSearchResult = async (query: string) => {
  const response = await axios.post(`${BASE_URL}/search`, { query });
  return response.data;
};

// Send content of paper to backend to summarize
export const fetchSummary = async (content: string) => {
  const response = await axios.post(`${BASE_URL}/summarize`, {
    content,
    user: "anonymous", // Optional logging
  });
  return response.data;
};

// Send question + content to backend for answer
export const fetchAnswer = async (context: string, question: string) => {
  const response = await axios.post(`${BASE_URL}/ask`, {
    question,
    context,
    user: "anonymous", // Optional logging
  });
  return response.data;
};
