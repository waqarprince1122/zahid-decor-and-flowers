import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center container-x py-24 text-center">
      <div>
        <p className="eyebrow mb-4">404</p>
        <h1 className="text-4xl font-semibold text-charcoal mb-4">This page has wilted away</h1>
        <p className="text-charcoal-soft/85 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist. Let's get you back to fresher ground.
        </p>
        <Link to="/" className="btn-primary">Back to Home</Link>
      </div>
    </section>
  )
}
