'use client'

import AuthProvider from '@/providers/AuthProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GoogleOAuthProvider } from '@react-oauth/google';

export function Providers({ children, serverUserData = null, serverAccessToken = null }) {
    const queryClient = new QueryClient()
    const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    return (
        <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                <AuthProvider serverUserData={serverUserData} serverAccessToken={serverAccessToken}>
                    {children}
                </AuthProvider>
            </GoogleOAuthProvider>
        </QueryClientProvider>
    )
}
