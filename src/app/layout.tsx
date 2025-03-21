'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from '@/redux/app/store';

import '../styles/globals.css';
import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/localization/i18n';
import { Toaster } from 'react-hot-toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>{children}</Provider>
          <Toaster />
        </I18nextProvider>
      </body>
    </html>
  );
}
