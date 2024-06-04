import type { Meta, StoryObj } from '@storybook/react'

import { Pagination } from './pagination'
import { fn } from '@storybook/test'

const meta = {
  component: Pagination,
  tags: ['autodocs'],
  title: 'Components/Pagination',
  args: {
    currentPage: 5,
    totalCount: 100,
    siblingCount: 2,
    pageSize: 90,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

// История
export const PaginationStory: Story = {
  // args - пропсы
  args: {
    currentPage: 2,
    pageSize: 10,
    totalCount: 100,
    onPageChange: fn(),
  },
  render: args => {
    return (
      <Pagination
        currentPage={args.currentPage}
        pageSize={args.pageSize}
        totalCount={args.totalCount}
        siblingCount={2}
        onPageChange={args.onPageChange}
      />
    )
  },
}
