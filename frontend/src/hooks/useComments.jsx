import {
    useReadCommentQuery,
    useReadCommentsQuery,
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
    useReadCommentsForActivityQuery,
} from "../api/Comment";

export function useFetchComment(id) {
    const { data: commentData } = useReadCommentQuery(id, { skip: !id });

    return commentData;
}

export function useFetchComments() {
    const { data: comments } = useReadCommentsQuery();

    return comments || [];
}

export function useCreateComment() {
    const [createComment] = useCreateCommentMutation();

    const createNewComment = async (data) => {
        try {
            const response = await createComment(data);
            return response;
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    return createNewComment;
}

export function useUpdateComment() {
    const [updateComment] = useUpdateCommentMutation();

    const updateExistingComment = async (id, data) => {
        try {
            const response = await updateComment({ id, ...data });
            return response;
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    return updateExistingComment;
}

export function useDeleteComment() {
    const [deleteComment] = useDeleteCommentMutation();

    const deleteCommentById = async (id) => {
        try {
            const response = await deleteComment(id);
            return response;
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return deleteCommentById;
}

export function useFetchCommentsForActivity(activity_id) {
    const { data: commentsForActivity } = useReadCommentsForActivityQuery(
        { activity_id }
    );

    return commentsForActivity || [];
}
