import React from "react"

interface GridLayout {
  columns: number
  rows: number
  children: React.ReactNode[]
}

export const GridLayout: React.FC<{
  columns: number
  rows: number
  children: React.ReactNode[]
}> = ({ columns, children }) => {
  return (
    <div
      className="gap-4"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {children}
    </div>
  )
}