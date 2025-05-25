import { AiOutlineFileText } from "react-icons/ai";
import { FiCopy } from "react-icons/fi"; 
import ReactMarkdown from "react-markdown";
import { useState } from "react";

const Summarizer = ({
  inputText,
  setInputText,
  summary,
  handleSummarize,
  handleReset,
  model,
  setModel,
  loading,
  wordCount,
  setWordCount,
}) => {
  const [copied, setCopied] = useState(false);

  const handleExportTxt = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-5xl mx-auto mt-8 space-y-6">
      <h1 className="text-2xl font-bold text-slate-800">Ringkasan Teks Otomatis</h1>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <label className="text-slate-700 font-medium">Model AI:</label>
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          className="p-2 border border-slate-300 rounded-lg w-full sm:w-auto"
        >
          <option value="deepseek/deepseek-chat-v3-0324:free">DeepSeek V3</option>
          <option value="meta-llama/llama-3.3-70b-instruct:free">LLaMA 3.3 (Meta)</option>
          <option value="google/gemini-2.0-flash-exp:free">Gemini Flash 2.0</option>
        </select>
      </div>

      <div>
        <label className="text-slate-700 font-medium mb-1 block">Jumlah Kata Ringkasan (opsional):</label>
        <input
          type="number"
          min="10"
          max="1000"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
          placeholder="Contoh: 50"
          className="p-2 border border-slate-300 rounded-lg w-full"
        />
      </div>

      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="w-full p-4 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="6"
        placeholder="Masukkan teks di sini..."
      ></textarea>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSummarize}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Ringkas
        </button>
        <button
          onClick={handleReset}
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Reset
        </button>
        <button
          onClick={handleExportTxt}
          disabled={!summary}
          className={`flex items-center gap-2 px-6 py-2 text-white rounded-lg transition ${
            summary ? "bg-green-600 hover:bg-green-700" : "bg-slate-400 cursor-not-allowed"
          }`}
        >
          <AiOutlineFileText className="text-lg" />
          Export TXT
        </button>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold text-slate-800">Hasil Ringkasan</h2>
          {summary && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
            >
              <FiCopy className="text-base" />
              {copied ? "Tersalin!" : "Salin"}
            </button>
          )}
        </div>
        <div className="text-slate-700 min-h-[100px]">
          {summary ? (
            <ReactMarkdown>{summary}</ReactMarkdown>
          ) : loading ? (
            <div className="flex items-center py-4">
              <div className="w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="ml-3 text-blue-600">Memproses ringkasan...</span>
            </div>
          ) : (
            <p className="text-slate-500">Hasil ringkasan akan muncul di sini.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Summarizer;
