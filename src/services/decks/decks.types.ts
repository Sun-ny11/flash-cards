export type Card = {
  answer: string
  answerImg: string
  answerVideo: string
  created: string
  deckId: string
  grade: number
  id: string
  question: string
  questionImg: string
  questionVideo: string
  shots: number
  updated: string
  userId: string
}

export type Author = {
  id: string
  name: string
}

export type Deck = {
  author: Author
  cardsCount: number
  cover?: string
  created: string
  id: string
  isFavorite: boolean
  isPrivate: boolean
  name: string
  updated: string
  userId: string
}

export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}

export type MinMaxCardsResponse = {
  max: 1
  min: 1
}

export type DecksListResponse = {
  items: Deck[]
  pagination: Pagination
}

export type CardsInDeckResponse = {
  items: Card[]
  pagination: Pagination
}

export type GetDeckArgs = {
  answer?: string
  currentPage?: number
  id: string
  itemsPerPage?: number
  orderBy?: string
  question?: string
}

export type GetDecksArgs = {
  authorId?: null | string
  currentPage?: null | number
  itemsPerPage?: null | number
  maxCardsCount?: null | number
  minCardsCount?: null | number
  name?: null | string
  orderBy?: null | string
}

export type GetRandomCardArgs = {
  id: string
  previousCardId?: string
}

export type createDeckArgs = {
  cover?: string
  isPrivate: boolean
  name: string
}

export type updateDeckArgs = { id: string } & createDeckArgs

export type createCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}

export type SaveCardGradeArgs = {
  cardId: string
  deckId: string
  grade: number
}
