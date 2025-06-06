// pages/admin/logs.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";

interface LogEntry {
  id: number;
  query: string;
  user: string;
  tokens_used: number;
  readability_score: number;
  timestamp: string;
}

const AdminLogsPage = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/logs")
      .then((response) => setLogs(response.data.logs))
      .catch((err) => {
        console.error(err);
        setError("Failed to load logs");
      });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Query Logs</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {logs.length === 0 ? (
        <p>No logs found.</p>
      ) : (
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Query</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Tokens</th>
              <th className="px-4 py-2">Score</th>
              <th className="px-4 py-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="text-center">
                <td className="border px-4 py-2">{log.id}</td>
                <td className="border px-4 py-2">{log.query}</td>
                <td className="border px-4 py-2">{log.user}</td>
                <td className="border px-4 py-2">{log.tokens_used}</td>
                <td className="border px-4 py-2">{log.readability_score}</td>
                <td className="border px-4 py-2">{log.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminLogsPage;
