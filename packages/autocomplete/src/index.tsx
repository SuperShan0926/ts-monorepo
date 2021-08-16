/**
 * /* eslint-disable no-alert
 *
 * @format
 */

import React from 'react'
import { useLatestSearchValue } from './hooks'
import './index.css'
import type { Response } from './mock/fake'

const SearchResList: React.FC<{ list: Response['data']; onChoose: (item: Response['data'][0]) => void }> = ({
    list = [],
    onChoose,
}) => {
    if (!list.length) return null

    return (
        <div className="searchResWrapper">
            {list.map(item => (
                <div className="searchResItem" onClick={() => onChoose(item)} key={item.id}>
                    {item.res}
                </div>
            ))}
        </div>
    )
}

export const Autocomplete: React.FC<{ thredhold?: number }> = ({ thredhold = 50 }) => {
    const initValue = ''
    const [resList, handler] = useLatestSearchValue(initValue, thredhold)
    const onChoose = (item: Response['data'][0]) => {
        console.log(1111, item)
    }

    return (
        <div className="completeWrapper">
            <input type="search" autoComplete="off" className="autoComplete" onChange={handler} />
            <SearchResList list={resList} onChoose={onChoose} />
        </div>
    )
}
