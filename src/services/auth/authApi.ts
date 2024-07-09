import { AuthResponse, LoginArgs, User } from '@/services/auth/authTypes'
import { flashcardsApi } from '@/services/flashCardsApi'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
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
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `/v1/auth/me`,
      }),
    }),
  }),
})

export const { useLoginMutation, useMeQuery } = authApi
