import { apiSlice } from "./apiSlice";

export const Classes = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readClasses: builder.mutation({
			query: () => ({
				url: "/api/classes/",
				method: "GET",
			}),
		}),
		readClass: builder.mutation({
			query: (id) => ({
				url: `/api/classes/${id}/`,
				method: "GET",
			}),
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
			query: (id) => ({
				url: `/api/classes/get_classes_by_section/?section=${id}/`,
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
} = Classes;
