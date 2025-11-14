import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { NavigationGrid } from "@/components/navigation-grid"
import { SearchBar } from "@/components/search-bar"
import { FilterBar } from "@/components/filter-bar"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col relative">
      <AnimatedBackground />
      <Header />
      <main className="flex-1 container px-4 py-12 md:py-16 space-y-8 mx-auto max-w-7xl relative z-10">
        <div className="space-y-6 md:space-y-8">
          <div className="animate-fade-in-up">
            <SearchBar />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: "100ms" }}>
            <FilterBar />
          </div>
        </div>
        <NavigationGrid />
      </main>
      <Footer />
    </div>
  )
}
