import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const q = searchParams.get("q")
    const tag = searchParams.get("tag")
    const sortBy = searchParams.get("sortBy")

    let where: any = {}
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { shortDescription: { contains: q } },
        { description: { contains: q } },
      ]
    }

    if (tag) {
      where.tags = {
        some: {
          tag: {
            name: tag,
          },
        },
      }
    }

    let orderBy: any = { createdAt: "desc" }
    if (sortBy === "visits") {
      orderBy = { visits: "desc" }
    } else if (sortBy === "created") {
      orderBy = { createdAt: "desc" }
    }

    const navigations = await prisma.navigation.findMany({
      where,
      orderBy,
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(navigations)
  } catch (error) {
    console.error("Error fetching navigations:", error)
    return NextResponse.json(
      { error: "Failed to fetch navigations" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { tagIds, ...data } = body

    const navigation = await prisma.navigation.create({
      data: {
        ...data,
        tags: {
          create: tagIds.map((tagId: string) => ({
            tagId,
          })),
        },
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(navigation)
  } catch (error) {
    console.error("Error creating navigation:", error)
    return NextResponse.json(
      { error: "Failed to create navigation" },
      { status: 500 }
    )
  }
}
