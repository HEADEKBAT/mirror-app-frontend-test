// SidebarInputs.tsx
import { useAppStore } from '@/store/useAppStore'
import { SidebarInput } from './sidebar-input'


const layoutLabels: Record<string, string> = {
  grid: 'Плиточная верстка',
  masonry: 'Кирпичная верстка',
}

const templateLabels: Record<string, string> = {
  classic: 'Классическая',
  hover: 'С наведением',
}

const navigationLabels: Record<string, string> = {
  'pagination': 'Пагинация',
  'load-more': 'Кнопка "Загрузить ещё"',
}



export const SidebarInputs: React.FC= () => {
  const { settings } = useAppStore()

  if (!settings) return null

  const currentLayout = settings.layout.current
  const layoutConfig = settings.layout.params[currentLayout]

  return (
    <div className={'space-y-4'}>
      <SidebarInput
        aboutInput="Шаблон (макет)"
        value={layoutLabels[currentLayout] || currentLayout}
      />
      <SidebarInput
        aboutInput="Карточка"
        value={templateLabels[settings.template] || settings.template}
      />
      <SidebarInput
        aboutInput="Навигация"
        value={navigationLabels[settings.navigation] || settings.navigation}
      />
      <SidebarInput aboutInput="Колонок" value={layoutConfig.columns} />
      <SidebarInput aboutInput="Рядов" value={layoutConfig.rows} />
    </div>
  )
}
