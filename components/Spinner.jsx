import React from 'react'

export default function Spinner() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div class="rounded-md h-12 w-12 border-4 border-t-4 border-blue-500 animate-spin absolute"></div>
        </div>
    )
}
