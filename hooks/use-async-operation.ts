import { useCallback, useState } from "react"

interface UseAsyncOperationResult<T> {
    data: T | null
    isLoading: boolean
    error: string | null
    execute: (...args: any[]) => Promise<T | void>
    reset: () => void
}

export function useAsyncOperation<T = any>(asyncFunction: (...args: any[]) => Promise<T>): UseAsyncOperationResult<T> {
    const [data, setData] = useState<T | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const execute = useCallback(
        async (...args: any[]): Promise<T | void> => {
            try {
                setIsLoading(true)
                setError(null)
                const result = await asyncFunction(...args)
                setData(result)
                return result
            } catch (error: any) {
                const errorMessage = error.message || "An unexpected error occured"
                setError(errorMessage)
                throw error
            } finally {
                setIsLoading(false)
            }
        },
        [asyncFunction],
    )

    const reset = useCallback(() => {
        setData(null)
        setError(null)
        setIsLoading(false)
    }, [])

    return {
        data,
        isLoading,
        error,
        execute,
        reset,
    }
}