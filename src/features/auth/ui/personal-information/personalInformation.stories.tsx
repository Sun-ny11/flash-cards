import type { Meta, StoryObj } from '@storybook/react'

import { PersonalInformation } from '@/features/auth/ui/personal-information/personalInformation'

const meta = {
  component: PersonalInformation,
  tags: ['autodocs'],
  title: 'Form/Personal Information',
} satisfies Meta<typeof PersonalInformation>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    avatar: '',
    email: 'aaqqqqqqqaa@aaa.aa',
    name: 'Naaaaaaaaame',
    userId: '',
  },
}
