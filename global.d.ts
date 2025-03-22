import vi from '@/messages/vi.json'

type Messages = typeof vi

declare global {
  interface IntlMessages extends Messages {}
}

declare module '*.png' {
  const content: { src: string }
  export default content
}

declare module '*.jpg' {
  const content: { src: string }
  export default content
}

declare module '*.svg' {
  const content: { src: string }
  export default content
}
