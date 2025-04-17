import React from "react"
import { useAppStore } from "@/store/useAppStore"
import { LoadMore } from "./LoadMore"
import { PaginationShadcn } from "./Pagination"



export const PostNavigationRenderer: React.FC = () => {
  const {
    settings,
    limit,
    step,
    posts,
    currentPage,
    setPage,
    loadMore,
  } = useAppStore()

  if (!settings) return null

  const totalPages = Math.ceil(posts.length / step)

  if (settings.navigation === "load-more") {
    return (
      <LoadMore
        onClick={() => loadMore()} // это точно должен быть return
        disabled={limit >= posts.length}
      />
    )
  }

  if (settings.navigation === "pagination") {
    return (
      <PaginationShadcn
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    )
  }

  return null
}
