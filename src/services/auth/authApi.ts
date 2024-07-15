import {
  AuthResponse,
  CreateNewPassword,
  LoginArgs,
  RecoverPassword,
  User,
} from '@/services/auth/authTypes'
import { flashcardsApi } from '@/services/flashCardsApi'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createNewPassword: builder.mutation<void, CreateNewPassword>({
      query: ({ password, token }) => {
        return {
          body: { password },
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }
      },
    }),
    login: builder.mutation<AuthResponse, LoginArgs>({
      // invalidatesTags: ['Me'],
      async onQueryStarted(
        // 1 параметр: QueryArg - аргументы, которые приходят в query
        _,
        // 2 параметр: MutationLifecycleApi - dispatch, queryFulfilled, getState и пр.
        // queryFulfilled - это промис, возвращаемый RTK Query, который разрешается,
        // когда запрос успешно завершен
        { queryFulfilled }
      ) {
        const { data } = await queryFulfilled

        if (!data) {
          return
        }

        localStorage.setItem('accessToken', data.accessToken)
        localStorage.setItem('refreshToken', data.refreshToken)
      },
      query: ({ email, password, rememberMe }) => ({
        body: { email, password, rememberMe },
        method: 'POST',
        url: `/v1/auth/login`,
      }),
    }),
    logout: builder.mutation<undefined, void>({
      query: () => ({
        method: 'POST',
        url: `/v1/auth/logout`,
      }),
    }),
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `/v1/auth/me`,
      }),
    }),
    recoverPassword: builder.mutation<void, RecoverPassword>({
      query: body => ({
        body,
        method: 'POST',
        url: 'v1/auth/recover-password',
      }),
    }),
  }),
})

export const {
  useCreateNewPasswordMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
} = authApi
