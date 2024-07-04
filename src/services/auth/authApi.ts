import { User } from '@/services/auth/authTypes'
import { flashcardsApi } from '@/services/flashCardsApi'

const authApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    me: builder.query<User, void>({
      providesTags: ['Me'],
      query: () => ({
        url: `/v1/auth/me`,
      }),
    }),
  }),
})

export const { useMeQuery } = authApi
