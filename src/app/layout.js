import "./globals.css";
import Layout from '../components/Layout'
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: "extrasensory.studio",
  description: "digital tools for artists",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon.svg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&family=Mallanna&display=swap"
          rel="stylesheet"
        />
        <style dangerouslySetInnerHTML={{__html: `
          .mallanna-text {
            font-family: 'Mallanna', sans-serif;
          }
        `}} />
      </head>
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  );
}
