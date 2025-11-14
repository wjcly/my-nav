import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { AdminLayout } from "@/components/admin-layout"
import { NavigationForm } from "@/components/navigation-form"

export default async function NewNavigationPage() {
  const session = await auth()

  if (!session) {
    redirect("/admin/login")
  }

  return (
    <AdminLayout>
      <NavigationForm />
    </AdminLayout>
  )
}

