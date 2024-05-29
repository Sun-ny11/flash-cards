import type { Meta, StoryObj } from "@storybook/react";

import { Select, SelectItem } from "./select";

const meta = {
  argTypes: {
    label: Select
  },
  component: Select,
  tags: ["autodocs"],
  title: "Components/Select"
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>

export const SelectStory: Story = {
  args: {
    label: "GO"
  },
  render:()=>(
    <Select label={'Hello'}>
      <SelectItem value={'11'}/>
      <SelectItem value={'122'}/>
    </Select>)
};

