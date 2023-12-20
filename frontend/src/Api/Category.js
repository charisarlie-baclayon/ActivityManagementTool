import { apiSlice } from "./apiSlice";

export const Category = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		readCategories: builder.query({
			query: () => "/api/categories/",
		}),

		readCategory: builder.query({
			query: (id) => `/api/categories/${id}/`,
		}),

		createCategory: builder.mutation({
			query: (data) => ({
				url: "/api/categories/",
				method: "POST",
				body: { ...data },
			}),
		}),

		deleteCategory: builder.mutation({
			query: (id) => ({
				url: `/api/categories/${id}/`,
				method: "DELETE",
			}),
		}),

		updateCategory: builder.mutation({
			query: (data) => ({
				url: `/api/categories/${data.id}/`,
				method: "PUT",
				body: { ...data },
			}),
		}),
	}),
});

export const {
	useReadCategoriesQuery,
	useReadCategoryQuery,
	useCreateCategoryMutation,
	useDeleteCategoryMutation,
	useUpdateCategoryMutation,
} = Category;
