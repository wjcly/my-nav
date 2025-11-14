import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function initAdmin() {
  const email = process.env.ADMIN_EMAIL || "admin@example.com"
  const password = process.env.ADMIN_PASSWORD || "admin123"

  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      console.log("管理员用户已存在")
      return
    }

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "管理员",
      },
    })

    console.log("管理员用户创建成功")
    console.log(`邮箱: ${email}`)
    console.log(`密码: ${password}`)
  } catch (error) {
    console.error("创建管理员用户失败:", error)
  }
}

initAdmin()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

