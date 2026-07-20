const SectionSeparator = () => {
  return (
    <div className="w-full py-4 flex items-center justify-center">
        <div className="h-[1px] bg-zinc-200 flex-1"></div>
        <span className="text-zinc-400 text-lg px-4 font-light leading-none flex items-center justify-center pb-[2px]">+</span>
        <div className="h-[1px] bg-zinc-200 flex-1"></div>
    </div>
  )
}

export default SectionSeparator
