import React, { useState } from "react"
import {
  FiMoon,
  FiMenu,
  FiX,
  FiHome,
  FiUsers,
  FiDatabase,
  FiMessageSquare,
  FiArchive,
  FiSun,
} from "react-icons/fi"
import logo from "../../assets/logo.png"
import { Link } from "react-router"

const navItems = [
  { id: "overview", label: "Overview", link: "/dashboardAdmin" },
  { id: "Archived News", label: "Archived News", link: "/ArchivedNews" },
]

export default function NavBar({ isDark, setIsDark }) {
  const [activeLink, setActiveLink] = useState("Home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 text-gray-800 transition-colors duration-300 bg-white shadow dark:bg-gray-900 dark:text-white">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <img
          src={logo}
          alt="Cluster2 Logo"
          className="h-10"
        />

        {/* Desktop  */}
        <nav className="items-center hidden gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => setActiveLink(item.id)}
              className={`hover:text-[#00b0b9] ${
                activeLink === item.id
                  ? "text-[#017276] dark:text-[#5dd1d9] font-semibold"
                  : "dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 transition rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/*  Menu Toggle */}
          <button
            className="text-xl md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="p-4 space-y-3 bg-white shadow-md dark:bg-gray-800 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              onClick={() => {
                setActiveLink(item.id)
                setIsMenuOpen(false)
              }}
              className={`block hover:text-[#00b0b9] ${
                activeLink === item.id
                  ? "text-[#017276] dark:text-[#5dd1d9] font-semibold"
                  : "dark:text-gray-300"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
