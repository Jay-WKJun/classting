import type { Meta, StoryObj } from '@storybook/react';

import { LinkButton } from './LinkButton';

const meta = {
  title: 'Components/LinkButton',
  component: LinkButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LinkButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Gallery: Story = {
  args: {
    href: 'https://www.google.com',
    onClick: (e) => {
      e.preventDefault();
    },
  },
  render: function Render(args) {
    return (
      <div className="flex flex-col justify-center items-center gap-[30px]">
        <LinkButton {...args}>Original</LinkButton>
        <LinkButton {...args} className="bg-red-500">
          Red Button
        </LinkButton>
        <LinkButton {...args} className="bg-blue-500">
          Blue Button
        </LinkButton>
        <LinkButton {...args} className="shadow-md">
          Shadow Buton
        </LinkButton>
        <LinkButton {...args} className="bg-orange-600" onClick={() => {}}>
          Go to Google
        </LinkButton>
      </div>
    );
  },
};
