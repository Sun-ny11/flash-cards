import {
  Card,
  CardsInDeckResponse,
  Deck,
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
      createDeck: builder.mutation<Deck, createDeckArgs>({
        invalidatesTags: ['Decks'],
        async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
          const cachedArgsForQuery = flashcardsApi.util.selectCachedArgsForQuery(
            getState(),
            'getDecks'
          ) as GetDecksArgs[]

          try {
            const { data } = await queryFulfilled

            cachedArgsForQuery.forEach(cachedArgs => {
              dispatch(
                flashcardsApi.util.updateQueryData('getDecks', cachedArgs, draft => {
                  if (cachedArgs.currentPage !== 1) {
                    return
                  }
                  draft.items.unshift(data)
                  // draft.items.pop()
                })
              )
            })
          } catch (e) {
            console.log(e)
          }
        },
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
      getDeck: builder.query<Deck, string>({
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
        async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
          const cachedArgsForQuery = flashcardsApi.util.selectCachedArgsForQuery(
            getState(),
            'getDecks'
          )
          const patchResults: any[] = []

          cachedArgsForQuery.forEach(cachedArgs => {
            patchResults.push(
              dispatch(
                flashcardsApi.util.updateQueryData('getDecks', cachedArgs, draft => {
                  const itemToUpdateIndex = draft.items.findIndex(deck => deck.id === id)

                  if (itemToUpdateIndex === -1) {
                    return
                  }

                  draft.items[itemToUpdateIndex] = { ...draft.items[itemToUpdateIndex], ...args }
                })
              )
            )
          })

          try {
            await queryFulfilled
          } catch (e) {
            patchResults.forEach(patchResult => {
              // в случае ошибки вернет предыдущее значение
              patchResult.undo()
            })
          }
        },
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
