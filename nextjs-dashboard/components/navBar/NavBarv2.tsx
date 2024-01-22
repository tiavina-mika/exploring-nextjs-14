'use client';

import * as React from 'react';

import Link from 'next/link';

import {
  ListItem,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/NavigationMenu';

import { INavBarSubMenuItem } from '@/types/app.type';

const components: INavBarSubMenuItem[] = [
  {
    title: 'Alert Dialog',
    value: '/docs/primitives/alert-dialog',
    label:
      'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    value: '/docs/primitives/hover-card',
    label: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    value: '/docs/primitives/progress',
    label:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    value: '/docs/primitives/scroll-area',
    label: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    value: '/docs/primitives/tabs',
    label:
      'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    value: '/docs/primitives/tooltip',
    label:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
  },
];

const menus = [
  {
    title: 'Getting started',
    items: [
      {
        title: 'Introduction',
        value: '/docs',
        label: 'Re-usable components built using Radix UI and Tailwind CSS.',
      },
      {
        title: 'Installation',
        value: '/docs/installation',
        label: 'How to install dependencies and structure your app.',
      },
    ],
  },
  {
    title: 'Components',
    items: components,
  },
  {
    label: 'Document',
    value: '/',
  },
];

const Navbarv2 = () => {
  return (
    <NavigationMenu className="flexRow min-w-[100vw] justify-between">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Mik.
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
      <NavigationMenuList>
        {menus.map((menu) =>
          menu.title ? (
            <NavigationMenuItem className="relative">
              <NavigationMenuTrigger>{menu.title}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 bg-error p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  {menu.items.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.value}
                    >
                      {item.label}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem>
              <Link href={menu.value} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menu.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbarv2;
