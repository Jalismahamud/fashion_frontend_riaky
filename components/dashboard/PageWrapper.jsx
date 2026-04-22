import { cn } from '@/lib/utils'
import React from 'react'

const PageWrapper = ({ children, className }) => {
    return (
        <div className={cn("w-full flex flex-col xs:gap-6 gap-4 py-5", className)}>
            {children}
        </div>
    )
}

export default PageWrapper