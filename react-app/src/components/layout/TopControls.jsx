import DeviceSwitcher from './DeviceSwitcher'

export default function TopControls({ previewMode, onPreviewModeChange }) {
 return (
 <div className="flex items-center justify-center px-3 py-1">
 <div className="rounded-[6px] border border-[#1E1E1E]/8 bg-[#F7F7F7]/85 p-1 shadow-[0_1px_2px_rgba(30,30,30,0.06)]">
 <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
 </div>
 </div>
 )
}
