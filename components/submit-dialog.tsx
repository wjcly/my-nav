"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SubmitDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SubmitDialog({ open, onOpenChange }: SubmitDialogProps) {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: 实现提交逻辑
    setTimeout(() => {
      setLoading(false)
      onOpenChange(false)
      setFormData({ title: "", url: "", description: "" })
    }, 1000)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>提交网站</DialogTitle>
          <DialogDescription>
            提交您认为有价值的网站，我们会审核后添加到导航中。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">网站名称</Label>
            <Input
              id="title"
              placeholder="请输入网站名称"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url">网站地址</Label>
            <Input
              id="url"
              type="url"
              placeholder="https://example.com"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">网站描述</Label>
            <Textarea
              id="description"
              placeholder="请输入网站描述"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              取消
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "提交中..." : "提交"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

