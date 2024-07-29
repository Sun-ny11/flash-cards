import { PersonalInformation } from '@/features/auth/ui/personal-information/personalInformation'
import { useMeQuery } from '@/services/auth/authApi'

const Profile = () => {
  const { data } = useMeQuery()

  return (
    <>
      <PersonalInformation
        avatar={data?.avatar}
        email={data?.email}
        isVerificated={data?.isEmailVerified}
        name={data?.name}
        userId={data?.id}
      />
    </>
  )
}

export default Profile
