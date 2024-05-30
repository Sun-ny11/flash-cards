import { Link } from 'react-router-dom'

import { UserDropdown } from '@/features/header/ui/user-dropdown/user-dropdown'

import { Button } from './components/ui/button'

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
    </>
  )
}
