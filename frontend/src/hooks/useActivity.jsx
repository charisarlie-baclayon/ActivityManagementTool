import { useEffect, useState } from "react";
import {
	useCreateActivityMutation,
	useCreateActivityFromTemplateMutation,
	useAddEvaluationToActivityMutation,
	useDeleteEvaluationFromActivityMutation,
	useSubmitActivityMutation,
	useGetActivitiesByClassMutation,
	useGetSubmittedActivitiesByClassMutation,
	useGetSubmittedActivitiesByTeamMutation,
	useGetActivitiesByTeamMutation,
} from "../api/Activity";

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
			return response;
		} catch (error) {
			console.error("Error adding evaluation to activity:", error);
		}
	};

	return addEvaluation;
}

/**
 * @description Hook to submit an activity.
 * @returns {function} submitTheActivity - Function to submit an activity.
 */
export function useSubmitActivity() {
	const [submitActivity] = useSubmitActivityMutation();

	const submitTheActivity = async (id) => {
		try {
			const response = await submitActivity(id);
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
				setActivity(response.data);
			} catch (error) {
				console.error("Error fetching activity data:", error);
			}
		};

		fetchActivity();
	}, [id, getActivitiesByTeam]);

	return activity;
}

/**
 * @description Hook to get all activities from a class.
 * @param {*} id
 * @returns {object} activity - Object containing all activities from a class.
 */
export function useGetActivitiesByClass(id) {
	const [getActivitiesByClass] = useGetActivitiesByClassMutation();
	const [activities, setActivities] = useState(null);

	useEffect(() => {
		const fetchActivities = async () => {
			try {
				const response = await getActivitiesByClass(id);
				setActivities(response.data);
			} catch (error) {
				console.error("Error fetching activities data:", error);
			}
		};

		fetchActivities();
	}, [id, getActivitiesByClass]);

	return activities;
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
				setActivities(response.data);
			} catch (error) {
				console.error("Error fetching submitted activities data:", error);
			}
		};

		fetchActivities();
	}, [id, getSubmittedActivitiesByClass]);

	return activities;
}
//#endregion GET ACTIVITY

//#region DELETE ACTIVITY

/**
 * @description Hook to delete an activity.
 * @returns {function} deleteActivityById - Function to delete an activity.
 */
export function useDeleteActivity() {
	const [deleteEvaluationFromActivity] =
		useDeleteEvaluationFromActivityMutation();

	const deleteActivityById = async (id) => {
		try {
			const response = await deleteEvaluationFromActivity(id);
			return response;
		} catch (error) {
			console.error("Error deleting activity:", error);
		}
	};

	return deleteActivityById;
}

//#endregion DELETE ACTIVITY
