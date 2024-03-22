import { useState } from 'react'

const EmptyUsefulPlayer = ({
  onFileInput
}: {
  onFileInput: (file: File | undefined) => void
}) => (
  <label className="block">
    <span className="sr-only">Choose profile photo</span>
    <input
      type="file"
      className="block w-full text-sm text-slate-500
      file:mr-4 file:rounded-full file:border-0
      file:bg-violet-50 file:px-4
      file:py-2 file:text-sm
      file:font-semibold file:text-violet-700
      hover:file:bg-violet-100
"
      accept="audio/*"
      onChange={(event) => onFileInput(event.target.files?.[0])}
    />
  </label>
)

export default function UsefulPlayer() {
  const blob = window.URL
  const [hasFile, setHasFile] = useState(false)
  const [fileUrl, setFileUrl] = useState<null | string>(null)
  const handleFileInput = (file: File | undefined) => {
    if (typeof file === 'undefined') {
      return
    }
    console.log({ file })
    setFileUrl(blob.createObjectURL(file))
    setHasFile(true)
  }
  if (!hasFile || !fileUrl) {
    return <EmptyUsefulPlayer onFileInput={handleFileInput} />
  }

  return <audio controls autoPlay src={fileUrl} />
}
