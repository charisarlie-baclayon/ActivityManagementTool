import { useEffect, useState } from "react";
import {
	useReadClassesMutation,
	useReadClassMutation,
	useCreateClassMutation,
	useDeleteClassMutation,
	useUpdateClassMutation,
	useReadClassesBySectionMutation,
	useReadClassesByCourseMutation,
} from "../Api/Classes";

export function useFetchClass(id) {
	const [readClass] = useReadClassMutation();
	const [classData, setClassData] = useState(null);

	useEffect(() => {
		const fetchClass = async () => {
			try {
				const response = await readClass(id);
				console.log(`Use Get Class By Id : ${JSON.stringify(response, null, 2)}`);
				setClassData(response.data);
			} catch (error) {
				console.error("Error fetching class data:", error);
			}
		};
		fetchClass();
	}, [id, readClass]);

	return classData;
}

export function useFetchClasses() {
	const [readClasses] = useReadClassesMutation();
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const response = await readClasses();
				console.log(`Use Get All Classes : ${JSON.stringify(response, null, 2)}`);
				setClasses(response.data);
			} catch (error) {
				console.error("Error fetching classes data:", error);
			}
		};

		fetchClasses();
	}, [readClasses]);

	return classes;
}

export function useFetchClassesBySection(section) {
	const [readClasses] = useReadClassesBySectionMutation();
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const response = await readClasses(section);
				console.log(`Use Get Classes By Section : ${JSON.stringify(response, null, 2)}`);
				setClasses(response.data);
			} catch (error) {
				console.error("Error fetching classes data:", error);
			}
		};

		fetchClasses();
	}, [readClasses, section]);

	return classes;
}

export function useFetchClassesByCourse(course_id) {
	const [readClasses] = useReadClassesByCourseMutation();
	const [classes, setClasses] = useState([]);

	useEffect(() => {
		const fetchClasses = async () => {
			try {
				const response = await readClasses(course_id);
				console.log(`Use Get Classes By Course : ${JSON.stringify(response, null, 2)}`);
				setClasses(response.data);
			} catch (error) {
				console.error("Error fetching classes data:", error);
			}
		};

		fetchClasses();
	}, [readClasses, course_id]);

	return classes;
}

export function useCreateClass() {
	const [createClass] = useCreateClassMutation();

	const createNewClass = async (data) => {
		try {
			const response = await createClass({ ...data });
			console.log(`Use Create Class : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error creating class:", error);
		}
	};

	return createNewClass;
}

export function useUpdateClass() {
	const [updateClass] = useUpdateClassMutation();

	const updateExistingClass = async (id, data) => {
		try {
			const response = await updateClass({ id, ...data });
			console.log(`Use Update Class : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error updating class:", error);
		}
	};

	return updateExistingClass;
}

export function useDeleteClass() {
	const [deleteClass] = useDeleteClassMutation();

	const deleteClassById = async (id) => {
		try {
			const response = await deleteClass(id);
			console.log(`Use Delete Class : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error deleting class:", error);
		}
	};

	return deleteClassById;
}
