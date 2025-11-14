import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function getFaviconUrl(url: string): Promise<string | null> {
  try {
    const domain = new URL(url).origin
    const faviconUrl = `${domain}/favicon.ico`

    // 尝试获取favicon
    const response = await fetch(faviconUrl, { method: "HEAD" })
    if (response.ok) {
      return faviconUrl
    }

    // 如果失败，尝试使用Google的favicon服务
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  } catch (error) {
    console.error(`Failed to get favicon for ${url}:`, error)
    return null
  }
}

async function updateFavicons() {
  console.log("开始更新favicon...")

  const navigations = await prisma.navigation.findMany({
    where: {
      OR: [{ icon: null }, { icon: "" }],
    },
    take: 50, // 每次更新50个，避免超时
  })

  console.log(`找到 ${navigations.length} 个需要更新favicon的导航`)

  for (const nav of navigations) {
    try {
      const faviconUrl = await getFaviconUrl(nav.url)
      if (faviconUrl) {
        await prisma.navigation.update({
          where: { id: nav.id },
          data: { icon: faviconUrl },
        })
        console.log(`✓ 更新 ${nav.title} 的favicon`)
      }
    } catch (error) {
      console.error(`✗ 更新 ${nav.title} 的favicon失败:`, error)
    }

    // 添加延迟，避免请求过快
    await new Promise((resolve) => setTimeout(resolve, 500))
  }

  console.log("favicon更新完成")
}

updateFavicons()
  .catch(console.error)
  .finally(() => prisma.$disconnect())

