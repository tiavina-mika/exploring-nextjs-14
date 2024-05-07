import type { Meta, StoryObj } from '@storybook/react';

import IconButtonComponent from '@/components/buttons/IconButton';
import NextIcon from '@/components/NextIcon';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Components/IconButton',
  component: IconButtonComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof IconButtonComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const IconButton: Story = {
  args: {
    children: [
      <NextIcon
        src="/icons/trash.svg"
        size={20}
        aria-hidden="true"
      />,
    ],
  },
};
