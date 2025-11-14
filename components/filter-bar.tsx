"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Clock, TrendingUp } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation"

type SortType = "created" | "visits" | null

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [sortBy, setSortBy] = useState<SortType>(
    (searchParams.get("sortBy") as SortType) || null
  )
  const [tags, setTags] = useState<{ id: string; name: string }[]>([])

  useEffect(() => {
    fetch("/api/tags")
      .then((res) => res.json())
      .then((data) => setTags(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (selectedTags.length > 0) {
      params.set("tag", selectedTags[0])
    } else {
      params.delete("tag")
    }
    if (sortBy) {
      params.set("sortBy", sortBy)
    } else {
      params.delete("sortBy")
    }
    router.push(`/?${params.toString()}`, { scroll: false })
  }, [selectedTags, sortBy, router, searchParams])

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) ? prev.filter((t) => t !== tagName) : [tagName]
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* 标签筛选 */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={selectedTags.includes(tag.name) ? "default" : "outline"}
            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => toggleTag(tag.name)}
          >
            {tag.name}
          </Badge>
        ))}
      </div>

      {/* 排序 */}
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <ArrowUpDown className="mr-2 h-4 w-4" />
              排序
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem onClick={() => setSortBy("created")}>
              <Clock className="mr-2 h-4 w-4" />
              按创建时间
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy("visits")}>
              <TrendingUp className="mr-2 h-4 w-4" />
              按访问量
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSortBy(null)}>
              清除排序
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

