import { useEffect, useMemo, useState } from 'react'
import { isSupabaseConfigured, supabase } from '../lib/supabase.js'
import { AuthContext } from './AuthContext.js'

function AuthProvider({ children }) {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return undefined
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const value = useMemo(() => {
    const isAdmin = session?.user?.app_metadata?.role === 'admin'

    return {
      session,
      loading,
      isAdmin,
      isSupabaseConfigured,
      async signInAsAdmin(id, password) {
        if (!supabase) {
          throw new Error('Supabase 환경변수를 먼저 설정해주세요.')
        }

        if (id.trim().toLowerCase() !== 'admin') {
          throw new Error('ID 또는 비밀번호가 올바르지 않습니다.')
        }

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL

        if (!adminEmail) {
          throw new Error('VITE_ADMIN_EMAIL 환경변수가 없습니다.')
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: adminEmail,
          password,
        })

        if (error) {
          throw new Error('ID 또는 비밀번호가 올바르지 않습니다.')
        }

        if (data.user?.app_metadata?.role !== 'admin') {
          await supabase.auth.signOut()
          throw new Error('관리자 권한이 없는 계정입니다.')
        }

        return data
      },
      async signOut() {
        if (supabase) {
          await supabase.auth.signOut()
        }
      },
    }
  }, [loading, session])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
