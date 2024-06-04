import type { Meta, StoryObj } from '@storybook/react'

import { Select, SelectItem } from './select'

const meta = {
  argTypes: {
    label: Select,
  },
  component: Select,
  tags: ['autodocs'],
  title: 'Components/Select',
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {},
  render: () => {
    return (
      <Select defaultValue={'hello'} label={'Select-box'}>
        <SelectItem value={'hello'}>hgf</SelectItem>
        <SelectItem value={'hy'}>sdfg</SelectItem>
        <SelectItem value={'buy'}>vbnvnvn</SelectItem>
        <SelectItem value={'by'}>helvbcvblo</SelectItem>
      </Select>
    )
  },
}

export const SelectStoryDisabled: Story = {
  args: {
    disabled: true,
  },
  render: () => {
    return (
      <Select defaultValue={'hello'} disabled label={'Select-box'}>
        <SelectItem value={'hello'}>hgf</SelectItem>
        <SelectItem value={'hy'}>sdfg</SelectItem>
        <SelectItem value={'buy'}>vbnvnvn</SelectItem>
        <SelectItem value={'by'}>helvbcvblo</SelectItem>
      </Select>
    )
  },
}

export const SelectStoryPagination: Story = {
  args: {},
  render: () => {
    return (
      <div style={{ width: '60px' }}>
        <Select defaultValue={'10'} label={'Select-box-Pagination'} pagination>
          <SelectItem value={'10'}>10</SelectItem>
          <SelectItem value={'20'}>20</SelectItem>
          <SelectItem value={'50'}>50</SelectItem>
          <SelectItem value={'100'}>100</SelectItem>
        </Select>
      </div>
    )
  },
}
