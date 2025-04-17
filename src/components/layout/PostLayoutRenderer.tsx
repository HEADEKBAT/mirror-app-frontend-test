import React, { useEffect } from "react"
import { useAppStore } from "@/store/useAppStore"
import { layoutMap, cardMap } from "@/components/componentsMap/cards-map"
import { PostNavigationRenderer } from "../navigation/PostNavigationRenderer"

export const PostLayoutRenderer: React.FC = () => {
  const {
    settings,
    users,
    displayedPosts,
    resetPagination,
    computeDisplayedPosts,
    limit,
  } = useAppStore()

  // при смене настроек — сбрасываем навигацию
  useEffect(() => {
    resetPagination()
  }, [settings?.layout.current, settings?.navigation])

  // при изменении limit (load-more) — обновляем список отображаемых постов
  useEffect(() => {
    computeDisplayedPosts()
  }, [limit])

  if (!settings) {
    return <p className="text-center text-muted-foreground">Загрузка настроек...</p>
  }

  const Layout = layoutMap[settings.layout.current]
  const Card = cardMap[settings.template]
  const layoutParams = settings.layout.params[settings.layout.current]

  return (
    <>
      <Layout {...layoutParams}>
        {displayedPosts.map((post) => {
          const user = users.find((u) => u.id === post.userId)
          return <Card key={post.id} post={post} user={user} />
        })}
      </Layout>

      <PostNavigationRenderer />
    </>
  )
}
