"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function NavLogo({ className }: { className?: string }) {
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 确定当前主题
  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "light"
  const isDark = currentTheme === "dark"

  return (
    <div className={`flex items-center gap-2 ${className || ""}`}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 hover:scale-110"
      >
        {/* 指南针外圈 */}
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-60"
        />
        {/* 指南针内圈 */}
        <circle
          cx="12"
          cy="12"
          r="6"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="1"
          strokeLinecap="round"
          className="opacity-40"
        />
        {/* 指南针指针 - N */}
        <line
          x1="12"
          y1="2"
          x2="12"
          y2="8"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="2"
          strokeLinecap="round"
          className="opacity-90"
        />
        {/* 指南针指针 - S */}
        <line
          x1="12"
          y1="16"
          x2="12"
          y2="22"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-60"
        />
        {/* 指南针指针 - E */}
        <line
          x1="16"
          y1="12"
          x2="22"
          y2="12"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-60"
        />
        {/* 指南针指针 - W */}
        <line
          x1="2"
          y1="12"
          x2="8"
          y2="12"
          stroke={isDark ? "#ffffff" : "#000000"}
          strokeWidth="1.5"
          strokeLinecap="round"
          className="opacity-60"
        />
        {/* 中心点 */}
        <circle
          cx="12"
          cy="12"
          r="1.5"
          fill={isDark ? "#ffffff" : "#000000"}
          className="opacity-80"
        />
      </svg>
      <span className="text-xl font-semibold tracking-tight">NAV</span>
    </div>
  )
}

