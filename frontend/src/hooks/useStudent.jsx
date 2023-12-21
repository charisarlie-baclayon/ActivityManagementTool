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
    useAssignStudentToTeamMutation,
} from "../Api/Student";

export function useFetchStudent(id) {
    const [readStudent] = useReadStudentMutation();
    const [studentData, setStudentData] = useState(null);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchStudent = async () => {
            try {
                const response = await readStudent(id, accessToken);
                console.log(`Use Get Student By Id : ${JSON.stringify(response, null, 2)}`);
                setStudentData(response);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        if (id) {
            fetchStudent();
        }
    }, [id, accessToken, readStudent]);

    return studentData;
}

export function useFetchStudents() {
    const [readStudents] = useReadStudentsMutation();
    const [students, setStudents] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await readStudents(accessToken);
                console.log(`Use Get All Students : ${JSON.stringify(response, null, 2)}`);
                setStudents(response.data);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchStudents();
    }, [accessToken, readStudents]);

    return students;
}

export function useFetchStudentsByTeam(id) {
    const [readStudentsByTeam] = useReadStudentsByTeamMutation();
    const [students, setStudents] = useState([]);
    const accessToken = useSelector(selectCurrentToken);

    useEffect(() => {
        const fetchStudentsByTeam = async () => {
            try {
                const response = await readStudentsByTeam(id, accessToken);
                console.log(`Use Get Students By Team : ${JSON.stringify(response, null, 2)}`);
                setStudents(response.data);
            } catch (error) {
                console.log(error.response);
            }
        };

        fetchStudentsByTeam();
    }, [id, accessToken, readStudentsByTeam]);

    return students;
}

export function useCreateStudent() {
    const [createStudent] = useCreateStudentMutation();
    const accessToken = useSelector(selectCurrentToken);

    const createNewStudent = async (data) => {
        try {
            const response = await createStudent(data, accessToken);
            console.log(`Use Create Student : ${JSON.stringify(response, null, 2)}`);
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
            console.log(`Use Update Student : ${JSON.stringify(response, null, 2)}`);
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
            console.log(`Use Delete Student : ${JSON.stringify(response, null, 2)}`);
            return response;
        } catch (error) {
            console.error("Error deleting student:", error);
        }
    };

    return deleteStudentById;
}

export function useAssignStudentToTeam() {
    const [assignStudentToTeam] = useAssignStudentToTeamMutation();
    const accessToken = useSelector(selectCurrentToken);
  
    const assignStudentToTeamById = async (id, data) => {
      try {
        const response = await assignStudentToTeam(id, { team_id: data.team_id }, accessToken);
        console.log(`Use Assign Student To Team : ${JSON.stringify(response, null, 2)}`);
        return response;
      } catch (error) {
        console.error("Error assigning student to team:", error);
        throw error; // rethrow the error to handle it in the component
      }
    };
  
    return assignStudentToTeamById;
  }