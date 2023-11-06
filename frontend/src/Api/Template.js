import { apiSlice } from "./apiSlice";

export const Template = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readTemplates: builder.query({
			query: () => "/api/templates/",
		}),

		readTemplate: builder.query({
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
	}),
});

export const {
	useReadTemplatesQuery,
	useReadTemplateQuery,
	useCreateTemplateMutation,
	useDeleteTemplateMutation,
	useUpdateTemplateMutation,
} = Template;
