import { useNavigate } from 'react-router-dom'

import { routes } from '@/router'
import { useLogoutMutation } from '@/services/auth/authApi'

export const useLogout = () => {
  const [logoutQuery] = useLogoutMutation()
  const navigate = useNavigate()

  const logout = async () => {
    try {
      await logoutQuery()
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      navigate(routes.public.signIn)
    } catch (e) {
      console.log(e)
    }
  }

  return { logout }
}
