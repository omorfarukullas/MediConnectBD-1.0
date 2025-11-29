import { useState, useEffect } from 'react'

export default function DoctorPortal({ onLogout }: any) {
  const [appointments, setAppointments] = useState([])
  const [queue, setQueue] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
    fetchQueue()
  }, [])

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments')
      if (response.ok) {
        const data = await response.json()
        setAppointments(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchQueue = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/queue/1')
      if (response.ok) {
        const data = await response.json()
        setQueue(data.list || [])
      }
    } catch (err) {
      console.error('Error fetching queue:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">👨‍⚕️ Doctor Portal</h1>
          <button
            onClick={onLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Queue */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📋 Current Queue</h2>
            {queue.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No patients in queue</p>
            ) : (
              <ul className="space-y-2">
                {queue.map((patient: any, idx: number) => (
                  <li key={idx} className="text-gray-700 dark:text-gray-300 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    Token: {patient.queueNumber} - {patient.patientName}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Appointments */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📅 Appointments Today</h2>
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            ) : appointments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No appointments scheduled</p>
            ) : (
              <ul className="space-y-2">
                {appointments.map((apt: any) => (
                  <li key={apt.id} className="text-gray-700 dark:text-gray-300 p-2 bg-gray-100 dark:bg-gray-700 rounded">
                    <strong>{apt.patientName}</strong> at {apt.date}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
