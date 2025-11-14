"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function BookmarkManagement() {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const parseChromeBookmarks = (html: string) => {
    const parser = new DOMParser()
    const doc = parser.parseFromString(html, "text/html")
    const links = doc.querySelectorAll("a")
    const bookmarks: Array<{
      title: string
      url: string
      addDate?: number
    }> = []

    links.forEach((link) => {
      const title = link.textContent?.trim() || ""
      const url = link.getAttribute("href") || ""
      const addDate = link.getAttribute("add_date")
        ? parseInt(link.getAttribute("add_date")!)
        : undefined

      if (url && url.startsWith("http")) {
        bookmarks.push({ title, url, addDate })
      }
    })

    return bookmarks
  }

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "错误",
        description: "请选择文件",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const text = await file.text()
      const bookmarks = parseChromeBookmarks(text)

      if (bookmarks.length === 0) {
        toast({
          title: "错误",
          description: "未找到有效的书签",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // 批量导入书签
      const res = await fetch("/api/bookmarks/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookmarks }),
      })

      if (!res.ok) throw new Error("导入失败")

      const result = await res.json()

      toast({
        title: "成功",
        description: `成功导入 ${result.count} 个书签`,
      })

      setFile(null)
    } catch (error) {
      toast({
        title: "错误",
        description: "导入书签失败",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>导入Chrome书签</CardTitle>
        <CardDescription>
          选择Chrome导出的HTML书签文件进行导入
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bookmark-file">选择书签文件</Label>
          <div className="flex items-center gap-4">
            <Input
              id="bookmark-file"
              type="file"
              accept=".html"
              onChange={handleFileChange}
              className="max-w-sm"
            />
            {file && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <FileText className="h-4 w-4" />
                <span>{file.name}</span>
              </div>
            )}
          </div>
        </div>
        <Button onClick={handleImport} disabled={!file || loading}>
          <Upload className="mr-2 h-4 w-4" />
          {loading ? "导入中..." : "导入书签"}
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>如何导出Chrome书签：</p>
          <ol className="list-decimal list-inside space-y-1 mt-2">
            <li>打开Chrome浏览器</li>
            <li>按 Ctrl+Shift+O (Windows) 或 Cmd+Option+B (Mac) 打开书签管理器</li>
            <li>点击右上角的三点菜单，选择"导出书签"</li>
            <li>保存HTML文件后在此处上传</li>
          </ol>
        </div>
      </CardContent>
    </Card>
  )
}

