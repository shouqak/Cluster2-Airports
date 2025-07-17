import React, { useState, useEffect } from "react"
import NewsForm from "../components/NewsForm"
import axios from "axios"
import { useParams, useNavigate } from "react-router"

export default function EditNews() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [news, setNews] = useState({
    title: "",
    description: "",
    tag: "Operations",
    publishDate: new Date().toISOString().slice(0, 16),
  })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://6875177fdd06792b9c96ba28.mockapi.io/News/${id}`
        )

        const fetchedNews = response.data

        setNews({
          title: fetchedNews.title || "",
          description: fetchedNews.description || "",
          tag: fetchedNews.tag || "Operations",
          publishDate: fetchedNews.publishDate
            ? new Date(fetchedNews.publishDate).toISOString().slice(0, 16)
            : new Date().toISOString().slice(0, 16),
        })

        if (fetchedNews.image && !fetchedNews.image.startsWith("data:image")) {
          setPreview(fetchedNews.image)
        } else {
          setPreview(fetchedNews.image || "/logo.png")
        }
      } catch (err) {
        console.error("Fetch Error:", err.message)
        setErrorMessage("Failed to load news: " + err.message)
      }
    }

    fetchNews()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handlePublishNow = () => {
    const now = new Date().toISOString().slice(0, 16)
    setNews((prev) => ({
      ...prev,
      publishDate: now,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setSuccessMessage("")
    setErrorMessage("")

    const currentDate = new Date()
    const selectedDate = new Date(news.publishDate)

    if (selectedDate < currentDate) {
      setErrorMessage("Scheduled date must be in the future")
      setLoading(false)
      return
    }

    try {
      const finalData = {
        title: news.title,
        description: news.description,
        tag: news.tag,
        image: preview || "/logo.png",
        publishDate: selectedDate.toISOString(),
        status: selectedDate > new Date() ? "scheduled" : "published",
      }

      const response = await axios.put(
        `https://6875177fdd06792b9c96ba28.mockapi.io/News/${id}`,
        finalData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      console.log("News updated:", response.data)
      setSuccessMessage(
        `News ${
          finalData.status === "scheduled"
            ? "rescheduled."
            : "updated and published."
        }`
      )

      setTimeout(() => {
        navigate("/dashboardAdmin")
      }, 1000)
    } catch (err) {
      console.error("Error updating news:", err)
      setErrorMessage(
        "Failed to update news. Please check console for details."
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className=" p-6 transition-colors duration-300 bg-white dark:bg-gray-800">
        {successMessage && (
          <div className="p-3 mb-4 text-green-700 bg-green-100 rounded">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">
            {errorMessage}
          </div>
        )}

        <NewsForm
          news={news}
          image={image}
          preview={preview}
          handleChange={handleChange}
          handleImageChange={handleImageChange}
          handleSubmit={handleSubmit}
          handlePublishNow={handlePublishNow}
          loading={loading}
          isEdit={true}
        />
      </div>
    </>
  )
}
