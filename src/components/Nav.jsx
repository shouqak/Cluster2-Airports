import React, { useState } from "react"
import { FiMoon, FiMenu, FiX, FiSun } from "react-icons/fi"
import logo from "../assets/logo.png"

const navItems = [
  { id: "Home", label: "Home", href: "#" },
  { id: "News", label: "News", href: "#news" },
]

export default function Nav({ isDark, setIsDark }) {
  const [activeLink, setActiveLink] = useState("Home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 transition-colors duration-300 bg-white shadow text-[#017276] dark:bg-gray-900 dark:text-white">
      <div className="container flex items-center justify-between px-4 py-3 mx-auto">
        <img
          src={logo}
          alt="Cluster2 Logo"
          className="h-10"
        />

        {/* Desktop Nav */}
        <nav className="items-center hidden gap-6 text-sm font-medium md:flex">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setActiveLink(item.id)}
              className={`transition-colors ${
                activeLink === item.id
                  ? "text-[#017276] font-semibold"
                  : "text-[#00b0b9]"
              } hover:text-[#017276] dark:text-white`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            className="p-2 transition rounded-full hover:bg-[#00b0b922] dark:hover:bg-gray-800"
            aria-label="Toggle dark mode"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>

          {/* Mobile Menu Button */}
          <button
            className="text-xl md:hidden text-[#017276]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="p-4 space-y-3 bg-white shadow-md md:hidden dark:bg-gray-800">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveLink(item.id)
                setIsMenuOpen(false)
              }}
              className={`block transition-colors ${
                activeLink === item.id
                  ? "text-[#017276] font-semibold"
                  : "text-[#00b0b9]"
              } hover:text-[#017276] dark:text-white`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
