import React from "react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-cyan-700 dark:text-cyan-300 py-6  border-t shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} Cluster2 Airports. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
