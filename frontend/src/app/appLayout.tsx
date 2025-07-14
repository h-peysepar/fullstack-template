import React from 'react';

function AppLayout(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const {children} = props;

  return <div className="max-w-sm mx-auto min-h-[100dvh]">{children}</div>;
}

export default AppLayout;
