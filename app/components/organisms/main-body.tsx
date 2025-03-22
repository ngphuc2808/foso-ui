const MainBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="relative w-full overflow-hidden px-4">
      <div
        className="fixed top-[200px] -left-[150px] -z-[1] size-[300px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, #E0FFCC 0%, #18b27a 100%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="fixed -right-[150px] bottom-[50px] -z-[1] size-[300px] rounded-full opacity-50"
        style={{
          background: 'radial-gradient(circle, #E0FFCC 0%, #18b27a 100%)',
          filter: 'blur(80px)',
        }}
      />
      <main className="relative mx-auto mt-28 max-w-[calc(100%-2rem)] md:max-w-[calc(100%-4rem)] lg:max-w-7xl">
        {children}
      </main>
    </div>
  )
}

export default MainBody
