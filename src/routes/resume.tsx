import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

export const Route = createFileRoute('/resume')({
    component: RouteComponent,
})

function RouteComponent() {
    useEffect(() => {
        window.location.replace('/documents/Fulkerson_John_Resume.pdf')
    }, [])
    return null
}