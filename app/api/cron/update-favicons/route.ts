import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// 简单的API密钥验证（生产环境应使用更安全的方式）
const CRON_SECRET = process.env.CRON_SECRET || "your-secret-key"

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const navigations = await prisma.navigation.findMany({
      where: {
        OR: [{ icon: null }, { icon: "" }],
      },
      take: 50,
    })

    let updated = 0

    for (const nav of navigations) {
      try {
        const domain = new URL(nav.url).origin
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`

        await prisma.navigation.update({
          where: { id: nav.id },
          data: { icon: faviconUrl },
        })

        updated++
      } catch (error) {
        console.error(`Failed to update favicon for ${nav.url}:`, error)
      }

      // 添加延迟
      await new Promise((resolve) => setTimeout(resolve, 500))
    }

    return NextResponse.json({
      success: true,
      updated,
      total: navigations.length,
    })
  } catch (error) {
    console.error("Error updating favicons:", error)
    return NextResponse.json(
      { error: "Failed to update favicons" },
      { status: 500 }
    )
  }
}

