import React, { useState } from "react"
import axios from "axios"
import { CiDark, CiLight } from "react-icons/ci"
import { FiMail, FiLock } from "react-icons/fi"
import { useNavigate } from "react-router"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isDark, setIsDark] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await axios.get(
        "https://6875177fdd06792b9c96ba28.mockapi.io/auth ",
        { email, password }
      )

      console.log("Login successful:", response.data)
      navigate("/dashboardAdmin")
    } catch (err) {
      setError(
        err.response
          ? "Login failed. Please check your credentials."
          : err.request
          ? "No response from server."
          : "An unexpected error occurred."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300 ${
        isDark
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-white via-[#e0f7fa] to-[#d0e2f2] text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-md p-8 rounded-2xl transition-all duration-300 ${
          isDark
            ? "bg-[#1a2b2c] shadow-lg"
            : "bg-white shadow-xl border border-gray-200"
        }`}
      >
        {/* Dark Mode Toggle */}
        <div className="flex justify-end">
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Toggle dark mode"
          >
            {isDark ? <CiLight size={24} /> : <CiDark size={24} />}
          </button>
        </div>

        {/* Title */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-[#017276] dark:text-[#5dd1d9]">
            Admin Login
          </h2>
          <p
            className={`text-sm mt-1 ${
              isDark ? "text-gray-400" : "text-gray-500"
            }`}
          >
            Manage Cluster2 Airports news
          </p>
        </div>

        {error && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 border-l-4 border-red-500 rounded">
            <p>{error}</p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Email */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiMail />
            </div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-[#00b0b9]"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-[#00b0b9]"
              }`}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <FiLock />
            </div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`pl-10 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                isDark
                  ? "bg-gray-800 border-gray-700 text-white focus:ring-[#00b0b9]"
                  : "bg-white border-gray-300 text-gray-800 focus:ring-[#00b0b9]"
              }`}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 font-medium rounded-md transition-colors text-white ${
              loading
                ? "bg-cyan-400 cursor-not-allowed"
                : isDark
                ? "bg-[#00b0b9] hover:bg-[#019ba1]"
                : "bg-[#017276] hover:bg-[#015c5f]"
            }`}
          >
            {loading ? "Logging In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  )
}
