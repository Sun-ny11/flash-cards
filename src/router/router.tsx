import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { ForgotPassword } from '@/features/auth/ui/forgotPassword'
import { SignIn } from '@/features/auth/ui/sign-in'
import { SignUp } from '@/features/auth/ui/sign-up'
import { CardPage } from '@/features/tables/cards/ui/cardPage/cardPage'
import { DeckPage } from '@/features/tables/decks/ui/deckPage/deckPage'
import DecksPage from '@/features/tables/decks/ui/decksPage/decksPage'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
  {
    element: <SignUp />,
    path: '/sign-up',
  },
  {
    element: <ForgotPassword />,
    path: '/forgot-password',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={'/decks'} />,
    path: '/',
  },
  {
    element: <DecksPage />,
    path: '/decks',
  },
  {
    element: <DeckPage />,
    path: '/decks/:deckId',
  },
  {
    element: <CardPage />,
    path: '/decks/:deckId/learn',
  },
]

const router = createBrowserRouter([
  {
    children: privateRoutes,
    element: <PrivateRoutes />,
  },
  ...publicRoutes,
])

function PrivateRoutes() {
  const isAuthenticated = true

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export function Router() {
  return <RouterProvider router={router} />
}
