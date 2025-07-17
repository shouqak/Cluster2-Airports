import { FiSearch } from "react-icons/fi"
import React from "react"

export default function FilterBar({
  search,
  setSearch,
  selectedTag,
  setSelectedTag,
  sortOrder,
  setSortOrder,
}) {
  return (
    <section className="max-w-6xl px-4 py-6 mx-auto">
      <div className="flex flex-col gap-4">
        <div className="relative w-full">
          <FiSearch className="absolute top-3 left-3 text-[#00b0b9]" />
          <input
            type="text"
            placeholder="Search news..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-cyan-800 pl-10 pr-4 py-2 w-full border rounded-md focus:ring-2 focus:ring-[#00b0b9] border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between gap-5">
          <div className="flex flex-wrap gap-2">
            {["Operations", "HR", "Safety", "Events"].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className={`px-3 py-1 text-sm rounded-full border transition-colors duration-200 ${
                  selectedTag === tag
                    ? "bg-[#017276] text-white border-[#017276]"
                    : "bg-gray-100 text-gray-800 border-gray-300 hover:bg-[#00b0b9]/10 hover:border-[#00b0b9] dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-[#00b0b9]/20"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-[#00b0b9] dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          >
            <option value="Newest">Newest</option>
            <option value="Oldest">Oldest</option>
          </select>
        </div>
      </div>
    </section>
  )
}
