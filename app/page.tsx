import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NavigationGrid } from "@/components/navigation-grid"
import { SearchBar } from "@/components/search-bar"
import { FilterBar } from "@/components/filter-bar"
import { Card } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-8 space-y-8 mx-auto max-w-7xl">
        <Card className="bg-card/50 backdrop-blur-sm border-border/50 shadow-lg px-6 py-8 md:px-8 md:py-12">
          <div className="space-y-8 md:space-y-10">
            <div className="text-center space-y-3 md:space-y-4 animate-fade-in-up">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tighter">
                发现优质网站
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                精选互联网优质资源，让发现更简单
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
              <SearchBar />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>
              <FilterBar />
            </div>
          </div>
        </Card>
        <NavigationGrid />
      </main>
      <Footer />
    </div>
  )
}
