const prefix = 'revalidate'

const revalidateApiRequest = (tag: string) =>
  fetch(`/api/${prefix}?tag=${tag}`).then((res) => res.json())

export default revalidateApiRequest
