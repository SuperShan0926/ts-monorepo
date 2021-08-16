/** @format */

export function throttle<T extends (...args: any[]) => any, U extends { leading?: boolean; tailing?: boolean }>(
    fn: T,
    wait: number = 50,
    options?: U
): (...args: Parameters<T>) => ReturnType<T> | null {
    const opt = { leading: true, tailing: true, ...options }

    let res: ReturnType<T> | null = null
    let timerId: NodeJS.Timeout | null
    let lastCallTime = 0

    const getNow = () => Date.now()

    return function throttled(...args: any[]) {
        const now = getNow()

        if (!opt.leading && lastCallTime === 0) {
            lastCallTime = now
        }

        if (now - lastCallTime >= wait || now - lastCallTime < 0) {
            res = fn(...args)
            lastCallTime = now
        } else if (!timerId && opt.tailing) {
            timerId = setTimeout(() => {
                res = fn(...args)
                if (timerId) {
                    clearTimeout(timerId)
                    timerId = null
                }
                lastCallTime = getNow()
            }, wait - now + lastCallTime)
        }

        return res
    }
}
