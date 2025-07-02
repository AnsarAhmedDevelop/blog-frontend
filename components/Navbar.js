import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <BookOpen className="text-purple-500" />
          <span>Blog App</span>
        </Link>
      </div>
    </nav>
  )
}
