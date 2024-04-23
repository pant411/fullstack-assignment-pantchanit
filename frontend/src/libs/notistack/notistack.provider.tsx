'use client'

import { SnackbarProvider } from 'notistack';

const NotificationProvider = ({ children }: {
  children: React.ReactNode;
}) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{
        horizontal: "right",
        vertical: "top"
      }}>
      {children}
    </SnackbarProvider>
  );
};

export default NotificationProvider;