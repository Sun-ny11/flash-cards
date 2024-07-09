import {
  Card,
  GetRandomCardArgs,
  SaveCardGradeArgs,
  createCardArgs,
} from '@/services/cards/cards.types'
import { CardsInDeckResponse, GetDeckArgs } from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashCardsApi'
import { getValuable } from '@/utils/utils'

const cardsApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<Card, createCardArgs>({
      invalidatesTags: ['Cards'],
      query: ({ answer, answerImg, answerVideo, id, question, questionImg, questionVideo }) => ({
        body: getValuable({ answer, answerImg, answerVideo, question, questionImg, questionVideo }),
        method: 'POST',
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    deleteCard: builder.mutation<undefined, string>({
      invalidatesTags: ['Cards'],
      query: id => ({
        method: 'DELETE',
        url: `/v1/cards/${id}`,
      }),
    }),
    getCards: builder.query<CardsInDeckResponse, GetDeckArgs>({
      providesTags: ['Cards'],
      query: ({ id, ...args }) => ({
        params: args ?? undefined,
        url: `/v1/decks/${id}/cards`,
      }),
    }),
    getRandomCard: builder.query<Card, GetRandomCardArgs>({
      query: ({ id, ...args }) => ({
        params: args ?? undefined,
        url: `/v1/decks/${id}/learn`,
      }),
    }),
    saveCardGrade: builder.mutation<Card, SaveCardGradeArgs>({
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled

        dispatch(
          cardsApi.util.updateQueryData('getRandomCard', { id: arg.deckId }, draft => {
            Object.assign(draft, result.data)
          })
        )
      },
      query: ({ cardId, deckId: id, grade }) => ({
        body: { cardId, grade },
        method: 'POST',
        url: `/v1/decks/${id}/learn`,
      }),
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetRandomCardQuery,
  useSaveCardGradeMutation,
} = cardsApi
