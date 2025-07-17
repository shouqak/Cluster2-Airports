import React from "react"

export default function NewsForm({
  news,
  image,
  preview,
  handleChange,
  handleImageChange,
  handleSubmit,
  handlePublishNow,
  loading,
  isEdit = false,
}) {
  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="mb-6 text-2xl font-bold text-[#017276] dark:text-[#5dd1d9]">
        {isEdit ? "Edit News" : "Add New News"}
      </h2>

      {loading && (
        <div className="p-3 mb-4 text-[#017276] bg-[#c6f0f3] rounded dark:bg-[#004c4f] dark:text-[#5dd1d9]">
          Saving changes...
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* Image  */}
        <div className="flex items-center justify-center mt-4">
          <img
            src={preview || "/logo.png"}
            alt="Preview"
            className="object-cover w-auto h-32 border rounded dark:border-gray-600"
          />
        </div>

        <div>
          <label
            htmlFor="image"
            className="block mb-2 text-sm font-medium text-[#017276] dark:text-[#5dd1d9]"
          >
            Upload Image
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-md file:bg-[#00b0b9]/10 file:text-[#017276] file:border-none file:mr-4 file:px-4 file:py-1 focus:outline-none focus:ring-2 focus:ring-[#00b0b9] dark:bg-gray-800 dark:border-gray-700 dark:file:bg-[#00b0b9]/20 dark:file:text-white"
          />
        </div>

        {/* Title */}
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-[#017276] dark:text-[#5dd1d9]"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={news.title}
            onChange={handleChange}
            placeholder="Enter news title"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b0b9] dark:bg-gray-800 dark:border-gray-700"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-[#017276] dark:text-[#5dd1d9]"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={news.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write a description..."
            className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-[#00b0b9] dark:bg-gray-800 dark:border-gray-700"
            required
          ></textarea>
        </div>

        {/* Tag */}
        <div>
          <label
            htmlFor="tag"
            className="block mb-2 text-sm font-medium text-[#017276] dark:text-[#5dd1d9]"
          >
            Select Tag
          </label>
          <select
            id="tag"
            name="tag"
            value={news.tag}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b0b9] dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="Operations">Operations</option>
            <option value="HR">HR</option>
            <option value="Safety">Security</option>
            <option value="Events">Events</option>
          </select>
        </div>

        {/* Publish Date */}
        <div>
          <label
            htmlFor="publishDate"
            className="block mb-2 text-sm font-medium text-[#017276] dark:text-[#5dd1d9]"
          >
            Schedule Publish Date & Time
          </label>
          <input
            id="publishDate"
            name="publishDate"
            type="datetime-local"
            value={news.publishDate}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#00b0b9] dark:bg-gray-800 dark:border-gray-700"
          />
          <div className="flex items-center justify-between mt-2">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Set a future date or publish now.
            </p>
            <button
              type="button"
              onClick={handlePublishNow}
              className="px-3 py-1 text-xs text-white transition bg-cyan-800 rounded-md hover:bg-cyan-900"
            >
              Publish Now
            </button>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 w-full sm:w-auto bg-[#00b0b9] hover:bg-[#019ca3] text-white rounded-md shadow transition duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : isEdit ? "Update News" : "Add News"}
          </button>
        </div>
      </form>
    </div>
  )
}
