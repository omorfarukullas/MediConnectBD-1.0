export default function LandingPage({ onLogin }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">🏥 MediConnect</h1>
          <p className="text-gray-600 dark:text-gray-400">Healthcare Management System</p>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to MediConnect
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Your comprehensive healthcare management platform
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">📅 Appointments</h3>
            <p className="text-gray-600 dark:text-gray-400">Book and manage doctor appointments easily</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">🚑 Ambulance</h3>
            <p className="text-gray-600 dark:text-gray-400">Emergency ambulance tracking and booking</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">👨‍⚕️ Doctors</h3>
            <p className="text-gray-600 dark:text-gray-400">Connect with experienced specialists</p>
          </div>
        </div>

        {/* Login Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <button
            onClick={() => onLogin('patient')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105"
          >
            👤 Patient Login
          </button>
          <button
            onClick={() => onLogin('doctor')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition transform hover:scale-105"
          >
            👨‍⚕️ Doctor Portal
          </button>
        </div>
      </div>
    </div>
  )
}
