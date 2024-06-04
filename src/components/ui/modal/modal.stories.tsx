import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Modal } from '.'
import { Button } from '../button'

const meta = {
  component: Modal,
  tags: ['autodocs'],
  title: 'Components/Modal',
} satisfies Meta<typeof Modal>

export default meta
type Story = StoryObj<typeof meta>

export const ModalWindow: Story = {
  args: {
    children: (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus magni vel ut animi
          laborum ipsam sit facere, et maxime nihil error minima, sequi perferendis, pariatur
          impedit voluptatibus aliquid recusandae ex!
        </p>
        <Button style={{ alignSelf: 'flex-end' }}>Accept</Button>
      </div>
    ),
    onOpenChange: () => {},
    open: false,
    title: 'Important',
  },
  render: args => {
    const [open, setOpen] = useState(args.open)

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open</Button>
        <Modal onOpenChange={() => setOpen(false)} open={open} title={args.title}>
          {args.children}
        </Modal>
      </>
    )
  },
}
