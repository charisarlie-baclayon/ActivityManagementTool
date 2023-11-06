import { apiSlice } from "./apiSlice";

export const Work = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readWorks: builder.query({
			query: () => "/api/works/",
		}),

		readWork: builder.query({
			query: (id) => `/api/works/${id}/`,
		}),

		createWork: builder.mutation({
			query: (data) => ({
				url: "/api/works/",
				method: "POST",
				body: { ...data },
			}),
		}),

		deleteWork: builder.mutation({
			query: (id) => ({
				url: `/api/works/${id}/`,
				method: "DELETE",
			}),
		}),

		updateWork: builder.mutation({
			query: (data) => ({
				url: `/api/works/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
	}),
});

export const {
	useReadWorksQuery,
	useReadWorkQuery,
	useCreateWorkMutation,
	useDeleteWorkMutation,
	useUpdateWorkMutation,
} = Work;
