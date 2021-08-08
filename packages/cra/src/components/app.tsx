/** @format */

import React from 'react'
import { Button } from '@salary/autocomplete'
import { useTest1 } from '@hooks/test'

console.log(a)

export const App: () => JSX.Element = () => {
    const number = useTest1()

    return (
        <div>
            <span>life is colorful{number}</span>
            <Button />
        </div>
    )
}