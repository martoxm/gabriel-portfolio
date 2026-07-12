import { useEffect, useState } from "react"
import type { GitHubRepo } from "../types/github"

type UseGitHubReposResult = {
  repos: GitHubRepo[]
  loading: boolean
  error: string | null
}

export function useGitHubRepos(username: string): UseGitHubReposResult {
  const [repos, setRepos] = useState<GitHubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
        )

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error(
              "Limite da API do GitHub atingido. Tente novamente mais tarde.",
            )
          }

          if (response.status === 404) {
            throw new Error("Usuário do GitHub não encontrado.")
          }

          throw new Error("Não foi possível carregar os repositórios.")
        }

        const data: GitHubRepo[] = await response.json()

        const filteredRepos = data
          .filter((repo) => !repo.fork)
          .sort(
            (a, b) =>
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
          )

        setRepos(filteredRepos)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("Erro inesperado ao buscar repositórios.")
        }
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchRepos()
    }
  }, [username])

  return { repos, loading, error }
}
