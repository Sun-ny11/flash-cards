import type { Meta, StoryObj } from '@storybook/react'

import { Header } from '@/components/ui/layout/header/header'
import { fn } from '@storybook/test'

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
    avatar: { alt: 'photo', src: ava },
    email: 'test@test.com',
    isAuth: true,
    logout: fn(),
    name: 'ivan',
  },
}
export const HeaderIsNotAuth: Story = {
  args: {
    avatar: { alt: 'photo', src: ava },
    email: 'test@test.com',
    isAuth: false,
    logout: fn(),
    name: 'ivan',
  },
}
