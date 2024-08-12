import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
  },
  reducers: {
    setExpenses(state, action) {
      state.items = action.payload;
    },
    addExpense(state, action) {
      state.items.push(action.payload);
    },
    editExpense(state, action) {
      const index = state.items.findIndex(item => item.dataId === action.payload.dataId);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteExpense(state, action) {
      state.items = state.items.filter(item => item.dataId !== action.payload);
    },
  },
});

export const expensesActions = expensesSlice.actions;
export default expensesSlice.reducer;
