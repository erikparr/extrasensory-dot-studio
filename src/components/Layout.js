import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-studio-white">
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </div>
  )
}