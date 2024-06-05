import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import { Pagination } from './pagination'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof Pagination>

// История
const PaginationStory = () => {
  // args - пропсы
  // args: {
  //   currentPage: 2,
  //   onPageChange: fn(args => args),
  //   pageSize: 10,
  //   totalCount: 100,
  // },
  const [current, setCurrent] = useState(1)

  return (
    <Pagination
      currentPage={current}
      onPageChange={setCurrent}
      pageSize={5}
      siblingCount={1}
      totalCount={100}
    />
  )
}

export const Primary: Story = {
  render: () => <PaginationStory />,
}
