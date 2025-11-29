import { useState, useEffect } from 'react'

export default function PatientPortal({ onLogout }: any) {
  const [doctors, setDoctors] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [bookingDoctor, setBookingDoctor] = useState(null)

  useEffect(() => {
    fetchDoctors()
    fetchAppointments()
  }, [])

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors')
      if (response.ok) {
        const data = await response.json()
        setDoctors(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching doctors:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/appointments')
      if (response.ok) {
        const data = await response.json()
        setAppointments(Array.isArray(data) ? data : [])
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
    }
  }

  const bookAppointment = async (doctorId: number) => {
    setBookingDoctor(doctorId)
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorId,
          date: new Date().toISOString().split('T')[0]
        })
      })
      if (response.ok) {
        fetchAppointments()
        alert('✅ Appointment booked successfully!')
      }
    } catch (err) {
      console.error('Error booking appointment:', err)
      alert('Appointment booking failed')
    } finally {
      setBookingDoctor(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">👤 Patient Portal</h1>
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
          {/* Doctors */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">👨‍⚕️ Available Doctors</h2>
            {loading ? (
              <p className="text-gray-600 dark:text-gray-400">Loading doctors...</p>
            ) : doctors.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No doctors available</p>
            ) : (
              <div className="space-y-4">
                {doctors.map((doctor: any) => (
                  <div key={doctor.id} className="border border-gray-300 dark:border-gray-600 p-4 rounded-lg hover:shadow transition">
                    <h3 className="font-semibold text-gray-900 dark:text-white">Dr. {doctor.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.specialization}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{doctor.hospital}</p>
                    <button
                      onClick={() => bookAppointment(doctor.id)}
                      disabled={bookingDoctor === doctor.id}
                      className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition"
                    >
                      {bookingDoctor === doctor.id ? 'Booking...' : 'Book Appointment'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* My Appointments */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">📅 My Appointments</h2>
            {appointments.length === 0 ? (
              <p className="text-gray-600 dark:text-gray-400">No appointments booked yet</p>
            ) : (
              <ul className="space-y-3">
                {appointments.map((apt: any) => (
                  <li key={apt.id} className="p-3 bg-gray-100 dark:bg-gray-700 rounded">
                    <strong className="text-gray-900 dark:text-white">Dr. {apt.doctorName}</strong>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      📅 {apt.date} at {apt.time}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Status: <span className="font-semibold">{apt.status}</span>
                    </p>
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
