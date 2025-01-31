'use client';

import * as React from 'react';
import {
  BookOpen,
  Bot,
  ChartPie,
  PiggyBank,
} from 'lucide-react';

import { NavMain } from '@/components/dashboard/NavMain';
import NavUser from '@/components/dashboard/NavUser';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import Link from 'next/link';

// This is sample data.
const data = {
  user: {
    name: 'Cristian Villota',
    email: 'cvillota@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      name: 'Panel de control',
      url: '/dashboard',
      icon: ChartPie,
    },
    {
      name: 'Super Finanzas con IA',
      url: '#',
      icon: Bot,
    },
    {
      name: 'Mis Finanzas',
      url: '#',
      icon: PiggyBank,
      isActive: true,
      items: [
        {
          title: 'Presupuesto',
          url: '/dashboard/budget',
        },
        {
          title: 'Gastos',
          url: '/dashboard/expenses',
        },
        {
          title: 'Ingresos',
          url: '/dashboard/incomes',
        },
        {
          title: 'Ahorros',
          url: '/dashboard/savings',
        },
      ],
    },
    {
      name: 'Aprende de Finazas',
      url: '#',
      icon: BookOpen,
      items: [
        {
          title: 'Fundamentos de Finanzas personales',
          url: '#',
        },
        {
          title: 'Árboles de dinero',
          url: '#',
        },
      ],
    }
  ],
};

export function AppSidebar({ loggedIn, ...props }: { loggedIn: User } & React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
      <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-sidebar-primary-foreground text-xl">
                  💰
                </div>
                <div className="flex flex-col leading-none">
                  <h1 className="font-semibold text-lg [line-height:1.1]">Budget <span className="text-primary">AI</span></h1>
                  <span className="text-xs">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser loggedIn={loggedIn} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
