import { motion } from "framer-motion"
import { Link } from "react-router"

export default function Cards({ news, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative overflow-hidden transition-all duration-300 bg-white shadow-md dark:bg-gray-800 rounded-xl hover:shadow-lg group"
    >
      {news.image && (
        <img
          src={news.image}
          alt={news.title}
          className="object-cover w-full h-48"
        />
      )}

      <div className="p-4">
        {/* Title */}
        <h2 className="mb-1 text-lg font-bold line-clamp-2 dark:text-white text-[#017276]">
          {news.title}
        </h2>

        {/* Tag */}
        {news.tag && (
          <span
            className="inline-block mb-2 px-2.5 py-0.5 rounded text-xs font-semibold"
            style={{
              backgroundColor: "#00b0b9",
              color: "white",
            }}
          >
            {news.tag}
          </span>
        )}

        {/* Description */}
        {news.description && (
          <p className="w-[50%] text-gray-600 text-sm line-clamp-2 dark:text-gray-300">
            {news.description}
          </p>
        )}

        {/* Publish Date */}
        {news.publishDate && (
          <p className="mt-2 text-xs italic text-gray-500 dark:text-gray-400">
            {new Date(news.publishDate).toLocaleDateString()}
          </p>
        )}

        <Link
          to={`/detailNews/${news.id}`}
          className="flex items-center mt-4 font-semibold text-[#017276] hover:text-[#00b0b9] underline"
        >
          Read More...
        </Link>
      </div>
    </motion.div>
  )
}
