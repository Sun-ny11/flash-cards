import type { Meta, StoryObj } from '@storybook/react'

import { useForm } from 'react-hook-form'

import { ControlledRadioGroup } from '.'
import { Button } from '../../button'

const meta = {
  component: ControlledRadioGroup,
  tags: ['autodocs'],
  title: 'Controlled/ControlledRadioGroup',
} satisfies Meta<typeof ControlledRadioGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Inputs: Story = {
  args: {
    items: [
      { label: 'Did not know', value: '1' },
      { label: 'Forgot', value: '2' },
      { label: 'A lot of thought', value: '3' },
      { label: 'Confused', value: '4' },
      { label: 'Knew the answer', value: '5' },
    ],
    name: 'grade',
  },

  render: args => {
    type Qwerty = { grade: string }

    const { control, handleSubmit } = useForm<Qwerty>({
      defaultValues: {
        grade: '1',
      },
    })

    const onSubmit = handleSubmit(data => {
      console.log(data)
    })

    return (
      <form onSubmit={onSubmit}>
        <ControlledRadioGroup control={control} items={args.items} name={'grade'} />
        <Button>Send</Button>
      </form>
    )
  },
}
