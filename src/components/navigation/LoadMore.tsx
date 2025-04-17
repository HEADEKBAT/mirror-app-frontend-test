import { Button } from "@/components/ui/button"

interface LoadMoreProps {
  onClick: () => void
  disabled?: boolean
}

export const LoadMore: React.FC<LoadMoreProps> = ({ onClick, disabled }) => {
  return (
    <div className="flex justify-center py-6">
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="outline"
        className="text-sm"
      >
        Загрузить ещё
      </Button>
    </div>
  )
}
