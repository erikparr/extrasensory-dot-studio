import Header from './Header'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-surface-base">
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </div>
  )
}