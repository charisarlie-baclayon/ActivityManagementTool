import { apiSlice } from "./apiSlice";

export const Authentication = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		loginTeacher: builder.mutation({
			query: (credentials) => ({
				url: "/api/teachers/login/",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		loginStudent: builder.mutation({
			query: (credentials) => ({
				url: "/api/students/login/",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		signUpTeacher: builder.mutation({
			query: (credentials) => ({
				url: "/api/teachers/",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		signUpStudent: builder.mutation({
			query: (credentials) => ({
				url: "/api/students/",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		acquireToken: builder.mutation({
			query: (credentials) => ({
				url: "/tokens/acquire",
				method: "POST",
				body: { ...credentials },
			}),
		}),
		refreshToken: builder.mutation({
			query: (refreshToken) => ({
				url: "/tokens/refresh",
				method: "POST",
				body: {
					refresh: refreshToken,
				},
			}),
		}),
		verifyToken: builder.mutation({
			query: (token) => ({
				url: "/tokens/verify",
				method: "POST",
				body: {
					token,
				},
			}),
		}),
	}),
});

export const {
	useLoginTeacherMutation,
	useLoginStudentMutation,
	useAcquireTokenMutation,
	useRefreshTokenMutation,
	useVerifyTokenMutation,
	useSignUpTeacherMutation,
	useSignUpStudentMutation,
} = Authentication;
