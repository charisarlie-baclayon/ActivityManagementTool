import {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
    useReadCommentMutation,
    useReadCommentsMutation,
    useReadCommentsForActivityMutation,
} from "../api/Comment";

export function useFetchComment(id) {
    const { data: commentData } = useReadCommentMutation(id, { skip: !id });

    return commentData;
}

export function useFetchComments() {
    const { data: comments } = useReadCommentsMutation();

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
    const [readComments] = useReadCommentsForActivityMutation(activity_id);

    const submitTheActivity = async (id) => {
        try {
            const response = await readComments(id);
            return response.data;
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    return submitTheActivity;
}