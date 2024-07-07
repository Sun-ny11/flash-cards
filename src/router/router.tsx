import {
  Navigate,
  Outlet,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import { useAppOutletContext } from '@/common/hooks/useOutletContext'
import { Layout } from '@/components/ui/layout/layout'
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

function PublicRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Outlet /> : <Navigate to={'/login'} />
}

function PrivateRoutes() {
  const { isAuth } = useAppOutletContext()

  return isAuth ? <Navigate to={'/decks'} /> : <Outlet />
}

const router = createBrowserRouter([
  {
    children: [
      {
        children: privateRoutes,
        element: <PrivateRoutes />,
      },
      {
        children: publicRoutes,
        element: <PublicRoutes />,
      },
    ],
    element: <Layout />,
    errorElement: <div>Error!!!</div>,
    path: '/',
  },
])

export function Router() {
  return <RouterProvider router={router} />
}
