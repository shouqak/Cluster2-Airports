import React from "react"
import ArchivedTable from "../components/ArchivedTable"
import { Link } from "react-router"

export default function Archivednews() {
  return (
    <div className="min-h-screen p-4 sm:p-6 transition-colors duration-300 bg-white dark:bg-gray-900">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between my-6 gap-4">
        <h2 className="text-2xl font-bold text-[#017276] dark:text-[#5dd1d9]">
          Archived News
        </h2>

        <Link
          to="/NewsForm"
          className="w-full sm:w-auto"
        >
          <button
            className="w-full sm:w-auto px-4 py-2 text-white bg-[#00b0b9] hover:bg-[#019ca3] rounded-md shadow transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#00b0b9] focus:ring-opacity-50"
            type="button"
          >
            Add News
          </button>
        </Link>
      </div>

      <ArchivedTable />
    </div>
  )
}
