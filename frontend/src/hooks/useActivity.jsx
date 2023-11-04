import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

export function useFetchActivity(id) {
    const [activityData, setActivityData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);
    
    useEffect(() => {
        const fetchActivity = async () => {
            try {
                const response = await readActivity(id, accessToken);
                setActivityData(response);
            } catch (error) {
                console.error("Error fetching activity data:", error);
            }
        };
    
        if (id) {
            fetchActivity();
        }
    }, [id, accessToken]);
    
    return activityData;
}

export function useFetchActivities() {
    const [activities, setActivities] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect (() => {
        const fetchActivities = async () => {
            try {
                const response = await readActivities(accessToken);
                setActivities(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchActivities();
    }, [accessToken]);

    return activities;
}

export function useCreateActivity() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewActivity = async (data) => {
        try {
            const response = await createActivity(data, accessToken);
            return response;
        } catch (error) {
            console.error("Error creating activity:", error);
        }
    };

    return createNewActivity;
}

export function useUpdateActivity() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingActivity = async (id, data) => {
        try {
            const response = await updateActivity(id, data, accessToken);
            return response;
        } catch (error) {
            console.error("Error updating activity:", error);
        }
    };

    return updateExistingActivity;
}

export function useDeleteActivity() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteActivityById = async (id) => {
        try {
            const response = await deleteActivity(id, accessToken);
            return response;
        } catch (error) {
            console.error("Error deleting activity:", error);
        }
    };

    return deleteActivityById;
}
