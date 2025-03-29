"use client";

import React, { useState, useEffect, useRef } from "react";

interface Message {
  sender: "user" | "ai";
  content: string | any;
}

const LoanChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState<"amount" | "repayment" | "confirm" | "done">("amount");
  const [loanAmount, setLoanAmount] = useState<number | null>(null);
  const [repaymentPeriod, setRepaymentPeriod] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const maxLoan = 500; // GHS
  const interestRate = (months: number) => months * 2.5; // 2.5% per month

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initial AI greeting
  useEffect(() => {
    setMessages([
      {
        sender: "ai",
        content:
          "Hi Ohene-Agyekum 👋! Here’s a quick summary of your finances before we proceed:\n\n" +
          "📊 Current Loan Balance: GHS 0\n" +
          "💳 Total Arrears Balance: GHS 0\n" +
          "📆 Next Due Date: N/A\n" +
          "⭐ Unbanked Score™: 673\n\n" +
          `Based on your Unbanked Score™, you qualify for a loan up to GHS ${maxLoan}.\n` +
          "How much do you need?",
      },
    ]);
  }, []);

  // Handle user input and send to Claude API
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { sender: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    switch (step) {
      case "amount":
        await handleAmountInput(input);
        break;
      case "repayment":
        await handleRepaymentInput(input);
        break;
      default:
        break;
    }
  };

  // Handle loan amount input with Claude API
  const handleAmountInput = async (text: string) => {
    const amount = parseFloat(text);
    if (isNaN(amount)) {
      const prompt = "User entered an invalid amount. Ask them to provide a valid loan amount.";
      const aiResponse = await callClaudeAPI(prompt);
      setMessages((prev) => [...prev, { sender: "ai", content: aiResponse }]);
      return;
    }

    if (amount > maxLoan) {
      const negotiatedAmount = maxLoan * 1.1; // +10%
      const prompt = `User requested GHS ${amount}, which exceeds the max eligible amount of GHS ${maxLoan}. Offer a negotiated amount of GHS ${negotiatedAmount.toFixed(2)} and ask if they want to proceed with it (Yes/No).`;
      const aiResponse = await callClaudeAPI(prompt);
      setLoanAmount(negotiatedAmount);
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          content: aiResponse || `The maximum you’re eligible for is GHS ${maxLoan}, but I can stretch it to GHS ${negotiatedAmount.toFixed(2)}. Would you like to proceed with GHS ${negotiatedAmount.toFixed(2)}? (Yes/No)`,
        },
      ]);
    } else if (amount <= 0) {
      const prompt = "User requested an invalid loan amount (zero or negative). Ask them to provide a positive amount.";
      const aiResponse = await callClaudeAPI(prompt);
      setMessages((prev) => [...prev, { sender: "ai", content: aiResponse }]);
    } else {
      setLoanAmount(amount);
      const prompt = `User requested GHS ${amount}. Confirm the amount and ask how soon they can repay it (e.g., 2 months).`;
      const aiResponse = await callClaudeAPI(prompt);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", content: aiResponse || `Great! You’ve requested GHS ${amount}. How soon can you repay it? (e.g., 2 months)` },
      ]);
      setStep("repayment");
    }
  };

  // Handle repayment period input with Claude API
  const handleRepaymentInput = async (text: string) => {
    const periodMatch = text.match(/(\d+)\s*(month|day)/i);
    if (!periodMatch) {
      const prompt = "User didn’t specify a valid repayment period. Guide them to provide a period (e.g., 2 months).";
      const aiResponse = await callClaudeAPI(prompt);
      setMessages((prev) => [...prev, { sender: "ai", content: aiResponse }]);
      return;
    }

    const value = parseInt(periodMatch[1]);
    const unit = periodMatch[2].toLowerCase();
    const months = unit === "month" ? value : value / 30;

    if (months < 1 / 30 || months > 4) {
      const prompt = `User suggested an invalid repayment period (${text}). Explain that it must be between 1 day and 4 months, and ask for a valid period.`;
      const aiResponse = await callClaudeAPI(prompt);
      setMessages((prev) => [...prev, { sender: "ai", content: aiResponse }]);
      return;
    }

    setRepaymentPeriod(months);
    const interest = interestRate(months);
    const totalRepayment = (loanAmount! * (1 + interest / 100)).toFixed(2);
    const dueDate = new Date();
    dueDate.setMonth(dueDate.getMonth() + months);

    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        content: (
          <div className="bg-blue-100 p-4 rounded-lg shadow-md">
            <p>Got it! Here’s a brief breakdown of your loan:</p>
            <p>💰 Loan Amount: GHS {loanAmount}</p>
            <p>📈 Interest Rate: {interest}%</p>
            <p>📅 Total Repayment: GHS {totalRepayment} due {dueDate.toLocaleDateString()}</p>
            <div className="mt-4 flex gap-3">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                onClick={() =>
                  setMessages((p) => [
                    ...p,
                    { sender: "ai", content: "Loan declined. Chat ended. 👋" },
                  ])
                }
              >
                Decline
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                onClick={() => handleAccept()}
              >
                Accept
              </button>
            </div>
          </div>
        ),
      },
    ]);
    setStep("confirm");
  };

  // Handle loan acceptance
  const handleAccept = () => {
    setMessages((prev) => [
      ...prev,
      {
        sender: "ai",
        content: (
          <div className="bg-green-100 p-4 rounded-lg shadow-md">
            <p>✅ Verified! Your loan request is now being processed...</p>
            <p>Visit your loans history anytime to access your funds and agreement documents.</p>
            <div className="mt-4 flex gap-3">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                onClick={() => setMessages((p) => [...p, { sender: "ai", content: "Chat ended. Bye! 👋" }])}
              >
                End Chat
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                onClick={() => window.location.href = "/loan-history"} // Replace with actual route
              >
                Visit Now
              </button>
            </div>
          </div>
        ),
      },
    ]);
    setStep("done");
  };

  // Call Claude API
  const callClaudeAPI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.details || "API error");
      return data.response;
    } catch (error) {
      console.error("Claude API error:", error);
      return "Sorry, I encountered an issue. Let’s try that again.";
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-blue-600 text-white p-4 text-center shadow-md">
        <h1 className="text-xl font-bold">Loan Chat 💸</h1>
      </header>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-md p-3 rounded-lg shadow ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              {typeof msg.content === "string" ? (
                <pre className="whitespace-pre-wrap">{msg.content}</pre>
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 bg-white border-t shadow-inner">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={step === "confirm" || step === "done"}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={step === "confirm" || step === "done"}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoanChat;