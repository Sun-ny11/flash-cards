import {
  Card,
  CardsInDeckResponse,
  CreateDeckResponse,
  Deck,
  DeckResponse,
  DecksListResponse,
  GetDeckArgs,
  GetDecksArgs,
  GetRandomCardArgs,
  MinMaxCardsResponse,
  SaveCardGradeArgs,
  createCardArgs,
  createDeckArgs,
  updateDeckArgs,
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
      createCard: builder.mutation<Card, createCardArgs>({
        invalidatesTags: ['Cards'],
        query: ({ answer, answerImg, answerVideo, id, question, questionImg, questionVideo }) => ({
          body: { answer, answerImg, answerVideo, question, questionImg, questionVideo },
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }),
      }),
      createDeck: builder.mutation<CreateDeckResponse, createDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ cover, isPrivate, name }) => ({
          body: { cover, isPrivate, name },
          method: 'POST',
          url: `/v1/decks`,
        }),
      }),
      deleteCard: builder.mutation<undefined, string>({
        invalidatesTags: ['Cards'],
        query: id => ({
          method: 'DELETE',
          url: `/v1/cards/${id}`,
        }),
      }),
      deleteDeck: builder.mutation<Deck, string>({
        invalidatesTags: ['Decks'],
        query: id => ({
          method: 'DELETE',
          url: `/v1/decks/${id}`,
        }),
      }),
      getCards: builder.query<CardsInDeckResponse, GetDeckArgs>({
        providesTags: ['Cards'],
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
        providesTags: ['Decks'],
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
      updateDeck: builder.mutation<Deck, updateDeckArgs>({
        invalidatesTags: ['Decks'],
        query: ({ cover, id, isPrivate, name }) => ({
          body: { cover, isPrivate, name },
          method: 'PATCH',
          url: `/v1/decks/${id}`,
        }),
      }),
    }
  },
  reducerPath: 'flashcardsApi',
  tagTypes: ['Decks', 'Cards'],
})

export const {
  useCreateCardMutation,
  useCreateDeckMutation,
  useDeleteCardMutation,
  useDeleteDeckMutation,
  useGetCardsQuery,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useGetRandomCardQuery,
  useSaveCardGradeMutation,
  useUpdateDeckMutation,
} = flashcardsApi
