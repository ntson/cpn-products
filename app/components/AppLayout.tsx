'use client';

import { PageContext } from '@/app/context/pageContext';
import { AppShell, Burger, Button, Group, NavLink } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface Props {
  children: React.ReactNode;
}

export default function AppLayout({ children }: Props) {
  const [page, setPage] = useState(1);
  const [opened, { toggle }] = useDisclosure();

  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    queryClient.invalidateQueries({ queryKey: ['currentUser'] });
  };

  const pathname = usePathname();

  return (
    <PageContext.Provider value={{ page, setPage }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !opened },
        }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md" justify="space-between">
            <Burger
              opened={opened}
              onClick={toggle}
              hiddenFrom="sm"
              size="sm"
            />

            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          </Group>
        </AppShell.Header>

        <AppShell.Navbar>
          <NavLink
            href="/"
            label="Product catalog"
            component={Link}
            active={pathname === '/'}
            variant="subtle"
            fw={600}
            fz="xl"
          />
          <NavLink
            href="/add-product"
            label="Add product"
            component={Link}
            active={pathname === '/add-product'}
            variant="subtle"
            fw={600}
            fz="xl"
          />
          <NavLink
            href="/login"
            label="Login"
            component={Link}
            active={pathname === '/login'}
            variant="subtle"
            fw={600}
            fz="xl"
          />
        </AppShell.Navbar>

        <AppShell.Main>{children}</AppShell.Main>
      </AppShell>
    </PageContext.Provider>
  );
}
