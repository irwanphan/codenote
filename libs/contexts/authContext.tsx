import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import { supabase } from '@libs/connections/supabase'
import { type Session } from '@supabase/gotrue-js/src/lib/types'

type authContextType = {
    isLoadingSession: boolean
    session: Session | null
    user: any
}
const authContextDefaultValues: authContextType = {
    isLoadingSession: true,
    session: null,
    user: null,
}

const AuthContext = createContext<authContextType>(authContextDefaultValues)

export function useAuth() {
    return useContext(AuthContext)
}

type Props = {
    children: ReactNode
}

export function AuthProvider({ children }: Props) {
    const [ session, setSession ] = useState<Session | null>(null)
    const [ sessionExist, setSessionExist ] = useState<boolean>(false)
    const [ user, setUser ] = useState<any>(null)
    const [ isLoadingSession, setIsLoadingSession ] = useState<boolean>(true)
  
    const getInitialSession = () => {
        const supabaseSession = supabase.auth.getSession()
            .then(res => {
                const sessionString = JSON.stringify(res.data.session);
                sessionStorage.setItem('tokoSession', sessionString);
            })
    }

    const sessionData = typeof sessionStorage !== 'undefined' ?
                        sessionStorage.getItem('tokoSession') : 
                        null
    useEffect(() => {
        if (sessionData !== null && sessionData !== undefined) {
            setSessionExist(true)
        }
    }, [sessionData])

    useEffect(() => {
        const fetchSession = async () => {
            try {
                if (!sessionExist) {
                    getInitialSession()
                    setSessionExist(true)
                }
                else if (sessionData) {
                    setSession(JSON.parse(sessionData))
                }
                const data = supabase.auth.onAuthStateChange((_event, session) => {
                    // setSession(session)
                    setSession(prevSession => session ?? prevSession)
                }).data
                
            } catch (error) {
                console.log(error)
            }
        }
        fetchSession()
    }, [sessionExist])
    
    useEffect(() => {
        if (session) {
            setUser(session.user)
        }
        setIsLoadingSession(false)
    }, [sessionExist, session])

    // useEffect(() => {
    //     console.log('session loading: ', isLoadingSession);
    // }, [isLoadingSession, sessionExist, session])

    const value = {
        isLoadingSession,
        session,
        user
    }
  
    return (
        <>
            <AuthContext.Provider value={value}>
                {children}
            </AuthContext.Provider>
        </>
    )
}