export type MemberLink = {
  label: string
  url: string
}

export type Member = {
  id: string | number
  name: string
  university: string
  country: string
  image: string
  role: string
  links?: MemberLink[]
}
