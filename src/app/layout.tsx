'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/localization/i18n';
import { Toaster } from 'react-hot-toast';
import { TanstackProvider } from '@/providers/tanstack-provider';
import { ReduxProvider } from '@/providers/redux/ReduxProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          <TanstackProvider>
            <ReduxProvider>{children}</ReduxProvider>
            <Toaster />
          </TanstackProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
