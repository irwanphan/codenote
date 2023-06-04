import { createContext, ReactNode, useContext, useState, useEffect } from "react"
import { supabase } from '@libs/connections/supabase'
import { type Session } from '@supabase/gotrue-js/src/lib/types'
import { useRecoilState } from "recoil"
import { sessionState } from "./session"

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
    // const [ session, setSession ] = useRecoilState<Session | null | any>(sessionState)
    const [ session, setSession ] = useState<Session | null>(null)
    const [ sessionExist, setSessionExist ] = useState<boolean>(false)
    const [ user, setUser ] = useState<any>(null)
    const [ isLoadingSession, setIsLoadingSession ] = useState<boolean>(true)

    
    // const session = sessionData ? JSON.parse(sessionData) : null;
    // useEffect(() => {
    //     if (!sessionExist) {
    //         if (sessionData) {
    //             setSession(JSON.parse(sessionData))
    //             setSessionExist(true)
    //         }
    //     }
    // }, [sessionData])
  
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
        const fetchSession = async () => {
            try {
                if (sessionData !== null && sessionData !== undefined) {
                    setSessionExist(true)
                } else
                if (!sessionExist) {
                    getInitialSession()
                    setSessionExist(true)
                } else
                if (sessionData) {
                    setSession(JSON.parse(sessionData))
                }
                const data = supabase.auth.onAuthStateChange((_event, session) => {
                    setSession(session)
                }).data
                    
                setIsLoadingSession(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchSession()
    }, [sessionData])

    useEffect(() => {
        if (session) {
            setUser(session.user)
        }
    }, [session])

    // console.log('user: ', currentUser)
    // console.log('session: ', session)

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