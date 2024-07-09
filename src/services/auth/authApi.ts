import { AuthResponse, LoginArgs, User } from '@/services/auth/authTypes'
import { flashcardsApi } from '@/services/flashCardsApi'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation<AuthResponse, LoginArgs>({
      // invalidatesTags: ['Me'],
      query: ({ email, password, rememberMe }) => ({
        body: { email, password, rememberMe },
        method: 'POST',
        url: `/v1/auth/login`,
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `/v1/auth/me`,
      }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authApi
