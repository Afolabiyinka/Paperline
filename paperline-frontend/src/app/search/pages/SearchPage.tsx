
import Input from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import BlogCard from "@/app/blogs/components/BlogCard"
import { useSearch } from "../hooks/useSearch"
import BlogCardSkeleton from "@/app/blogs/pages/blogs/sub-components/blog-card-skeloton"

const SearchPage = () => {

    const { searchError, searchLoading, searchresults, query, setQuery } = useSearch()



    const blogs = searchresults?.blogs ?? [];

    return (
        <div className="min-h-screen bg-background">

            {/* Search Header */}
            <div className="py-10 px-6">
                <div className="max-w-2xl mx-auto">
                    <div className="flex items-center gap-3 pb-2">
                        <Input
                            startIcon="Search"
                            value={query}
                            onChange={(e) => setQuery(e)}
                            placeholder="Search stories..."
                        />
                        {query && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 text-muted-foreground"
                                onClick={() => setQuery("")}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                    {query && (
                        <p className="mt-3 text-sm text-muted-foreground">
                            {searchresults?.pagination.total}  Results for{" "}
                            <span className="font-['Georgia',serif] italic text-foreground">"{query}"</span>
                        </p>
                    )}
                </div>
            </div>

            {/* Results */}
            <div className="mx-auto max-w-2xl  px-6 py-8">


                {!searchLoading && !searchError && !query && (
                    <div className="py-16 text-center">
                        <p className="font-['Georgia',serif] text-xl italic text-muted-foreground/40">
                            Start typing to search stories...
                        </p>
                    </div>
                )}

                {searchLoading && (
                    <div
                        className="grid grid-cols-1 lg:grid-cols-1 gap-6 md:gap-8"
                    >
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i}>
                                <BlogCardSkeleton />
                            </div>
                        ))}
                    </div>
                )}



                {!searchLoading && !searchError && blogs.length > 0 &&
                    blogs.map((blog) =>
                        <div>
                            <BlogCard key={blog.id} blog={blog} />
                        </div>)
                }

                {!searchLoading && query && blogs.length === 0 && (
                    <div className="py-16 text-center">
                        <p className="font-['Georgia',serif] text-xl italic text-muted-foreground/40">
                            No stories found for "{query}"
                        </p>
                    </div>
                )}
            </div>

        </div>
    )
}

export default SearchPage