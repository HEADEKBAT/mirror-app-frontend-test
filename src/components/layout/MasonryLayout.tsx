import React from "react"

interface MasonryLayoutProps {
  columns: number
  rows: number 
  children: React.ReactNode[]
}

export const MasonryLayout: React.FC<MasonryLayoutProps> = ({ columns, children }) => {
  return (
    <div
      className="gap-4"
      style={{
        columnCount: columns,
        columnGap: "1rem",
      }}
    >
      {children.map((child, index) => (
        <div key={index} style={{ breakInside: "avoid", marginBottom: "1rem" }}>
          {child}
        </div>
      ))}
    </div>
  )
}
