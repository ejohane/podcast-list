import { useContext, createContext } from "react"

/**
 * Auth context state
 */
interface Auth {
    token: string,
    setToken: (token: string) => void
}

/**
 * The auth context
 */
export const AuthContext = createContext<Auth>(undefined)

/**
 * Hook to use the auth context
 */
export const useAuth = () => {
    return useContext(AuthContext)
}