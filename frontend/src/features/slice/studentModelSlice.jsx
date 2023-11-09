import { createSlice } from "@reduxjs/toolkit";

const studentModelSlice = createSlice({
  name: "studentModel",
  initialState: {
    id: null,
    first_name: null,
    last_name: null,
    email: null,
    role: null,
    user: null,
    student_team: null,
},
  reducers: {
    setStudentModel: (state, action) => {
      const { id, first_name, last_name, email, role, user, student_team} = action.payload;
			state.id = id;
      state.first_name = first_name;
      state.last_name = last_name;
      state.email = email;
			state.role = role;
      state.user = user;
      state.student_team = student_team;
    },
    clearStudentModel: (state) => {
      return initialState;
    },
  },
});

export const { setStudentModel, clearStudentModel } = studentModelSlice.actions;

export default studentModelSlice.reducer;

export const selectStudentModel = (state) => state.studentModel;
export const selectCurrentTeam = (state) => state.studentModel.student_team;
