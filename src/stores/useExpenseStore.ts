import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type ExpenseState = {
  expenseDrawerState: {
    open: boolean;
    header?: string;
  };
  expenseDialogState: {
    open: boolean;
    header?: string;
  };
  currentCategory: string;
};

type ExpenseActions = {
  setExpenseDrawerState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setExpenseDialogState: (params: {
    open: boolean;
    header?: string | undefined;
  }) => void;
  setCurrentCategory: (category: string) => void;
};

export const useExpenseStore = create<ExpenseState & ExpenseActions>()(
  immer((set) => ({
    expenseDrawerState: { open: false, header: undefined },
    expenseDialogState: { open: false, header: undefined },
    currentCategory: '',

    // Update state-------------------------------------
    setCurrentCategory: (category: string) =>
      set({ currentCategory: category }),
    setExpenseDrawerState: (params) => set({ expenseDrawerState: params }),
    setExpenseDialogState: (params) => set({ expenseDialogState: params }),
  }))
);
