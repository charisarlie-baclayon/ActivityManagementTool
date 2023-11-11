import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readWork, readWorks, createWork, deleteWork, updateWork } from "../api/Works";

export function useFetchWork(id) {
    const [workData, setWorkData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchWork = async () => {
            try {
                const response = await readWork(id, accessToken);
                console.log(`Use Get Work By Id : ${JSON.stringify(response, null, 2)}`);
                setWorkData(response);
            } catch (error) {
                console.error("Error fetching work data:", error);
            }
        };

        if (id) {
            fetchWork();
        }
    }, [id, accessToken]);

    return workData;
}

export function useFetchWorks() {
    const [works, setWorks] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const response = await readWorks(accessToken);
                console.log(`Use Get All Works : ${JSON.stringify(response, null, 2)}`);
                setWorks(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchWorks();
    }, [accessToken]);

    return works;
}

export function useCreateWork() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewWork = async (data) => {
        try {
            const response = await createWork(data, accessToken);
            console.log(`Use Create Work : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error creating work:", error);
        }
    };

    return createNewWork;
}

export function useUpdateWork() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingWork = async (id, data) => {
        try {
            const response = await updateWork(id, data, accessToken);
            console.log(`Use Update Work : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error updating work:", error);
        }
    };

    return updateExistingWork;
}

export function useDeleteWork() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteWorkById = async (id) => {
        try {
            const response = await deleteWork(id, accessToken);
            console.log(`Use Delete Work : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error deleting work:", error);
        }
    };

    return deleteWorkById;
}
