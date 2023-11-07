import { apiSlice } from "./apiSlice";

export const Template = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readTemplates: builder.mutation({
			query: () => "/api/templates/",
		}),

		readTemplate: builder.mutation({
			query: (id) => `/api/templates/${id}/`,
		}),

		createTemplate: builder.mutation({
			query: (data) => ({
				url: "/api/templates/",
				method: "POST",
				body: { ...data },
			}),
		}),

		deleteTemplate: builder.mutation({
			query: (id) => ({
				url: `/api/templates/${id}/`,
				method: "DELETE",
			}),
		}),

		updateTemplate: builder.mutation({
			query: (data) => ({
				url: `/api/templates/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),

		readTemplatesByCourse: builder.mutation({
			query: (course_id) => ({
				url: `/api/templates/get_templates_by_course/?course_id=${course_id}`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useReadTemplatesMutation,
	useReadTemplateMutation,
	useCreateTemplateMutation,
	useDeleteTemplateMutation,
	useUpdateTemplateMutation,
	useReadTemplatesByCourseMutation,
} = Template;
