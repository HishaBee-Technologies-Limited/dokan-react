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
};

export const useExpenseStore = create<ExpenseState & ExpenseActions>()(
  immer((set) => ({
    expenseDrawerState: { open: false, header: undefined },
    expenseDialogState: { open: false, header: undefined },

    // Update state-------------------------------------
    setExpenseDrawerState: (params) => set({ expenseDrawerState: params }),
    setExpenseDialogState: (params) => set({ expenseDialogState: params }),
  }))
);
