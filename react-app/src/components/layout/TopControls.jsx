import DeviceSwitcher from './DeviceSwitcher'

export default function TopControls({ previewMode, onPreviewModeChange }) {
  return (
    <div className="flex items-center justify-center px-4 py-2">
      <div className="rounded-lg border border-[#1C2A44]/8 bg-white p-1 shadow-sm">
        <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
      </div>
    </div>
  )
}
