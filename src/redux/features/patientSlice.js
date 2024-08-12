import { createSlice } from "@reduxjs/toolkit";

const patientSlice = createSlice({
  name: "patient",
  initialState: {
    patient: {},
  },
  reducers: {
    getPatientDetails: (state, action) => {
      state.patient = {...state.patient ,...action.payload};
    },
    
  },
});
export const {  getPatientDetails } = patientSlice.actions;
export default patientSlice.reducer;
