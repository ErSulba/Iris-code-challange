import { MoreHorizontal } from "lucide-react"

export function Header() {
  return (
    <div className="flex justify-between items-center px-6 py-4">
      <h1 className="text-3xl font-bold text-white">Iris</h1>
      <button className="p-1 hover:bg-white/10 rounded-full transition-colors" aria-label="More options">
        <MoreHorizontal className="w-6 h-6 text-white" />
      </button>
    </div>
  )
}
