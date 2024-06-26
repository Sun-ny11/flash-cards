import {
  Card,
  CardsInDeckResponse,
  DeckResponse,
  DecksListResponse,
  GetDeckArgs,
  GetDecksArgs,
  GetRandomCardArgs,
  MinMaxCardsResponse,
  SaveCardGradeArgs,
} from '@/services/decks/decks.types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const flashcardsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.flashcards.andrii.es',
    credentials: 'include',
    prepareHeaders: headers => {
      headers.append('x-auth-skip', 'true')
    },
  }),
  endpoints: builder => {
    return {
      getCards: builder.query<CardsInDeckResponse, GetDeckArgs>({
        query: ({ id, ...args }) => ({
          params: args ?? undefined,
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      getDeck: builder.query<DeckResponse, string>({
        query: id => ({
          url: `v1/decks/${id}`,
        }),
      }),
      getDecks: builder.query<DecksListResponse, GetDecksArgs | void>({
        query: args => ({
          params: args ?? undefined,
          url: `v2/decks`,
        }),
      }),
      getMinMaxCards: builder.query<MinMaxCardsResponse, void>({
        query: () => ({
          url: `/v2/decks/min-max-cards`,
        }),
      }),
      getRandomCard: builder.query<Card, GetRandomCardArgs>({
        query: ({ id, ...args }) => ({
          params: args ?? undefined,
          url: `/v1/decks/${id}/learn`,
        }),
      }),
      saveCardGrade: builder.mutation<Card, SaveCardGradeArgs>({
        query: ({ cardId, deckId: id, grade }) => ({
          body: { cardId, grade },
          method: 'POST',
          url: `/v1/decks/${id}/learn`,
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
})

export const {
  useGetCardsQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useGetRandomCardQuery,
  useSaveCardGradeMutation,
} = flashcardsApi
