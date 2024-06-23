import { Header } from '@/components/ui/layout/header'
import { Router } from '@/router'

export function App() {
  return (
    <div>
      <Header isAuth={false} />
      <div className={'container'}>
        <Router />
      </div>
    </div>
  )
}
