import "./globals.css";
import Layout from '../components/Layout'

export const metadata = {
  title: "extrasensory.studio",
  description: "Creative studio for projects, tools, research & digital experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Bitcount+Grid+Single:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
