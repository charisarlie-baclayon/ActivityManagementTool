import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { 
    useReadStudentsMutation,
    useReadStudentsByTeamMutation,
    useReadStudentMutation,
    useCreateStudentMutation,
    useDeleteStudentMutation,
    useUpdateStudentMutation,
} from "../api/Student";


export function useFetchStudent(id) {
    const [readStudent] = useReadStudentMutation();
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
    const [readStudents] = useReadStudentsMutation();
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

export function useFetchStudentsByTeam(id) {
    const [readStudentsByTeam] = useReadStudentsByTeamMutation();
    const [students, setStudents] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect (() => {
        const fetchStudentsByTeam = async () => {
            try {
                const response = await readStudentsByTeam(id,accessToken);
                setStudents(response);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchStudentsByTeam();
    }, [accessToken]);

    return students;
}

export function useCreateStudent() {
    const [createStudent] = useCreateStudentMutation();
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
    const [updateStudent] = useUpdateStudentMutation();
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
    const [deleteStudent] = useDeleteStudentMutation();
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
