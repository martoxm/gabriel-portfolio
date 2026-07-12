export type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  homepage: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  topics: string[]
  updated_at: string
  pushed_at: string
  fork: boolean
}
