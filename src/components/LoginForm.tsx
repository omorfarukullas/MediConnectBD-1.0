import { useState } from 'react'

export default function LoginForm({ role, onLoginSuccess, onBack }: any) {
  const [email, setEmail] = useState(role === 'patient' ? 'john@patient.com' : 'ahmed@mediconnect.com')
  const [password, setPassword] = useState('password123')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token || 'demo-token')
        localStorage.setItem('user', JSON.stringify(data.user || { email, role }))
        onLoginSuccess(role)
      } else {
        setError('Invalid credentials. Using demo login...')
        setTimeout(() => onLoginSuccess(role), 1000)
      }
    } catch (err) {
      setError('Connection error. Using demo login...')
      setTimeout(() => onLoginSuccess(role), 1000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <button
          onClick={onBack}
          className="mb-4 text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          ← Back to Home
        </button>

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          {role === 'patient' ? '👤 Patient' : '👨‍⚕️ Doctor'} Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg disabled:opacity-50 transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
          Demo credentials are pre-filled. Click Login to continue.
        </p>
      </div>
    </div>
  )
}
