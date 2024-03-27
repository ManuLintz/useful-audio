import { useState } from 'react'
import { getFrequencies } from './getFrequencies'
// import { Lut } from 'three/addons/math/Lut.js'
import SpectrumVisualization from './SpectrumVisualization'
// import FiberTest from './FiberTest'

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
  // <FiberTest />
)

export default function UsefulPlayer() {
  const blob = window.URL
  const [hasFile, setHasFile] = useState(false)
  const [fileUrl, setFileUrl] = useState<null | string>(null)
  const [frequencies, setFrequencies] = useState<null | Uint8Array[]>(null)
  // const lut = new Lut('blackbody', 300)

  const handleFileInput = async (file: File | undefined) => {
    if (typeof file === 'undefined') {
      return
    }
    // console.log({ file })
    setFileUrl(blob.createObjectURL(file))
    setHasFile(true)

    // Test to get frequencies
    const arrayBuffer = await file.arrayBuffer()
    const audioContext = new AudioContext()
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer)
    const computedFrequencies = getFrequencies(audioBuffer)
    setFrequencies(computedFrequencies)
    // console.log({ computedFrequencies })
  }
  if (!hasFile || !fileUrl) {
    return <EmptyUsefulPlayer onFileInput={handleFileInput} />
  }

  return (
    <div>
      <audio controls autoPlay src={fileUrl} />
      {frequencies && <SpectrumVisualization spectrumData={frequencies} />}
    </div>
  )
}
