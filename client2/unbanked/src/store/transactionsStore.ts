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

type TransactionsState = {
  transactions: Transaction[];
  transformedData: TransformedTransactionData | null;
  setTransactions: (transactions: Transaction[]) => void;
  setTransformedData: (transformedData: TransformedTransactionData | null) => void;
  clearTransactions: () => void;
};

export const useTransactionsStore = create<TransactionsState>((set) => ({
  transactions: [],
  transformedData: null,
  setTransactions: (transactions) => set({ transactions }),
  setTransformedData: (transformedData) => set({ transformedData }),
  clearTransactions: () => set({ transactions: [], transformedData: null }),
}));