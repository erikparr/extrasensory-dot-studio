export default function AboutPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-2xl">
        <div className="mb-12 flex justify-center">
          <img
            src="/logo-y1.svg"
            alt="extrasensory.studio logo"
            className="w-64 h-64"
            style={{ filter: 'drop-shadow(0 0 16px rgba(204, 255, 0, 0.6))' }}
          />
        </div>
        <p className="text-lg text-studio-gray-700 leading-relaxed">
          extrasensory.studio is a production lab focusing on advanced tools for art production.
          for inquiries please contact me via{' '}
          <a href="mailto:e@erikparr.com" className="text-studio-accent hover:underline">
            email
          </a>
          .
        </p>
      </div>
    </div>
  )
}