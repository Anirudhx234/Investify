import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface QuestionnaireState {
  shortTermGoal: string;
  longTermGoal: string;
  riskTolerance: string;
}

const initialState: QuestionnaireState = {
  shortTermGoal: '',
  longTermGoal: '',
  riskTolerance: '',
};

const questionnaireSlice = createSlice({
  name: 'questionnaire',
  initialState,
  reducers: {
    setShortTermGoal(state, action: PayloadAction<string>) {
      state.shortTermGoal = action.payload;
    },
    setLongTermGoal(state, action: PayloadAction<string>) {
      state.longTermGoal = action.payload;
    },
    setRiskTolerance(state, action: PayloadAction<string>) {
      state.riskTolerance = action.payload;
    },
  },
});

export const { setShortTermGoal, setLongTermGoal, setRiskTolerance } = questionnaireSlice.actions;

const store = configureStore({
  reducer: {
    questionnaire: questionnaireSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
