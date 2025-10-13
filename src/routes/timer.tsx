import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/timer')({
    component: RouteComponent,
})

function RouteComponent() {
    useEffect(() => {
        window.location.replace('https://timer.johnfulkerson.com')
    }, [])
    return null
}