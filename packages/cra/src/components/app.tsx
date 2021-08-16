/** @format */

import React from 'react'
import { Autocomplete } from '@salary/autocomplete'
import { useTest1 } from '@hooks/test'

export const App: () => JSX.Element = () => {
    const number = useTest1()

    return (
        <div>
            <span>life is colorful{number}</span>
            <Autocomplete thredhold={100} />
        </div>
    )
}
