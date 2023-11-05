import { apiSlice } from "./apiSlice";

export const Students = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    readStudents: builder.mutation({
      query: (accessToken) => ({
        url: "/api/students/",
        method: "GET",
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    readStudentsByTeam: builder.mutation({
      query: (id, accessToken) => ({
        url: `/api/students/?team_id=${id}`,
        method: "GET",
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    readStudent: builder.mutation({
      query: (id, accessToken) => ({
        url: `/api/students/${id}/`,
        method: "GET",
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    createStudent: builder.mutation({
      query: (data, accessToken) => ({
        url: "/api/students/",
        method: "POST",
        body: { ...data },
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    deleteStudent: builder.mutation({
      query: (id, accessToken) => ({
        url: `/api/students/${id}/`,
        method: "DELETE",
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
    updateStudent: builder.mutation({
      query: (id, data, accessToken) => ({
        url: `/api/students/${id}/`,
        method: "PUT",
        body: { ...data },
        headers: {
          // Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useReadStudentsMutation,
  useReadStudentsByTeamMutation,
  useReadStudentMutation,
  useCreateStudentMutation,
  useDeleteStudentMutation,
  useUpdateStudentMutation,
} = Students;
