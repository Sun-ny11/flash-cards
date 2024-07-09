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

export type GetRandomCardArgs = {
  id: string
  previousCardId?: string
}

export type SaveCardGradeArgs = {
  cardId: string
  deckId: string
  grade: number
}

export type createCardArgs = {
  answer: string
  answerImg?: string
  answerVideo?: string
  id: string
  question: string
  questionImg?: string
  questionVideo?: string
}
