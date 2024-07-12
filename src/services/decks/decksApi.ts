import {
  Deck,
  DecksListResponse,
  GetDecksArgs,
  MinMaxCardsResponse,
  createDeckArgs,
  updateDeckArgs,
} from '@/services/decks/decks.types'
import { flashcardsApi } from '@/services/flashCardsApi'

const decksApi = flashcardsApi.injectEndpoints({
  endpoints: builder => ({
    createDeck: builder.mutation<Deck, createDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
        const cachedArgsForQuery = decksApi.util.selectCachedArgsForQuery(
          getState(),
          'getDecks'
        ) as GetDecksArgs[]

        try {
          const { data } = await queryFulfilled

          cachedArgsForQuery.forEach(cachedArgs => {
            dispatch(
              decksApi.util.updateQueryData('getDecks', cachedArgs, draft => {
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
      query: ({ cover, isPrivate, name }) => {
        const formData = new FormData()

        formData.append('name', name)

        if (isPrivate) {
          formData.append('isPrivate', isPrivate.toString())
        }

        if (cover) {
          formData.append('cover', cover)
        }

        return {
          body: formData,
          method: 'POST',
          url: `/v1/decks`,
        }
      },
    }),
    deleteDeck: builder.mutation<Deck, string>({
      invalidatesTags: ['Decks'],
      query: id => ({
        method: 'DELETE',
        url: `/v1/decks/${id}`,
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
    updateDeck: builder.mutation<Deck, updateDeckArgs>({
      invalidatesTags: ['Decks'],
      async onQueryStarted({ cover, id, ...args }, { dispatch, getState, queryFulfilled }) {
        const cachedArgsForQuery = decksApi.util.selectCachedArgsForQuery(getState(), 'getDecks')
        const patchResults: any[] = []

        cachedArgsForQuery.forEach(cachedArgs => {
          patchResults.push(
            dispatch(
              decksApi.util.updateQueryData('getDecks', cachedArgs, draft => {
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
      query: ({ cover, id, isPrivate, name }) => {
        const formData = new FormData()

        formData.append('name', name)

        if (isPrivate) {
          formData.append('isPrivate', isPrivate.toString())
        }

        if (cover) {
          formData.append('cover', cover)
        }

        return {
          body: formData,
          method: 'PATCH',
          url: `/v1/decks/${id}`,
        }
      },
    }),
  }),
})

export const {
  useCreateDeckMutation,
  useDeleteDeckMutation,
  useGetDeckQuery,
  useGetDecksQuery,
  useGetMinMaxCardsQuery,
  useUpdateDeckMutation,
} = decksApi
