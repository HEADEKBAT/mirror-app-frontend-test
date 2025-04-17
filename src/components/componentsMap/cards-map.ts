import { GridLayout } from '../layout/GridLayout'
import { MasonryLayout } from '../layout/MasonryLayout'

import { ClassicCard } from '../cards/ClassicCard'
import { HoverCard } from '../cards/HoverCard'

import { PaginationShadcn  } from '../navigation/Pagination'
import { LoadMore } from '../navigation/LoadMore'



// Layout map
export const layoutMap = {
  grid: GridLayout,
  masonry: MasonryLayout,
} as const

// Card map
export const cardMap = {
  classic: ClassicCard,
  hover: HoverCard,
} as const

// Navigation map
export const navigationMap = {
  pagination: PaginationShadcn,
  'load-more': LoadMore,
} as const

