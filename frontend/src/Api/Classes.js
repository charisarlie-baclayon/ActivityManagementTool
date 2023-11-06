import { apiSlice } from "./apiSlice";

export const Classes = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readClasses: builder.mutation({
			query: () => "/api/classes/",
		}),
		readClass: builder.mutation({
			query: (id) => `/api/classes/${id}/`,
		}),
		createClass: builder.mutation({
			query: (data) => ({
				url: "/api/classes/",
				method: "POST",
				body: { ...data },
			}),
		}),
		deleteClass: builder.mutation({
			query: (id) => ({
				url: `/api/classes/${id}/`,
				method: "DELETE",
			}),
		}),
		updateClass: builder.mutation({
			query: (data) => ({
				url: `/api/classes/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
		readClassesBySection: builder.mutation({
			query: (section) => ({
				url: `/api/classes/get_classes_by_section/?section=${section}`,
				method: "GET",
			}),
		}),
		readClassesByCourse: builder.mutation({
			query: (course_id) => ({
				url: `/api/classes/get_classes_by_course/?course_id=${course_id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useReadClassesMutation,
	useReadClassMutation,
	useCreateClassMutation,
	useDeleteClassMutation,
	useUpdateClassMutation,
	useReadClassesBySectionMutation,
<<<<<<< HEAD
=======
	useReadClassesByCourseMutation,
>>>>>>> 2f4b58e61450b82c4c5542db234b4a89f184987d
} = Classes;
