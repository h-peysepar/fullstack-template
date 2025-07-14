import React from 'react';
import { Providers } from '../Providers';

function Layout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const { children } = props;

  return (
    <Providers>
      <div className="flex items-center h-[100dvh]">{children}</div>
    </Providers>
  );
}

export default Layout;
