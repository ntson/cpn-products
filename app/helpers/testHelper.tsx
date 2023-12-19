import { RenderOptions, render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import RQProvider from '@/app/providers/RQProvider';

interface Props {
  children: React.ReactNode;
}

function AppWrapper({ children }: Props) {
  return (
    <RQProvider>
      <MantineProvider>{children}</MantineProvider>
    </RQProvider>
  );
}

function customRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) {
  return render(ui, { wrapper: AppWrapper, ...options });
}

export * from '@testing-library/react';

export { customRender as render };
