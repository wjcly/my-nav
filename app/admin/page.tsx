import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AdminLayout } from "@/components/admin-layout"
import { NavigationManagement } from "@/components/navigation-management"

export default async function AdminPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">导航数据管理</h1>
          <p className="text-muted-foreground">
            管理导航网站的数据和标签
          </p>
        </div>
        <NavigationManagement />
      </div>
    </AdminLayout>
  )
}

