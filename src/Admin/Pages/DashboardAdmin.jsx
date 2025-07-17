import React from "react"
import NavBar from "../components/NavBar"
import ContactTable from "../components/ContactTable"
import { Link } from "react-router"

export default function Contacts() {
  return (
    <div className="min-h-screen text-gray-800 transition-colors duration-300 bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex flex-col lg:flex-row">
        <main className="w-full p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-[#017276] dark:text-[#5dd1d9]">
              News
            </h2>

            <Link
              to="/NewsForm"
              className="w-full sm:w-auto"
            >
              <button className="w-full sm:w-auto px-4 py-2 rounded-md shadow font-medium text-white transition duration-200 bg-[#00b0b9] hover:bg-[#019ca3] focus:outline-none focus:ring-2 focus:ring-[#00b0b9] focus:ring-opacity-50">
                Add News
              </button>
            </Link>
          </div>

          <ContactTable />
        </main>
      </div>
    </div>
  )
}
