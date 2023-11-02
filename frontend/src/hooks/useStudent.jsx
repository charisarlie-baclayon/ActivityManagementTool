import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { readStudent, readStudents, createStudent, deleteStudent, updateStudent } from "../api/Students";

export function useFetchStudent(id) {
    const [studentData, setStudentData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);
    
    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await readStudent(id, accessToken);
                setStudentData(response);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };
    
        if (id) {
            fetchStudent();
        }
    }, [id, accessToken]);
    
    return studentData;
}

export function useFetchStudents() {
    const [students, setStudents] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect (() => {
        const fetchStudents = async () => {
            try {
                const response = await readStudents(accessToken);
                setStudents(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchStudents();
    }, [accessToken]);

    return students;
}

export function useCreateStudent() {
    const accessToken = useSelector(selectCurrentToken);

    const createNewStudent = async (data) => {
        try {
            const response = await createStudent(data, accessToken);
            return response;
        } catch (error) {
            console.error("Error creating student:", error);
        }
    };

    return createNewStudent;
}

export function useUpdateStudent() {
    const accessToken = useSelector(selectCurrentToken);

    const updateExistingStudent = async (id, data) => {
        try {
            const response = await updateStudent(id, data, accessToken);
            return response;
        } catch (error) {
            console.error("Error updating student:", error);
        }
    };

    return updateExistingStudent;
}

export function useDeleteStudent() {
    const accessToken = useSelector(selectCurrentToken);

    const deleteStudentById = async (id) => {
        try {
            const response = await deleteStudent(id, accessToken);
            return response;
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return deleteStudentById;
}
