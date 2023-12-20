import { useEffect, useState } from "react";
import {
	useCreateActivityMutation,
	useCreateActivityFromTemplateMutation,
	useAddEvaluationToActivityMutation,
	useSubmitActivityMutation,
	useGetActivitiesByClassMutation,
	useGetSubmittedActivitiesByClassMutation,
	useGetSubmittedActivitiesByTeamMutation,
	useGetActivitiesByTeamMutation,
	useGetAllActivitiesMutation,
	useGetActivitiesByCourseMutation,
	useGetActivityMutation,
	useDeleteActivityMutation,
	useUpdateActivityMutation,
	useDeleteEvaluationFromActivityMutation,
} from "../Api/Activity";

//#region CREATE ACTIVITY

/**
 * @description Hook to create a new activity.
 * @returns {function} createNewActivity - Function to create a new activity.
 */
export function useCreateActivity() {
	const [createActivity] = useCreateActivityMutation();

	const createNewActivity = async (data) => {
		try {
			const response = await createActivity({ ...data });
			console.log(`Use Create Activity : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error creating activity:", error);
		}
	};

	return createNewActivity;
}

/**
 * @description Hook to create a new activity from a template.
 * @returns {function} createNewActivity - Function to create a new activity from a template.
 */
export function useCreateActivityfromTemplate() {
	const [createActivityFromTemplate] = useCreateActivityFromTemplateMutation();

	const createNewActivity = async (data) => {
		try {
			const response = await createActivityFromTemplate({ ...data });
			console.log(`Use Create Activity From Template : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error creating activity:", error);
		}
	};

	return createNewActivity;
}

/**
 * @description Hook to add an evaluation to an activity.
 * @returns {function} addEvaluation - Function to add an evaluation to an activity.
 */
export function useAddEvaluationToActivity() {
	const [addEvaluationToActivity] = useAddEvaluationToActivityMutation();

	const addEvaluation = async (id, data) => {
		try {
			const response = await addEvaluationToActivity(id, { ...data });
			console.log(`Use Add Evaluation to Activity : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error adding evaluation to activity:", error);
		}
	};

	return addEvaluation;
}

//#region DELETE EVALUATION

/**
 * @description Hook to delete an evaluation from an activity.
 * @returns {function} deleteEvaluationFromActivity - Function to delete an evaluation from an activity.
 */
export function useDeleteEvaluationFromActivity() {
	const [deleteEvaluationFromActivity] = useDeleteEvaluationFromActivityMutation();

	const deleteEvaluation = async (id) => {
		try {
			const response = await deleteEvaluationFromActivity(id);
			console.log(`Use Delete Evaluation Activity : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error deleting evaluation from activity:", error);
		}
	};

	return deleteEvaluation;
}

//#endregion DELETE EVALUATION


/**
 * @description Hook to submit an activity.
 * @returns {function} submitTheActivity - Function to submit an activity.
 */
export function useSubmitActivity() {
	const [submitActivity] = useSubmitActivityMutation();

	const submitTheActivity = async (id) => {
		try {
			const response = await submitActivity(id);
			console.log(`Use Submit Activity : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error updating activity:", error);
		}
	};

	return submitTheActivity;
}
//# endregion CREATE ACTIVITY

//#region GET ACTIVITY

/**
 * @description Hook to get all activities from a team.
 * @param {} id  - ID of the team.
 * @returns {object} activity - Object containing all activities from a team.
 */
export function useGetActivityByTeam(id) {
	const [getActivitiesByTeam] = useGetActivitiesByTeamMutation();
	const [activity, setActivity] = useState(null);

	useEffect(() => {
		const fetchActivity = async () => {
			try {
				const response = await getActivitiesByTeam(id);
				console.log(`Use Get Activity By Team : ${JSON.stringify(response, null, 2)}`);
				setActivity(response.data);
			} catch (error) {
				console.error("Error fetching activity data:", error);
			}
		};

		fetchActivity();
	}, [id, getActivitiesByTeam]);

	return activity;
}
export function useGetActivitiesByCourse(id) {
	const [getActivitiesByCourse] = useGetActivitiesByCourseMutation();
	const [activity, setActivity] = useState(null);

	useEffect(() => {
		const fetchActivity = async () => {
			try {
				const response = await getActivitiesByCourse(id);
				console.log(`Use Get Activity By Course : ${JSON.stringify(response, null, 2)}`);
				setActivity(response.data);
			} catch (error) {
				console.error("Error fetching activity data:", error);
			}
		};

		fetchActivity();
	}, [id, getActivitiesByCourse]);

	return activity;
}

/**
 * @description Hook to get all activities from a class.
 * @param {*} id
 * @returns {object} activity - Object containing all activities from a class.
 */
export function useGetActivitiesByClass() {
	const [getActivitiesByClass] = useGetActivitiesByClassMutation();

	const fetchActivitiesByClass = async (id) => {
		try {
			const response = await getActivitiesByClass(id);
			console.log(`Use Get Activity By Class : ${JSON.stringify(response, null, 2)}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching activities data:", error);
		}
	};

	return { fetchActivitiesByClass };
}

/**
 * @description Hook to get all submitted activities from a team.
 * @param {} id
 * @returns {object} activities - Object containing all submitted activities from a team.
 */
export function useGetSubmittedActivitiesByTeam(id) {
	const [getSubmittedActivitiesByTeam] =
		useGetSubmittedActivitiesByTeamMutation();
	const [activities, setActivities] = useState(null);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await getSubmittedActivitiesByTeam(id);
				console.log(`Use Get Submitted Activity By Team : ${JSON.stringify(response, null, 2)}`);
				setActivities(response.data);
			} catch (error) {
				console.error("Error fetching submitted activity data:", error);
			}
		};

		fetchActivities();
	}, [id, getSubmittedActivitiesByTeam]);

	return activities;
}

