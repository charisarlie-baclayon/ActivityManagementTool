import { apiSlice } from "./apiSlice";

export const Comment = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readComments: builder.query({
			query: () => "/api/comments/",
		}),

		readComment: builder.query({
			query: (id) => `/api/comments/${id}/`,
		}),

		createComment: builder.mutation({
			query: (data) => ({
				url: "/api/comments/",
				method: "POST",
				body: { ...data },
			}),
		}),

		deleteComment: builder.mutation({
			query: (id) => ({
				url: `/api/comments/${id}/`,
				method: "DELETE",
			}),
		}),

		updateComment: builder.mutation({
			query: (data) => ({
				url: `/api/comments/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
		readCommentsForActivity: builder.query({
			query: (activity_id) => ({
				url: `/api/comments/comments_for_activity/?activity_id=${activity_id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useReadCommentsQuery,
	useReadCommentQuery,
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useUpdateCommentMutation,
	useReadCommentsForActivityQuery,
} = Comment;
