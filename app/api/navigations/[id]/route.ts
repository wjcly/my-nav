import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    const body = await request.json()

    const { tagIds, ...data } = body

    const navigation = await prisma.navigation.update({
      where: { id },
      data: {
        ...data,
        tags: {
          deleteMany: {},
          create: tagIds.map((tagId: string) => ({
            tagId,
          })),
        },
      },
    })

    return NextResponse.json(navigation)
  } catch (error) {
    console.error("Error updating navigation:", error)
    return NextResponse.json(
      { error: "Failed to update navigation" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.navigation.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting navigation:", error)
    return NextResponse.json(
      { error: "Failed to delete navigation" },
      { status: 500 }
    )
  }
}

