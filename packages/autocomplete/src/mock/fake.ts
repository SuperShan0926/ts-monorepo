/** @format */

type Response = {
    success: boolean
    code: number
    data: Array<{ res: string; id: number }>
}

type mockFn = (url: string, data: string, timeout: number) => Promise<Response>

export const fetcheDataFromMock: mockFn = (url, str, timeout) => {
    const data = Array.from(new Array(3), (_, index) => ({
        res: str.concat(`_${str.length}_${(Math.random() * 10000).toFixed(0)}`),
        id: index,
    }))

    return new Promise(r => {
        setTimeout(() => {
            r({
                success: true,
                code: 200,
                data,
            })
        }, timeout)
    })
}

export type { Response, mockFn }
