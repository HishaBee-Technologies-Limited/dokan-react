'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import OverviewPage from '@/components/online-shop/OverviewPage'

const Overview = () => {
    const router = useRouter()

    useEffect(() => {
        return () => router.push('/online-shop/overview')
    }, [])
    return <OverviewPage />
}

export default Overview