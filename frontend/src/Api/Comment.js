import { apiSlice } from "./apiSlice";

export const Comment = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readComments: builder.mutation({
			query: () => "/api/comments/",
		}),

		readComment: builder.mutation({
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
		readCommentsForActivity: builder.mutation({
			query: (activity_id) => ({
				url: `/api/comments/comments_for_activity/?activity_id=${activity_id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useReadCommentsMutation,
	useReadCommentMutation,
	useCreateCommentMutation,
	useDeleteCommentMutation,
	useUpdateCommentMutation,
	useReadCommentsForActivityMutation,
} = Comment;
