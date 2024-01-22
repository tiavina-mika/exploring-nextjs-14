import type { Meta, StoryObj } from '@storybook/react';

import ArticleFormComponent from '@/containers/articles/ArticleForm';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Containers/Articles',
  component: ArticleFormComponent,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => {
      return (
        <div className="flexCenter min-h-screen">
          <div className="w-[480px]">
            <Story />
          </div>
        </div>
      );
    },
  ],
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
} satisfies Meta<typeof ArticleFormComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const ArticleForm: Story = {
  args: {},
};
