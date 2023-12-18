import { Metadata } from 'next';
import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import RQProvider from '@/app/providers/RQProvider';
import AppLayout from '@/app/components/AppLayout';

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: 'CPN Products',
  description: 'Product app',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>

      <body>
        <RQProvider>
          <MantineProvider>
            <AppLayout>{children}</AppLayout>
          </MantineProvider>
        </RQProvider>
      </body>
    </html>
  );
}
