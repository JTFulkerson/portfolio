import './globals.css'

import { AnalyticsWrapper } from './analytics';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>John Fulkerson</title>
      </head>
      <body>
        {children}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}