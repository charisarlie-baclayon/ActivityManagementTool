import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readClass, readClasses, createClass, deleteClass, updateClass } from "../api/Classes";

export function useFetchClass(id) {
    const [classData, setClassData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const response = await readClass(id, accessToken);
                setClassData(response);
            } catch (error) {
                console.error("Error fetching class data:", error);
            }
        };

        if (id) {
            fetchClass();
        }
    }, [id, accessToken]);

    return classData;
}

export function useFetchClasses() {
    const [classes, setClasses] = useState([]);
    const accessToken = useSelector(selectCurrentToken);
    useEffect (() => {
        const fetchClasses = async () => {
            try {
                const response = await readClasses(accessToken);
                setClasses(response);
            } catch (error) {
                console.log(error.response);
            }
        };
    
        fetchClasses();
    }, [accessToken]);

    return classes;
}

export function useCreateClass() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewClass = async (data) => {
        try {
            const response = await createClass(data, accessToken);
            return response;
        } catch (error) {
            console.error("Error creating class:", error);
        }
    };

    return createNewClass;
}

export function useUpdateClass() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingClass = async (id, data) => {
        try {
            const response = await updateClass(id, data, accessToken);
            return response;
        } catch (error) {
            console.error("Error updating class:", error);
        }
    };

    return updateExistingClass;
}

export function useDeleteClass() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteClassById = async (id) => {
        try {
            const response = await deleteClass(id, accessToken);
            return response;
        } catch (error) {
            console.error("Error deleting class:", error);
        }
    };

    return deleteClassById;
}
