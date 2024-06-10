import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Slider } from '@/components/ui'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: [0, 100] },
  render: () => {
    const [sliderValue, setSliderValue] = useState([0, 100])

    return <Slider onValueChange={setSliderValue} value={sliderValue}></Slider>
  },
}
