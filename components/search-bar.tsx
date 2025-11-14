"use client"

import { useState, useEffect, useRef } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchParams, useRouter } from "next/navigation"

export function SearchBar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [search, setSearch] = useState(searchParams.get("q") || "")
  const timeoutRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // 防抖处理
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (search) {
        params.set("q", search)
      } else {
        params.delete("q")
      }
      router.push(`/?${params.toString()}`, { scroll: false })
    }, 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [search, router, searchParams])

  return (
    <div className="relative max-w-2xl mx-auto">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="search"
        placeholder="搜索网站..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10 h-12 text-base"
      />
    </div>
  )
}

