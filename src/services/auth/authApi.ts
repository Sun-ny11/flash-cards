import {
  LoginArgs,
  RecoverPasswordArgs,
  ResendCheckEmailArgs,
  SignUpArgs,
  User,
} from '@/services/auth/authTypes'
import { baseApi } from '@/services/baseApi'

const authApi = baseApi.injectEndpoints({
  endpoints: build => {
    return {
      checkEmail: build.mutation<void, { code: string }>({
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/verify-email',
        }),
      }),
      createAccessToken: build.mutation<void, void>({
        query: () => ({ method: 'POST', url: '/v1/auth/refresh-token' }),
      }),
      getMe: build.query<User | undefined, void>({
        providesTags: ['Me'],
        query: () => '/v1/auth/me',
      }),
      login: build.mutation<void, LoginArgs>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'POST',
          url: '/v1/auth/login',
        }),
      }),
      logout: build.mutation<void, void>({
        query: () => ({ method: 'POST', url: '/v1/auth/logout' }),
      }),
      recoverPassword: build.mutation<void, RecoverPasswordArgs>({
        query: args => ({ body: args, method: 'POST', url: '/v1/auth/recover-password' }),
      }),
      resendCheckEmail: build.mutation<void, ResendCheckEmailArgs>({
        query: args => ({ body: args, method: 'POST', url: '/v1/auth/resend-verification-email' }),
      }),
      resetPassword: build.mutation<void, { password: string; token: string }>({
        query: ({ password, token }) => ({
          body: { password },
          method: 'POST',
          url: `/v1/auth/reset-password/${token}`,
        }),
      }),
      signUp: build.mutation<User, SignUpArgs>({
        query: args => ({ body: args, method: 'POST', url: '/v1/auth/sign-up' }),
      }),
      updateProfile: build.mutation<User, FormData>({
        invalidatesTags: ['Me'],
        query: args => ({
          body: args,
          method: 'PATCH',
          url: '/v1/auth/me',
        }),
      }),
    }
  },
})

export const {
  useCheckEmailMutation,
  useCreateAccessTokenMutation,
  useGetMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useRecoverPasswordMutation,
  useResendCheckEmailMutation,
  useResetPasswordMutation,
  useSignUpMutation,
  useUpdateProfileMutation,
} = authApi
