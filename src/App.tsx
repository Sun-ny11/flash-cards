import { Link } from 'react-router-dom'

import { UserDropdown } from '@/features/header/ui/user-dropdown'

import { Button } from './components/ui/button'
import { DecksList } from './features/decks/ui/decksList/decksList'

const testUser = {
  avatar: {
    alt: 'avatar',
    src: 'public/img/avatar.png',
  },
  email: 'j&johnson@gmail.com',
  name: 'Ivan',
}

export function App() {
  return (
    <>
      <Button as={Link} target={'_blank'} to={'https://www.google.com/'}>
        Hello
      </Button>
      <UserDropdown avatar={testUser.avatar} email={testUser.email} name={testUser.name} />

      <DecksList items={resp.items} />
    </>
  )
}
const resp = {
  // данные из get запроса на получение колод
  items: [
    {
      author: {
        id: '3752c89f-88b2-4e81-9344-8b3d61afecbe',
        name: 'alinamurashko',
      },
      cardsCount: 1,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/4fd07ccc-dc25-4034-af2b-26c4e4cee6a4_7.jpg',
      created: '2024-05-30T13:08:19.941Z',
      id: 'clwt9tnj803o5qj01243g4zm7',
      isPrivate: false,
      name: 'GomelGomel',
      updated: '2024-05-30T13:55:04.833Z',
      userId: '3752c89f-88b2-4e81-9344-8b3d61afecbe',
    },
    {
      author: {
        id: '3752c89f-88b2-4e81-9344-8b3d61afecbe',
        name: 'alinamurashko',
      },
      cardsCount: 0,
      cover: null,
      created: '2024-05-30T13:08:16.791Z',
      id: 'clwt9tl3r03o2qj01w05mksnx',
      isPrivate: false,
      name: 'defrgthyjuiklo;',
      updated: '2024-05-30T13:08:16.791Z',
      userId: '3752c89f-88b2-4e81-9344-8b3d61afecbe',
    },
    {
      author: {
        id: '385d4903-1ad2-4719-b174-3cca07901814',
        name: 'Artsiom',
      },
      cardsCount: 0,
      cover: null,
      created: '2024-05-30T08:26:36.076Z',
      id: 'clwszrcfg03hyqj01v6bwq1jm',
      isPrivate: false,
      name: '123',
      updated: '2024-05-30T08:26:36.076Z',
      userId: '385d4903-1ad2-4719-b174-3cca07901814',
    },
    {
      author: {
        id: '01d5498b-2849-49f1-b6c1-7c5dc204bdde',
        name: 'Пупсик',
      },
      cardsCount: 3,
      cover:
        'https://staging-it-incubator.s3.eu-central-1.amazonaws.com/flashcards/Image/5539a2ba-bbf3-4519-9282-9f83869dafc3_nauryz-1.jpg',
      created: '2024-04-25T18:21:46.252Z',
      id: 'clvfklx8r028mnx01d0zwn6vl',
      isPrivate: false,
      name: 'А ты сделал DnD?!',
      updated: '2024-05-30T04:31:09.090Z',
      userId: '01d5498b-2849-49f1-b6c1-7c5dc204bdde',
    },
    {
      author: {
        id: 'df6760fa-5ae1-46ef-916e-85f670d7b903',
        name: 'Sebastyan',
      },
      cardsCount: 0,
      cover: null,
      created: '2024-05-30T01:50:54.491Z',
      id: 'clwslmhay03czqj01oirwbzdl',
      isPrivate: false,
      name: 'dffdsgd',
      updated: '2024-05-30T01:50:54.491Z',
      userId: 'df6760fa-5ae1-46ef-916e-85f670d7b903',
    },
  ],
  maxCardsCount: 61,
  pagination: {
    currentPage: 2,
    itemsPerPage: 5,
    totalItems: 525,
    totalPages: 105,
  },
}
