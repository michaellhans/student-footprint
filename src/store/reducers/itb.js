// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    isLoading: true,
    error: false,
    cf_activity: {
        commuting: 0,
        electricity: 0,
        exam: 0,
        lecture: 0,
        practicum: 0
    },
    cf_category: {
        classroom: 0,
        commuting: 0,
        electricity: 0,
        paper: 0
    },
    cf_in_out: {
        in_class: 0,
        out_class: 0
    },
    cf_history: [],
    cf_profile: null,
    cf_course_distribution: [],
    green_action: {
        walking: 0,
        carpool: 0,
        energy_saving: 0
    }
};

// ==============================|| SLICE - ITB ||============================== //

const itb = createSlice({
    name: 'itb',
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
            state.cf_profile = action.payload.details.cf_profile;
            state.green_action = action.payload.details.green_action;
        }
    }
});

export default itb.reducer;

export const { startLoading, hasError, calculateSuccess } = itb.actions;
