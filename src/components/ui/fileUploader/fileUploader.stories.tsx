import type { Meta, StoryObj } from '@storybook/react'

import { Edit2 } from '@/assets/components'

import { FileUploader } from '.'

const meta = {
  component: FileUploader,
  tags: ['autodocs'],
  title: 'Components/FileUploader',
} satisfies Meta<typeof FileUploader>

export default meta
type Story = StoryObj<typeof meta>

export const Inputs: Story = {
  args: {
    accept: 'image/*',
    children: (
      <>
        <Edit2 /> upload
      </>
    ),
    name: 'aaa',
    onChange: e => {
      if (e.target.files) {
        const formData = new FormData()

        formData.append('file', e.target.files[0])
        // отправить на сервер formData
      }
    },
  },
}
