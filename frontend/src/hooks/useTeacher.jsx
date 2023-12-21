import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readTeacher, readTeachers, createTeacher, deleteTeacher, updateTeacher } from "../Api/Teachers";

export function useFetchTeacher(id) {
    const [teacherData, setTeacherData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await readTeacher(id, accessToken);
                console.log(`Use Get Teacher By Id : ${JSON.stringify(response, null, 2)}`);
                setTeacherData(response);
            } catch (error) {
                console.error("Error fetching teacher data:", error);
            }
        };

        if (id) {
            fetchTeacher();
        }
    }, [id, accessToken]);

    return teacherData;
}

export function useFetchTeachers() {
    const [teachers, setTeachers] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await readTeachers(accessToken);
                console.log(`Use Get All Teachers : ${JSON.stringify(response, null, 2)}`);
                setTeachers(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchTeachers();
    }, [accessToken]);

    return teachers;
}

export function useCreateTeacher() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewTeacher = async (data) => {
        try {
            const response = await createTeacher(data, accessToken);
            console.log(`Use Create Teacher : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error creating teacher:", error);
        }
    };

    return createNewTeacher;
}

export function useUpdateTeacher() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingTeacher = async (id, data) => {
        try {
            const response = await updateTeacher(id, data, accessToken);
            console.log(`Use Update Teacher : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error updating teacher:", error);
        }
    };

    return updateExistingTeacher;
}

export function useDeleteTeacher() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteTeacherById = async (id) => {
        try {
            const response = await deleteTeacher(id, accessToken);
            console.log(`Use Delete Teacher : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error deleting teacher:", error);
        }
    };

    return deleteTeacherById;
}
