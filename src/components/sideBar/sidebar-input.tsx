interface Props {
  aboutInput: string
  value: string | number
}

export const SidebarInput: React.FC<Props> = ({ aboutInput, value }) => {
  return (
    <>
      <label className="text-sm ">{aboutInput}</label>
      <input
        type="text"
        value={value}
        readOnly
        className="w-full rounded-md border mt-2  px-3 py-2 text-sm"
      />
    </>
  )
}