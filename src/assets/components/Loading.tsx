import loading from '../images/loading.gif'

export const Loading = () => {
  return (
    <div
      style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center' }}
    >
      <img alt={'Loading...'} src={loading} style={{ width: '80px' }} />
    </div>
  )
}
