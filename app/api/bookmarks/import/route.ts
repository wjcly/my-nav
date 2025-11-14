import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { bookmarks } = body

    let count = 0

    for (const bookmark of bookmarks) {
      try {
        // 检查是否已存在
        const existing = await prisma.navigation.findFirst({
          where: { url: bookmark.url },
        })

        if (existing) {
          continue
        }

        // 创建导航项
        await prisma.navigation.create({
          data: {
            title: bookmark.title || new URL(bookmark.url).hostname,
            url: bookmark.url,
            shortDescription: null,
            description: null,
            icon: null,
            visits: 0,
          },
        })

        count++
      } catch (error) {
        console.error(`Failed to import bookmark ${bookmark.url}:`, error)
      }
    }

    return NextResponse.json({ count, total: bookmarks.length })
  } catch (error) {
    console.error("Error importing bookmarks:", error)
    return NextResponse.json(
      { error: "Failed to import bookmarks" },
      { status: 500 }
    )
  }
}

