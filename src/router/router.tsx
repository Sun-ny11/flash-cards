import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { Layout } from '@/components/ui/layout/layout'
import { CheckEmail } from '@/features/auth/ui/check-email'
import { CreateNewPassword } from '@/features/auth/ui/create-new-password'
import { ForgotPassword } from '@/features/auth/ui/forgotPassword/forgotPassword'
import { SignIn } from '@/features/auth/ui/sign-in'
import { CardPage } from '@/features/tables/cards/ui/cardPage/cardPage'
import { DeckPage } from '@/features/tables/decks/ui/deckPage/deckPage'
import DecksPage from '@/features/tables/decks/ui/decksPage/decksPage'
import { useMeQuery } from '@/services/auth/authApi'

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: '/login',
  },
  {
    element: <ForgotPassword />,
    path: '/recover-password',
  },
  {
    element: <CreateNewPassword />,
    path: '/create-new-password/:token',
  },
  {
    element: <CheckEmail />,
    path: '/check-email/:email',
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

export const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      ...publicRoutes,
    ],
    element: <Layout />,
    path: '/',
  },
])

function PrivateRoutes() {
  const { isError, isLoading } = useMeQuery()
  const isAuthenticated = !isError && !isLoading

  return isAuthenticated ? <Outlet /> : <Navigate to={'/login'} />
}

export function Router() {
  return <RouterProvider router={router} />
}
