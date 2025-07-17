import React, { useEffect, useLayoutEffect, useMemo, useState } from "react"
import Nav from "../components/Nav"
import Hero from "../components/Hero"
import FilterBar from "../components/FilterBar"
import CardsGrid from "../components/CardsGrid"

export default function Home() {
  const [search, setSearch] = useState("")
  const [selectedTag, setSelectedTag] = useState(null)
  const [sortOrder, setSortOrder] = useState("Newest")
  const [isDark, setIsDark] = useState(false)
  const [news, setNews] = useState([])

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      setIsDark(true)
    }
  }, [])

  // Apply dark mode class to <html>
  useLayoutEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  // Fetch & update scheduled news
  useEffect(() => {
    fetchNewsAndUpdateScheduled()
    const interval = setInterval(fetchNewsAndUpdateScheduled, 5 * 60 * 1000) // every 5 min
    return () => clearInterval(interval)
  }, [])

  async function fetchNewsAndUpdateScheduled() {
    try {
      const res = await fetch(
        "https://6875177fdd06792b9c96ba28.mockapi.io/News"
      )
      const data = await res.json()
      const now = new Date()

      // Publish scheduled news if publishDate has passed
      const updates = data
        .filter(
          (item) =>
            item.status === "scheduled" && new Date(item.publishDate) <= now
        )
        .map((item) =>
          fetch(`https://6875177fdd06792b9c96ba28.mockapi.io/News/${item.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...item, status: "published" }),
          })
        )

      await Promise.all(updates)

      const updatedRes = await fetch(
        "https://6875177fdd06792b9c96ba28.mockapi.io/News"
      )
      const updatedData = await updatedRes.json()
      setNews(updatedData)
    } catch (error) {
      console.error("Error fetching or updating news:", error)
    }
  }

  // Filter & sort news
  const filteredNews = useMemo(() => {
    let result = news.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.description?.toLowerCase().includes(search.toLowerCase())

      const matchesTag = selectedTag ? item.tag === selectedTag : true

      return item.status !== "scheduled" && matchesSearch && matchesTag
    })

    if (sortOrder === "Newest") {
      result.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
    } else if (sortOrder === "Oldest") {
      result.sort((a, b) => new Date(a.publishDate) - new Date(b.publishDate))
    }

    return result
  }, [news, search, selectedTag, sortOrder])

  return (
    <div className="min-h-screen transition-colors duration-300 bg-white text-[#017276] dark:bg-gray-900 dark:text-white">
      <Hero />
      <FilterBar
        search={search}
        setSearch={setSearch}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <CardsGrid filteredNews={filteredNews} />
    </div>
  )
}
