import React, { useState } from "react"
import NewsForm from "../components/NewsForm"
import { useNavigate } from "react-router"
import logo from "../../assets/logo.png"
import imageCompression from "browser-image-compression"
import toast, { Toaster } from "react-hot-toast"

export default function AddNews() {
  const [news, setNews] = useState({
    title: "",
    description: "",
    tag: "Operations",
    image: "",
    publishDate: new Date().toISOString().slice(0, 16),
  })

  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const nav = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setNews((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      try {
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
        }

        const compressedFile = await imageCompression(file, options)

        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result)
          setImage(compressedFile)
        }

        reader.readAsDataURL(compressedFile)
      } catch (error) {
        console.error(" Error compressing image:", error)
      }
    }
  }

  const handlePublishNow = () => {
    const now = new Date()
    const offset = now.getTimezoneOffset()
    const localTime = new Date(now.getTime() - offset * 60 * 1000)
    const localISOTime = localTime.toISOString().slice(0, 16)

    setNews((prev) => ({
      ...prev,
      publishDate: localISOTime,
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
      toast.error("Scheduled date must be in the future")
      setLoading(false)
      return
    }

    const finalData = {
      title: news.title,
      description: news.description,
      tag: news.tag,
      image: preview || logo,
      publishDate: selectedDate.toISOString(),
      status: selectedDate > currentDate ? "scheduled" : "published",
      createdAt: new Date().toISOString(),
    }

    try {
      const response = await fetch(
        "https://6875177fdd06792b9c96ba28.mockapi.io/News",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalData),
        }
      )

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(
          `Server responded with status ${response.status}: ${errorText}`
        )
      }

      const result = await response.json()
      console.log("Saved news:", result)

      toast.success(
        `News ${
          finalData.status === "scheduled"
            ? "scheduled successfully!"
            : "added and published!"
        }`
      )
      setTimeout(() => {
        nav("/dashboardAdmin")
      }, 1000)
    } catch (err) {
      toast.error("Failed to save news. Please try again.")
      console.error("Error saving news:", err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className=" p-6 transition-colors duration-300 bg-white dark:bg-gray-800">
        <Toaster />

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
          isEdit={false}
        />
      </div>
    </>
  )
}
