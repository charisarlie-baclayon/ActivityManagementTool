import { apiSlice } from "./apiSlice";

export const Course = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        readCourses: builder.query({
            query: () => "/api/courses/",
        }),

        readCourse: builder.query({
            query: (id) => `/api/courses/${id}/`,
        }),

        createCourse: builder.mutation({
            query: (data) => ({
                url: "/api/courses/",
                method: "POST",
                body: { ...data },
            }),
        }),

        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/api/courses/${id}/`,
                method: "DELETE",
            }),
        }),

        updateCourse: builder.mutation({
            query: (data) => ({
                url: `/api/courses/${data.id}/`,
                method: "PUT",
                body: { ...data },
            }),
        }),
    }),
});

export const {
    useReadCoursesQuery,
    useReadCourseQuery,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
} = Course;
