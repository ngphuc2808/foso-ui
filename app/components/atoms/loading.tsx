const Loading = () => {
  return (
    <div className="fixed inset-0 z-20 flex flex-row items-center justify-center gap-2 bg-slate-700/10">
      <div className="size-3 animate-bounce rounded-full bg-blue-400"></div>
      <div className="size-3 animate-bounce rounded-full bg-blue-400 [animation-delay:-.3s]"></div>
      <div className="size-3 animate-bounce rounded-full bg-blue-400 [animation-delay:-.5s]"></div>
    </div>
  )
}

export default Loading
