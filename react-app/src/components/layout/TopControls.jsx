import DeviceSwitcher from './DeviceSwitcher'

export default function TopControls({ previewMode, onPreviewModeChange }) {
 return (
 <div className="flex items-center justify-center px-3 py-1">
 <div className="rounded-[8px] border border-white/8 bg-[#0F1B2E]/85 p-1 shadow-[0_1px_2px_rgba(0,0,0,0.2)]">
 <DeviceSwitcher value={previewMode} onChange={onPreviewModeChange} />
 </div>
 </div>
 )
}
