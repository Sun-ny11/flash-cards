import type { Meta, StoryObj } from '@storybook/react'

import { Search } from '@/assets/icons/Search'
import { Trash } from '@/assets/icons/Trash'

import { Button } from './'

const meta = {
  component: Button,
  tags: ['autodocs'],
  title: 'Components/Button',
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// История
export const Primary: Story = {
  // args - пропсы
  args: {
    children: 'Primary Button',
    disabled: false,
    variant: 'primary',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    disabled: false,
    variant: 'secondary',
  },
}

export const FullWidth: Story = {
  args: {
    children: 'Full Width Primary Button',
    disabled: false,
    fullWidth: true,
    variant: 'primary',
  },
}
export const AsLink: Story = {
  args: {
    as: 'a',
    children: 'Link that looks like a button',
    href: 'https://www.google.com/',
    variant: 'primary',
  },
}
export const withIcone: Story = {
  args: {
    children: (
      <>
        <Search /> Delete
      </>
    ),
    disabled: false,
    variant: 'primary',
  },
}
