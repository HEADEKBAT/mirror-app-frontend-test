// types.ts
  export type User = {
    id: string
    username: string
    postId: string
  }
  
  export interface Post {
    id: string;
    caption: string;
    permalink: string;
    date: string;
    likes: number;
    comments: number;
    userId: string;
  }
  
  
 
  type Layout = 'grid' | 'masonry'
  type LayoutElement = 'columns' | 'rows'
  type Template = 'classic' | 'hover'
  type Navigation = 'load-more' | 'pagination'
  
  type LayoutConfig = Record<LayoutElement, number>
  type LayoutParams = Record<Layout, LayoutConfig>
  
  export interface Settings {
  
    layout: {
      current: Layout
      params: LayoutParams
    }
    template: Template
    navigation: Navigation
  }
  