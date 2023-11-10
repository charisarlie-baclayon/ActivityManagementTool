import { useEffect, useState } from "react";
import {
    useReadWorksMutation,
	useReadWorkMutation,
	useGetWorkByActivityMutation,
	useCreateWorkMutation,
	useDeleteWorkMutation,
	useUpdateWorkMutation,
} from "../Api/Work";

export function useFetchWork(id) {
    const [readWork] = useReadWorkMutation();
    const [workData, setWorkData] = useState(null);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const response = await readWork(id);
                setWorkData(response.data);
            } catch (error) {
                console.error("Error fetching work data:", error);
            }
        };

        if (id) {
            fetchWork();
        }
    }, [id, readWork]);

    return workData;
}

export function useFetchWorksByActivity(activityId) {
    const [getWorkByActivity] = useGetWorkByActivityMutation();
    const [workData, setWorkData] = useState(null);

    useEffect(() => {
        const fetchWorksByActivity = async () => {
            try {
                const response = await getWorkByActivity(activityId);
                setWorkData(response.data);
            } catch (error) {
                console.error("Error fetching works by activity:", error);
            }
        };

        if (activityId) {
            fetchWorksByActivity();
        }
    }, [activityId, getWorkByActivity]);

    return workData;
}

export function useFetchWorks() {
    const [readWorks] = useReadWorksMutation();
    const [works, setWorks] = useState([]);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const response = await readWorks();
                setWorks(response.data);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchWorks();
    }, [readWorks]);

    return works;
}

export function useCreateWork() {
    const [createWork] = useCreateWorkMutation();

    const createNewWork = async (data) => {
        try {
            const response = await createWork({ ...data });
            return response;
        } catch (error) {
            console.error("Error creating work:", error);
        }
    };

    return createNewWork;
}

export function useUpdateWork() {
    const [updateWork] = useUpdateWorkMutation();

    const updateExistingWork = async (id, data) => {
        try {
            const response = await updateWork({ id, ...data });
            return response;
        } catch (error) {
            console.error("Error updating work:", error);
        }
    };

    return updateExistingWork;
}

export function useDeleteWork() {
    const [deleteWork] = useDeleteWorkMutation();

    const deleteWorkById = async (id) => {
        try {
            const response = await deleteWork(id);
            return response;
        } catch (error) {
            console.error("Error deleting work:", error);
        }
    };

    return deleteWorkById;
}
