import {
  Card,
  GetRandomCardArgs,
  SaveCardGradeArgs,
  createCardArgs,
} from '@/services/cards/cards.types'
import { CardsInDeckResponse, GetDeckArgs } from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashCardsApi'

const cardsApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createCard: builder.mutation<Card, createCardArgs>({
      invalidatesTags: ['Cards'],
      query: ({ answer, answerImg, id, question, questionImg }) => {
        const formData = new FormData()

        formData.append('answer', answer)
        formData.append('question', question)

        if (answerImg) {
          formData.append('answerImg', answerImg)
        }

        if (questionImg) {
          formData.append('questionImg', questionImg)
        }

        return {
          body: formData,
          method: 'POST',
          url: `/v1/decks/${id}/cards`,
        }
      },
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
      query: ({ cardId, deckId: id, grade }) => ({
        body: { cardId, grade },
        method: 'POST',
        url: `/v1/decks/${id}/learn`,
      }),
    }),
    updateCard: builder.mutation<Card, createCardArgs>({
      invalidatesTags: ['Cards'],
      query: ({ answer, answerImg, id, question, questionImg }) => {
        const formData = new FormData()

        formData.append('answer', answer)
        formData.append('question', question)

        if (answerImg) {
          formData.append('answerImg', answerImg)
        }

        if (questionImg) {
          formData.append('questionImg', questionImg)
        }

        return {
          body: formData,
          method: 'PATCH',
          url: `/v1/cards/${id}`,
        }
      },
    }),
  }),
})

export const {
  useCreateCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useGetRandomCardQuery,
  useSaveCardGradeMutation,
  useUpdateCardMutation,
} = cardsApi
