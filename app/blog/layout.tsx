import MainHeader from '@app/components/organisms/main-header'
import MainBody from '@app/components/organisms/main-body'

const BlogLayout: React.FC<
  Readonly<{
    children: React.ReactNode
  }>
> = async ({ children }) => {
  return (
    <>
      <MainHeader />
      <MainBody>{children}</MainBody>
    </>
  )
}

export default BlogLayout
