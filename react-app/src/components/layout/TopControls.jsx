import DeviceSwitcher from './DeviceSwitcher'

export default function TopControls({ previewMode, onPreviewModeChange }) {
 return (
 <div className="flex items-center justify-center px-3 py-1">
 <div className="rounded-[5px] border border-[#1C2A44]/8 bg-[#F5F7FA] p-1 shadow-sm">
 <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
 </div>
 </div>
 )
}
