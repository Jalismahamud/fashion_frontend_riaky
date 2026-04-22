import { AuthContext } from "@/contexts"
import { useContext } from "react"

export function useUser() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}