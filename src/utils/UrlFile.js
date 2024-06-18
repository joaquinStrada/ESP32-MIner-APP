import { Buffer } from 'buffer'

const UrlFile = res => {
    const base64 = Buffer.from(res.data, 'binary').toString('base64')

    return `data:${res.headers['content-type']};base64,${base64}`
}

export default UrlFile