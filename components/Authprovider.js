'use client'

import { SessionProvider } from "next-auth/react"

const Authprovider = ({children, SessionProvider})=>{
return(
    <div>
        <SessionProvider session  ={session}>
            {children}
        </SessionProvider>
    </div>
)




}