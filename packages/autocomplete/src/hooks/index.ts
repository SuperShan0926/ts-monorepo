/** @format */

import React, { useState, useEffect, useRef } from 'react'
import { throttle } from '../utils'
import { fetcheDataFromMock } from '../mock/fake'
import type { Response, mockFn } from '../mock/fake'

export function useLatestSearchValue(
    initValue: string,
    thredhold: number
): [Response['data'], (event: React.FormEvent<HTMLInputElement>) => void] {
    const [searchStr, setSearchStr] = useState<string>(initValue)
    const [respList, setRespList] = useState<Response['data']>([])
    const throttled = useRef() as unknown as React.MutableRefObject<typeof fetcheDataFromMock>

    if (!throttled.current) {
        throttled.current = throttle(fetcheDataFromMock, thredhold) as mockFn
    }

    useEffect(() => {
        if (!searchStr.length || !throttled.current) {
            if (respList.length) {
                setRespList([])
            }

            return undefined
        }

        let didCancel = false

        const GW_URL = 'https://gw.kaola.com'
        const reqTime = searchStr.length === 3 ? 2000 : 100

        throttled?.current(GW_URL, searchStr, reqTime).then(({ success, code, data }) => {
            if (success && code === 200) {
                if (didCancel) {
                    console.log('slow response before must be cancelled')
                } else {
                    setRespList(data)
                }
            }
        })

        return () => {
            didCancel = true
        }
    }, [searchStr])

    const inputOnChangeHandler = ({ currentTarget: { value } }: React.FormEvent<HTMLInputElement>) => {
        setSearchStr(value)
    }

    return [respList, inputOnChangeHandler]
}
