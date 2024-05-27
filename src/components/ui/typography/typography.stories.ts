import type { Meta, StoryObj } from '@storybook/react'

import { Typography } from './index'

const meta = {
  argTypes: {
    variant: {
      options: [
        'body1',
        'body2',
        'caption',
        'h1',
        'h2',
        'h3',
        'h4',
        'large',
        'link1',
        'link2',
        'overline',
        'subtitle1',
        'subtitle2',
      ],
    },
  },
  component: Typography,
  tags: ['autodocs'],
  title: 'Components/Typography',
} satisfies Meta<typeof Typography>

export default meta
type Story = StoryObj<typeof meta>

export const H1: Story = {
  args: {
    children: 'Title h1',
    variant: 'h1',
  },
}

export const H2: Story = {
  args: {
    children: 'Title h2',
    variant: 'h2',
  },
}

export const H3: Story = {
  args: {
    children: 'Title h3',
    variant: 'h3',
  },
}
export const H4: Story = {
  args: {
    children: 'Title h4',
    variant: 'h4',
  },
}

export const Subtitle1: Story = {
  args: {
    children: 'subtitle1',
    variant: 'subtitle1',
  },
}
export const Body1: Story = {
  args: {
    children: 'Body 1',
    variant: 'body1',
  },
}
export const Body2: Story = {
  args: {
    children: 'Body 2',
    variant: 'body2',
  },
}
export const Subtitle2: Story = {
  args: {
    children: 'subtitle2',
    variant: 'subtitle2',
  },
}
export const Link1: Story = {
  args: {
    children: 'Link1',
    variant: 'link1',
  },
}
export const Caption: Story = {
  args: {
    children: 'caption',
    variant: 'caption',
  },
}
export const Overline: Story = {
  args: {
    children: 'overline',
    variant: 'overline',
  },
}
export const Link2: Story = {
  args: {
    children: 'Link2',
    variant: 'link2',
  },
}
export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'large',
  },
}
