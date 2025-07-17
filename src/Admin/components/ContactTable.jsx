import React, { useEffect, useState } from "react"
import { FiEdit, FiTrash } from "react-icons/fi"
import { Link } from "react-router"
import axios from "axios"
import DeleteModal from "./DeleteModal"
import toast, { Toaster } from "react-hot-toast"

export default function ContactTable() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState(null)

   useEffect(() => {
    const fetchScheduledNews = async () => {
      try {
        const response = await axios.get(
          "https://6875177fdd06792b9c96ba28.mockapi.io/News"
        )
        const data = response.data

        // فلترة الأخبار حسب الحالة "published" فقط
        const scheduledNews = data.filter((item) => item.status === "published")

        setContacts(scheduledNews)
      } catch (err) {
        setError("Failed to load published news")
        toast.error("Failed to load published news. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchScheduledNews()
  }, [])


  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `https://6875177fdd06792b9c96ba28.mockapi.io/News/${selectedNews.id}`,
        { archived: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      if (res.status === 200) {
        setContacts((prev) =>
          prev.filter((contact) => contact.id !== selectedNews.id)
        )
        toast.success("Delete Successfully !")

        setShowDeleteModal(false)
      } else {
        throw (new Error("Archiving failed"), toast.error("Archiving failed !"))
      }
    } catch (err) {
      toast.error("Failed to delete news. Please try again.")
      console.error("Error deleting news:", err)
    } finally {
      setLoading(false)
    }
  }

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

  if (error) {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>
  }

  return (
    <div className="overflow-x-auto">
      <Toaster />
      <table className="w-full overflow-hidden border border-gray-200 rounded-md table-auto dark:border-gray-700">
        <thead>
          <tr className="text-left bg-[#e0f7fa] dark:bg-[#014447] text-[#017276] dark:text-[#5dd1d9]">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Tags</th>
            <th className="px-4 py-2">Publish Date</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-[#1a1a1a]">
          {contacts.length > 0 ? (
            contacts.map((contact) => (
              <tr
                key={contact.id}
                className="border-b dark:border-gray-700 hover:bg-[#f9f9f9] dark:hover:bg-[#2a2a2a] transition"
              >
                <td className="px-4 py-3 font-semibold text-gray-800 dark:text-white">
                  {contact.title}
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                  {contact.description}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-block px-2 py-1 text-xs font-semibold text-white rounded-full bg-[#00b0b9]">
                    {contact.tag || contact.tags?.[0] || "Uncategorized"}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {new Date(contact.publishDate).toLocaleDateString()}
                </td>
                <td className="flex gap-2 px-4 py-3">
                  <Link
                    to={`/NewsEdit/${contact.id}`}
                    className="p-1 rounded hover:bg-[#dff3f4] dark:hover:bg-[#2c4445]"
                    aria-label="Edit"
                  >
                    <FiEdit className="text-[#fbbf24]" />
                  </Link>
                  <button
                    onClick={() => {
                      setSelectedNews(contact)
                      setShowDeleteModal(true)
                    }}
                    className="p-1 rounded hover:bg-red-100 dark:hover:bg-[#442828]"
                    aria-label="Delete"
                  >
                    <FiTrash className="text-red-600" />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="py-6 text-center text-gray-500 dark:text-gray-400"
              >
                No news found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedNews && (
        <DeleteModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          title={selectedNews.title}
        />
      )}
    </div>
  )
}
