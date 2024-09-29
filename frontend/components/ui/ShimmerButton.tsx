import React from 'react'

type Props = {
  title: string
  icon: React.ReactNode
  position: string
  handleClick?: () => void
  otherClasses?: string
}
export const ShimmerButton = ({
  title, icon, position, handleClick, otherClasses
}: Props) => {
  return (
    <div>
        <button className={`inline-flex h-10 w-full animate-shimmer items-center justify-around rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 gap-3 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-1 focus:ring-slate-400  ${otherClasses}`}>
          {position === 'left' && icon}
          {title}
          {position === 'right' && icon}
        </button>
    </div>
  )
}
