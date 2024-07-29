import {
  AuthResponse,
  CreateNewPassword,
  LoginArgs,
  RecoverPassword,
  ResendVerification,
  SignUpArgs,
  UpdateUserDataArgs,
  User,
  confirmEmail,
} from '@/services/auth/authTypes'
import { flashcardsApi } from '@/services/flashCardsApi'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    confirmEmail: builder.mutation<void, confirmEmail>({
      invalidatesTags: ['Me'],
      query: ({ code }) => ({
        body: { code },
        method: 'POST',
        url: '/v1/auth/verify-email',
      }),
    }),
    createNewPassword: builder.mutation<void, CreateNewPassword>({
      query: ({ password, token }) => {
        return {
          body: { password },
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }
      },
    }),
    deleteMe: builder.mutation<User, void>({
      query: () => ({
        method: 'DELETE',
        url: 'v1/auth/me',
      }),
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
      invalidatesTags: ['Me'],
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
    resendVerification: builder.mutation<void, ResendVerification>({
      query: ({ userId }) => ({
        body: {
          html: "<b>Hello, ##name##!</b><br/>Please confirm your email by clicking on the link below:<br/><a href=\"http://localhost:5173/confirm-email/##token##\">Confirm email</a>. If it doesn'''t work, copy and paste the following link in your browser:<br/>http://localhost:5173/confirm-email/##token##",
          subject: 'Email verification',
          userId,
        },
        method: 'POST',
        url: 'v1/auth/resend-verification-email',
      }),
    }),
    signUp: builder.mutation<User, SignUpArgs>({
      query: ({ email, html, name, password, sendConfirmationEmail, subject }) => ({
        body: { email, html, name, password, sendConfirmationEmail, subject },
        method: 'POST',
        url: `/v1/auth/sign-up`,
      }),
    }),
    updateUserData: builder.mutation<User, UpdateUserDataArgs>({
      invalidatesTags: ['Me'],
      query: ({ avatar, name }) => {
        const formData = new FormData()

        if (avatar) {
          formData.append('avatar', avatar)
        }

        if (name) {
          formData.append('name', name)
        }

        return {
          body: formData,
          method: 'PATCH',
          url: 'v1/auth/me',
        }
      },
    }),
  }),
})

export const {
  useConfirmEmailMutation,
  useCreateNewPasswordMutation,
  useDeleteMeMutation,
  useLoginMutation,
  useLogoutMutation,
  useMeQuery,
  useRecoverPasswordMutation,
  useResendVerificationMutation,
  useSignUpMutation,
  useUpdateUserDataMutation,
} = authApi
