import { useEffect, useLayoutEffect, useState } from "react";
import NavBar from "../Admin/components/NavBar";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

export function AdminLayout() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
    }
  }, []);

  useLayoutEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <>
      <NavBar isDark={isDark} setIsDark={setIsDark} />
      <Outlet />
      <Footer/>
    </>
  );
}