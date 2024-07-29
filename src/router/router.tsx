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
import { EmailConfirmed } from '@/features/auth/ui/email-confirmed'
import { ForgotPassword } from '@/features/auth/ui/forgotPassword/forgotPassword'
import Profile from '@/features/auth/ui/personal-information/profile'
import { SignIn } from '@/features/auth/ui/sign-in'
import { SignUp } from '@/features/auth/ui/sign-up'
import { CardPage } from '@/features/tables/cards/ui/cardPage/cardPage'
import { DeckPage } from '@/features/tables/decks/ui/deckPage/deckPage'
import DecksPage from '@/features/tables/decks/ui/decksPage/decksPage'
import { useMeQuery } from '@/services/auth/authApi'

export const routes = {
  private: {
    card: '/decks/:deckId/learn',
    deck: '/decks/:deckId',
    decks: '/decks',
    main: '/',
    profile: '/profile',
  },
  public: {
    signIn: '/sign-in',
    signUp: '/sign-up',
  },
}

const publicRoutes: RouteObject[] = [
  {
    element: <SignIn />,
    path: routes.public.signIn,
  },
  {
    element: <SignUp />,
    path: routes.public.signUp,
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
    element: <EmailConfirmed />,
    path: '/confirm-email/:code',
  },
  {
    element: <CheckEmail />,
    path: '/check-email/:email',
  },
]

const privateRoutes: RouteObject[] = [
  {
    element: <Navigate to={routes.private.decks} />,
    path: '/',
  },
  {
    element: <DecksPage />,
    path: routes.private.decks,
  },
  {
    element: <DeckPage />,
    path: routes.private.deck,
  },
  {
    element: <CardPage />,
    path: routes.private.card,
  },
  {
    element: <Profile />,
    path: routes.private.profile,
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

  return isAuthenticated ? <Outlet /> : <Navigate to={routes.public.signIn} />
}

export function Router() {
  return <RouterProvider router={router} />
}
