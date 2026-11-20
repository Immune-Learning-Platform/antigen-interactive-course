import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

/* ==========================================================================
   学习进度（浏览器本地存储）
   —— 仅保存在本机 localStorage；换设备/清缓存会丢失。不做“教师后台”的任何伪装。
   ========================================================================== */

export type QuestionGroup = 'pre' | 'module' | 'classroom' | 'homework' | 'post' | 'free'

export interface AnswerRecord {
  correct: boolean
  at: number
  group: QuestionGroup
  value?: string
}

export interface ProgressState {
  version: number
  visited: Record<string, number>
  answers: Record<string, AnswerRecord>
  drafts: Record<string, string>
  checklist: Record<string, boolean>
}

/** 第1章的默认存储键（保持不变，保证既有学习记录不丢） */
const STORAGE_KEY = 'vei.antigen.progress.v1'

const initialState: ProgressState = {
  version: 1,
  visited: {},
  answers: {},
  drafts: {},
  checklist: {},
}

function safeLoad(key: string = STORAGE_KEY): ProgressState {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return initialState
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    if (!parsed || parsed.version !== 1) return initialState
    return { ...initialState, ...parsed }
  } catch {
    return initialState
  }
}

interface ProgressContextValue {
  state: ProgressState
  storageAvailable: boolean
  markVisited: (pageId: string) => void
  recordAnswer: (questionId: string, correct: boolean, group: QuestionGroup, value?: string) => void
  setDraft: (id: string, text: string) => void
  toggleCheck: (id: string) => void
  reset: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({
  children,
  storageKey = STORAGE_KEY,
}: {
  children: ReactNode
  /** 多课程同域部署时用不同键，避免两章共用一份进度 */
  storageKey?: string
}) {
  const [state, setState] = useState<ProgressState>(() => safeLoad(storageKey))
  const [storageAvailable, setStorageAvailable] = useState(true)

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(state))
      setStorageAvailable(true)
    } catch {
      setStorageAvailable(false)
    }
  }, [state, storageKey])

  const markVisited = useCallback((pageId: string) => {
    setState((prev) =>
      prev.visited[pageId] ? prev : { ...prev, visited: { ...prev.visited, [pageId]: Date.now() } },
    )
  }, [])

  const recordAnswer = useCallback(
    (questionId: string, correct: boolean, group: QuestionGroup, value?: string) => {
      setState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [questionId]: { correct, at: Date.now(), group, value },
        },
      }))
    },
    [],
  )

  const setDraft = useCallback((id: string, text: string) => {
    setState((prev) => ({ ...prev, drafts: { ...prev.drafts, [id]: text } }))
  }, [])

  const toggleCheck = useCallback((id: string) => {
    setState((prev) => ({ ...prev, checklist: { ...prev.checklist, [id]: !prev.checklist[id] } }))
  }, [])

  const reset = useCallback(() => {
    setState(initialState)
    try {
      localStorage.removeItem(storageKey)
    } catch {
      /* ignore */
    }
  }, [storageKey])

  const value = useMemo(
    () => ({ state, storageAvailable, markVisited, recordAnswer, setDraft, toggleCheck, reset }),
    [state, storageAvailable, markVisited, recordAnswer, setDraft, toggleCheck, reset],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress 必须在 ProgressProvider 内使用')
  return ctx
}

/** 记录页面访问（进入页面即视为“已学习”） */
export function usePageVisit(pageId: string) {
  const { markVisited } = useProgress()
  useEffect(() => {
    markVisited(pageId)
  }, [pageId, markVisited])
}

export interface GroupStat {
  total: number
  correct: number
  pct: number
}

export function useStats(requiredPages: string[]) {
  const { state } = useProgress()

  return useMemo(() => {
    const visitedCount = requiredPages.filter((p) => state.visited[p]).length
    const byGroup: Record<QuestionGroup, GroupStat> = {
      pre: { total: 0, correct: 0, pct: 0 },
      module: { total: 0, correct: 0, pct: 0 },
      classroom: { total: 0, correct: 0, pct: 0 },
      homework: { total: 0, correct: 0, pct: 0 },
      post: { total: 0, correct: 0, pct: 0 },
      free: { total: 0, correct: 0, pct: 0 },
    }
    Object.values(state.answers).forEach((a) => {
      const g = byGroup[a.group] ?? byGroup.free
      g.total += 1
      if (a.correct) g.correct += 1
    })
    ;(Object.keys(byGroup) as QuestionGroup[]).forEach((k) => {
      const g = byGroup[k]
      g.pct = g.total === 0 ? 0 : Math.round((g.correct / g.total) * 100)
    })

    const pagePct =
      requiredPages.length === 0 ? 0 : Math.round((visitedCount / requiredPages.length) * 100)
    const answeredTotal = Object.keys(state.answers).length
    const checkedCount = Object.values(state.checklist).filter(Boolean).length

    return { visitedCount, pagePct, byGroup, answeredTotal, checkedCount }
  }, [state, requiredPages])
}
