import { PersonalInformation } from '@/features/auth/ui/personal-information/personalInformation'
import { useMeQuery } from '@/services/auth/authApi'

const Profile = () => {
  const { data } = useMeQuery()

  return (
    <>
      <PersonalInformation avatar={data?.avatar} email={data?.email} name={data?.name} />
    </>
  )
}

export default Profile
