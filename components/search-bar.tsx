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
  const isInitialMount = useRef(true)

  useEffect(() => {
    // 跳过首次渲染
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }
    
    const currentQ = searchParams.get("q") || ""
    
    // 如果值没有改变，不更新 URL
    if (currentQ === search) {
      return
    }
    
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
      router.replace(`/?${params.toString()}`, { scroll: false })
    }, 300)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  return (
    <div className="relative max-w-xl md:max-w-2xl mx-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors duration-200" />
      <Input
        type="search"
        placeholder="搜索网站..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-12 h-14 md:h-16 text-base shadow-sm border-2 transition-all duration-200 focus:shadow-md focus:border-primary/50 hover:border-primary/30"
      />
    </div>
  )
}