/**
 * @description Hook to get all submitted activities from a class.
 * @param {*} id
 * @returns {object} activities - Object containing all submitted activities from a class.
 */
export function useGetSubmittedActivitiesByClass(id) {
	const [getSubmittedActivitiesByClass] =
		useGetSubmittedActivitiesByClassMutation();
	const [activities, setActivities] = useState(null);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await getSubmittedActivitiesByClass(id);
				console.log(`Use Get Submitted Activity By Class : ${JSON.stringify(response, null, 2)}`);
				setActivities(response.data);
			} catch (error) {
				console.error("Error fetching submitted activities data:", error);
			}
		};

		fetchActivities();
	}, [id, getSubmittedActivitiesByClass]);

	return activities;
}

export function useFetchActivities() {
	const [getAllActivities] = useGetAllActivitiesMutation();
	const [activities, setActivities] = useState([]);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await getAllActivities();
				console.log(`Use Get All Activity : ${JSON.stringify(response, null, 2)}`);
				setActivities(response.data);
			} catch (error) {
				console.error("Error fetching teams data:", error);
			}
		};

		fetchActivities();
	}, [getAllActivities]);

	return activities;
}

export function useFetchActivity(id) {
	const [readActivity] = useGetActivityMutation();
	const [activityData, setActivityData] = useState(null);

	useEffect(() => {
		const fetchActivity = async () => {
			try {
				const response = await readActivity(id);
				console.log(`Use Get Activity : ${JSON.stringify(response, null, 2)}`);
				setActivityData(response.data);
			} catch (error) {
				console.error("Error fetching activity data:", error);
			}
		};
		fetchActivity();
	}, [id, readActivity]);

	return activityData;
}

export function useUpdateActivity() {
	const [updateClass] = useUpdateActivityMutation();

	const updateExistingClass = async (id, data) => {
		try {
			const response = await updateClass({ id, ...data });
			console.log(`Use Update Activity : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error updating class:", error);
		}
	};

	return updateExistingClass;
}
//#endregion GET ACTIVITY

//#region DELETE ACTIVITY

/**
 * @description Hook to delete an activity.
 * @returns {function} deleteActivityById - Function to delete an activity.
 */
export function useDeleteActivity() {
	const [deleteActivity] = useDeleteActivityMutation();

	const deleteActivityById = async (id) => {
		try {
			const response = await deleteActivity(id);
			console.log(`Use Delete Activity : ${JSON.stringify(response, null, 2)}`);
			return response;
		} catch (error) {
			console.error("Error deleting activity:", error);
		}
	};

	return deleteActivityById;
}

//#endregion DELETE ACTIVITY
