'use client'
import { useRouter } from "next/navigation"

export default function Error() {
  const router = useRouter()
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="card">
        <h1 className="text-2xl">Error 404</h1>
        <div className="flex flex-col items-center gap-4">
          <p>Can not find the page you are looking for</p>
          <button onClick={() => router.push('/')}>Return Home</button>
        </div>
      </div>
    </div>
  )
}
