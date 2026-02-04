"use client"

interface ProgressIndicatorProps {
  currentPage: number
  totalPages: number
  onPageClick?: (page: number) => void
}

export function ProgressIndicator({ currentPage, totalPages, onPageClick }: ProgressIndicatorProps) {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => onPageClick?.(i)}
          className={`group relative h-3 w-3 rounded-full transition-all duration-300 ${
            currentPage === i
              ? "bg-accent scale-125"
              : "bg-foreground/20 hover:bg-foreground/40"
          }`}
          aria-label={`Go to page ${i + 1}`}
        >
          <span
            className={`absolute right-full mr-3 whitespace-nowrap rounded px-2 py-1 text-xs font-medium opacity-0 transition-opacity group-hover:opacity-100 ${
              currentPage === i ? "text-accent" : "text-foreground/60"
            }`}
          >
            Page {i + 1}
          </span>
        </button>
      ))}
    </div>
  )
}
