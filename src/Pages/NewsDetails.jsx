import { div } from "framer-motion/client"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router"
import { Link } from "react-router"

export default function NewsDetails() {
  const { id } = useParams()
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://6875177fdd06792b9c96ba28.mockapi.io/News/${id}`
        )
        if (!response.ok) throw new Error("News not found")

        const data = await response.json()
        setNews(data)
      } catch (err) {
        setError("Failed to load news details.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-cyan-700 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-cyan-700 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-cyan-700 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="p-6 text-center text-red-600">
        {error || "No news found."}
      </div>
    )
  }

  return (
    <div className="px-4 py-10 transition-colors duration-300 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto rounded-2xl shadow-lg bg-white dark:bg-[#0f1f20] px-6 py-10 ">
        {/* Back Link */}
        <Link
          to="/"
          className="text-[#00b0b9] font-medium hover:underline flex items-center gap-1 mb-4"
        >
          &larr; <span>Back to News</span>
        </Link>

        <div>
          {/* Image */}
          <img
            src={news.image}
            alt={news.title}
            className="w-full h-48 mb-6 shadow-md rounded-xl sm:h-64 md:h-72 lg:h-96"
          />

          {/* Title */}
          <h1 className="text-3xl font-bold text-[#017276] dark:text-[#5dd1d9] leading-snug">
            {news.title}
          </h1>

          {/* Publish Date */}
          <p className="mt-2 text-sm italic text-gray-500 dark:text-gray-400">
            Published on {new Date(news.publishDate).toLocaleDateString()}
          </p>

          {/* Tag */}
          {news.tag && (
            <div className="mt-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold text-white rounded-full bg-[#00b0b9]">
                {news.tag}
              </span>
            </div>
          )}

          {/* Description */}
          <p className="mt-6 leading-relaxed text-gray-700 whitespace-pre-line dark:text-gray-300">
            {news.description}
          </p>
        </div>
      </div>
    </div>
  )
}
