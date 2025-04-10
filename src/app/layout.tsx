'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from '@/providers/redux/app/store';

import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/localization/i18n';
import { Toaster } from 'react-hot-toast';
import { TanstackProvider } from '@/providers/tanstack-provider';

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
            <Provider store={store}>{children}</Provider>
            <Toaster />
          </TanstackProvider>
        </I18nextProvider>
      </body>
    </html>
  );
}
