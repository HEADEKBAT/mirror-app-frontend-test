import { create } from "zustand"
import type { Settings, Post, User } from "@/types"



type AppState = {
  users: User[]
  posts: Post[]
  settings: Settings | null
  loading: boolean
  error: string | null

  currentPage: number
  limit: number
  step: number
  displayedPosts: Post[]

  fetchAll: (options?: { onlySettings?: boolean }) => Promise<void>
  setPage: (page: number) => void
  loadMore: () => void
  resetPagination: () => void
  computeDisplayedPosts: () => void
}

export const useAppStore = create<AppState>((set, get) => ({
  users: [],
  posts: [],
  settings: null,
  loading: false,
  error: null,

  currentPage: 1,
  limit: 0,
  step: 6,
  displayedPosts: [],

  fetchAll: async (options?: { onlySettings?: boolean }) => {
    set({ loading: true, error: null })
  
    try {
      const { onlySettings = false } = options || {}
  
      let users = get().users
      let posts = get().posts
      let settings: Settings
  
      if (onlySettings) {
        // 🔁 Запрашиваем только settings
        const res = await fetch("https://mirror-app-frontend-demo-server.vercel.app/settings")
        if (!res.ok) throw new Error("Ошибка загрузки настроек")
        settings = await res.json()
      } else {
        // 🧾 Запрашиваем всё (users, posts, settings)
        const [usersRes, postsRes, settingsRes] = await Promise.all([
          fetch("https://mirror-app-frontend-demo-server.vercel.app/users"),
          fetch("https://mirror-app-frontend-demo-server.vercel.app/posts"),
          fetch("https://mirror-app-frontend-demo-server.vercel.app/settings"),
        ])
  
        if (!usersRes.ok || !postsRes.ok || !settingsRes.ok) {
          throw new Error("Ошибка при получении данных с сервера")
        }
  
        [users, posts, settings] = await Promise.all([
          usersRes.json(),
          postsRes.json(),
          settingsRes.json(),
        ])
      }
  
      const layoutKey = settings.layout.current
      const layoutParams = settings.layout.params[layoutKey]
      const step = layoutParams.columns * layoutParams.rows
  
      set({
        users,
        posts,
        settings,
        step,
        limit: step,
        currentPage: 1,
        loading: false,
      })
  
      get().computeDisplayedPosts()
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Неизвестная ошибка"
      set({ error: message, loading: false })
    }
  },
  
  

  setPage: (page) => {
    set({ currentPage: page }, false)
    get().computeDisplayedPosts()
  },

  loadMore: () => {
    const { limit, step, posts } = get()
    const newLimit = limit + step
    set({ limit: newLimit > posts.length ? posts.length : newLimit })
    get().computeDisplayedPosts()


  },

  resetPagination: () => {
    const settings = get().settings
    if (!settings) return

    const layoutKey = settings.layout.current
    const layoutParams = settings.layout.params[layoutKey]
    const step = layoutParams.columns * layoutParams.rows

    set({
      currentPage: 1,
      limit: step,
      step,
    })

    get().computeDisplayedPosts()
  },

  computeDisplayedPosts: () => {
    const { posts, settings, currentPage, limit, step } = get()
  
    if (!settings) {
      set({ displayedPosts: [] })
      return
    }
  
    const layoutKey = settings.layout.current
    const layoutParams = settings.layout.params[layoutKey]
    const maxVisible = layoutParams.columns * layoutParams.rows
    const navigation = settings.navigation
  
    if (navigation === "pagination") {
      const start = (currentPage - 1) * step
      const end = start + step
      const sliced = posts.slice(start, end).slice(0, maxVisible)
      set({ displayedPosts: sliced })
      return
    }
  
    if (navigation === "load-more") {
      const sliced = posts.slice(0, limit)
      set({ displayedPosts: sliced })
      return
    }
  
    set({ displayedPosts: [] })
  }
  
}))

