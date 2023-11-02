import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readComment, readComments, createComment, deleteComment, updateComment } from "../api/Comments";

export function useFetchComment(id) {
    const [commentData, setCommentData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchComment = async () => {
            try {
                const response = await readComment(id, accessToken);
                setCommentData(response);
            } catch (error) {
                console.error("Error fetching comment data:", error);
            }
        };

        if (id) {
            fetchComment();
        }
    }, [id, accessToken]);

    return commentData;
}

export function useFetchComments() {
    const [comments, setComments] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect (() => {
        const fetchComments = async () => {
            try {
                const response = await readComments(accessToken);
                setComments(response);
        } catch (error) {
                console.log(error.response);
            }
        };

        fetchComments();
    }, [accessToken]);

    return comments;
}

export function useCreateComment() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewComment = async (data) => {
        try {
            const response = await createComment(data, accessToken);
            return response;
        } catch (error) {
            console.error("Error creating comment:", error);
        }
    };

    return createNewComment;
}

export function useUpdateComment() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingComment = async (id, data) => {
        try {
            const response = await updateComment(id, data, accessToken);
            return response;
        } catch (error) {
            console.error("Error updating comment:", error);
        }
    };

    return updateExistingComment;
}

export function useDeleteComment() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteCommentById = async (id) => {
        try {
            const response = await deleteComment(id, accessToken);
            return response;
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    return deleteCommentById;
}
