// stores/transactionsStore.ts
import { create } from "zustand";

type Transaction = {
  _id: string;
  type: "debit" | "credit";
  amount: number;
  narration: string;
  date: string;
  currency: string;
};

type TransformedTransactionData = {
  transactionDates: string[];
  sendReceive: number[]; // 1 for send (debit), 0 for receive (credit)
  frequency: number; // transactions per week
  totalAmountSent: number; // GHS
  totalAmountReceived: number; // GHS
  numberOfSendsToUserX: number; // Count of sends to a specific user
};

type CreditScore = {
  score: number; // 300–850
  category: "Poor" | "Fair" | "Good" | "Very Good" | "Excellent";
  confidenceRange: [number, number]; // e.g., [700, 736]
  explanation: string; // e.g., "High sends to one user lowered your score"
};

type TransactionsState = {
  transactions: Transaction[];
  transformedData: TransformedTransactionData | null;
  creditScore: CreditScore | null;
  setTransactions: (transactions: Transaction[]) => void;
  setTransformedData: (transformedData: TransformedTransactionData | null) => void;
  setCreditScore: (creditScore: CreditScore | null) => void;
  clearTransactions: () => void;
};

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  transformedData: null,
  creditScore: null,
  setTransactions: (transactions) => set({ transactions }),
  setTransformedData: (transformedData) => set({ transformedData }),
  setCreditScore: (creditScore) => set({ creditScore }),
  clearTransactions: () => set({ transactions: [], transformedData: null, creditScore: null }),
}));