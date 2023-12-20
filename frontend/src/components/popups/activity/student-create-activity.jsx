import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";


export const Student_CreateActivity = () => {
	const navigate = useNavigate();
	const handleSubmit = async () => {
		const titleInput = document.getElementById("title-input");
		const descriptionInput = document.getElementById("description-input");
		const linkInput = document.getElementById("link-input");

		const newActivity = {
			name: titleInput.value,
			description: descriptionInput.value,
			link: linkInput.value,
		};

		try {
			//await createActivity(newActivity);
			handleNavigateToActivity();

			if (window.confirm("Created Successfully.")) {
				window.location.reload();
			}
		} catch (error) {
			console.error(error);
			// Handle error, e.g., show an error message to the user
		}
	};

	const handleNavigateToActivity = () => {
		navigate("/student/activities"); // Navigate to the desired route
	};

	return (
		<div>
			<h1>Create Activity</h1>
			<Form>
				<Form.Group className="mb-3" controlId="title-input">
					<Form.Label>Title</Form.Label>
					<Form.Control
						as="textarea" rows={1}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="description-input">
					<Form.Label>Description</Form.Label>
					<Form.Control
						as="textarea" rows={8}
					/>
				</Form.Group>
				<Form.Group className="mb-3" controlId="link-input">
					<Form.Label>Link</Form.Label>
					<Form.Control
						as="textarea" rows={3}
					/>
				</Form.Group>
			</Form>
			<button className="btn btn-secondary" onClick={handleSubmit}>
				Submit
			</button>
		</div>
	);
};

