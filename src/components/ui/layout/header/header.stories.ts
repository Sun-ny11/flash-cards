import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/layout/header/header'

import ava from '../../../../assets/images/defaultAvatar.webp'

const meta = {
  argTypes: {},
  component: Header,
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderStory: Story = {
  args: {
    avatar: ava,
    email: 'test@test.com',
    isAuth: true,
    name: 'ivan',
  },
}
export const HeaderIsNotAuth: Story = {
  args: {
    avatar: ava,
    email: 'test@test.com',
    isAuth: false,
    name: 'ivan',
  },
}
