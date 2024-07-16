export type User = {
  avatar: string
  created: string
  email: string
  id: string
  isEmailVerified: boolean
  name: string
  updated: string
}

export type AuthResponse = {
  accessToken: string
  refreshToken: string
}

export type LoginArgs = {
  email: string
  password: string
  rememberMe: boolean
}
export type RecoverPassword = {
  email: string
  html: string
}
export type CreateNewPassword = {
  password: string
  token: string
}

export type SignUpArgs = {
  email: string
  html?: string
  name?: string
  password: string
  sendConfirmationEmail?: boolean
  subject?: string
}
