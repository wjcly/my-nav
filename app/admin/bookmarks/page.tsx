import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AdminLayout } from "@/components/admin-layout"
import { BookmarkManagement } from "@/components/bookmark-management"

export default async function BookmarksPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">书签管理</h1>
          <p className="text-muted-foreground">
            导入和管理Chrome书签
          </p>
        </div>
        <BookmarkManagement />
      </div>
    </AdminLayout>
  )
}

