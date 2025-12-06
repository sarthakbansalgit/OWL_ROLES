import { createSlice } from '@reduxjs/toolkit';  // Add this import

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        singleJob: null,
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
        allCourses: [], // New state for courses
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setAllCourses: (state, action) => { // New reducer
            state.allCourses = action.payload;
        },
        updateJobInStore: (state, action) => {
            state.allJobs = state.allJobs.map((job) =>
              job._id === action.payload._id ? action.payload : job
            );
          },
        
    },
});

export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchJobByText,
    setAllAppliedJobs,
    setSearchedQuery,
    setAllCourses, // Export the new reducer
    updateJobInStore,
} = jobSlice.actions;

export default jobSlice.reducer;
