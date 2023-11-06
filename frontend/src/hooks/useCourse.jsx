import { useEffect, useState } from "react";
import {
    useReadCoursesMutation,
    useReadCourseMutation,
    useCreateCourseMutation,
    useDeleteCourseMutation,
    useUpdateCourseMutation,
} from "../api/Course";

export function useFetchCourse(id) {
    const [readCourse] = useReadCourseMutation();
    const [courseData, setCourseData] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await readCourse(id);
                setCourseData(response.data);
            } catch (error) {
                console.error("Error fetching course data:", error);
            }
        };
        fetchCourse();
    }, [id, readCourse]);

    return courseData;
}

export function useFetchCourses() {
    const [readCourses] = useReadCoursesMutation();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await readCourses();
                setCourses(response.data);
            } catch (error) {
                console.error("Error fetching courses data:", error);
            }
        };

        fetchCourses();
    }, [readCourses]);

    return courses;
}

export function useCreateCourse() {
    const [createCourse] = useCreateCourseMutation();

    const createNewCourse = async (data) => {
        try {
            const response = await createCourse({ ...data });
            return response;
        } catch (error) {
            console.error("Error creating course:", error);
        }
    };

    return createNewCourse;
}

export function useUpdateCourse() {
    const [updateCourse] = useUpdateCourseMutation();

    const updateExistingCourse = async (id, data) => {
        try {
            const response = await updateCourse({ id, ...data });
            return response;
        } catch (error) {
            console.error("Error updating course:", error);
        }
    };

    return updateExistingCourse;
}

export function useDeleteCourse() {
    const [deleteCourse] = useDeleteCourseMutation();

    const deleteCourseById = async (id) => {
        try {
            const response = await deleteCourse(id);
            return response;
        } catch (error) {
            console.error("Error deleting course:", error);
        }
    };

    return deleteCourseById;
}
