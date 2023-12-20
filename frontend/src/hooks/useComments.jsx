import {
    useCreateCommentMutation,
    useDeleteCommentMutation,
    useUpdateCommentMutation,
    useReadCommentMutation,
    useReadCommentsMutation,
    useReadCommentsForActivityMutation,
} from "../Api/Comment";

export function useFetchComment(id) {
    const { data: commentData } = useReadCommentMutation(id, { skip: !id });
    console.log(`Use Get Comment By Id : ${commentData}`);
    return commentData;
}

export function useFetchComments() {
    const { data: comments } = useReadCommentsMutation();
    console.log(`Use Get All Comments : ${comments}`);
    return comments || [];
}

export function useCreateComment() {
    const [createComment] = useCreateCommentMutation();

    const createNewComment = async (data) => {
        try {
            const response = await createComment(data);
            console.log(`Use Create Comment : ${JSON.stringify(response, null, 2)}`);
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
            console.log(`Use Update Comment : ${JSON.stringify(response, null, 2)}`);
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
            console.log(`Use Delete Comment : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return deleteCommentById;
}

export function useFetchCommentsForActivity(activity_id) {
    const [readComments] = useReadCommentsForActivityMutation(activity_id);

    const fetchCommentsForActivity = async (id) => {
        try {
            const response = await readComments(id);
            console.log(`Use Get Comments For Activity : ${JSON.stringify(response, null, 2)}`);
            return response.data;
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    return fetchCommentsForActivity;
}
