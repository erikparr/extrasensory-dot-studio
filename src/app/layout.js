import "./globals.css";
import Layout from '../components/Layout'

export const metadata = {
  title: "extrasensory.studio",
  description: "Creative studio for projects, tools, research & digital experiences",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  );
}
