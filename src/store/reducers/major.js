// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isLoading: true,
    error: false,
    cf_activity: {
        commuting: 38.97771428571429,
        electricity: 230.60360160000002,
        exam: 0.31181783241379313,
        lecture: 16.24315073504019,
        practicum: 0.10223494736842106
    },
    cf_category: {
        classroom: 9.814925254822402,
        commuting: 38.97771428571429,
        electricity: 230.60360160000002,
        paper: 0.08875866
    },
    cf_in_out: {
        in_class: 16.657203514822406,
        out_class: 262.8277962857143
    },
    cf_history: [],
    cf_course_distribution: []
};

// ==============================|| SLICE - MAJOR ||============================== //

const major = createSlice({
    name: 'major',
    initialState,
    reducers: {
        startLoading(state) {
            state.isLoading = true;
        },

        hasError(state, action) {
            state.isLoading = false;
            state.error = action.payload;
        },

        calculateSuccess(state, action) {
            state.isLoading = false;
            state.cf_category = action.payload.details.cf_category;
            state.cf_in_out = action.payload.details.cf_in_out;
            state.cf_activity = action.payload.details.cf_activity;
            state.cf_history = action.payload.details.cf_history;
            state.cf_course_distribution = action.payload.details.cf_course_distribution;
        }
    }
});

export default major.reducer;

export const { startLoading, hasError, calculateSuccess } = major.actions;
