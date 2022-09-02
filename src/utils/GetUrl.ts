/* eslint-disable no-console */
function getURL() {
  const localUrl = 'http://localhost:3000'

  const url =
    process?.env?.NEXT_PUBLIC_URL && process.env.NEXT_PUBLIC_URL !== ''
      ? process.env.NEXT_PUBLIC_URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL &&
        process.env.NEXT_PUBLIC_VERCEL_URL !== ''
      ? process.env.NEXT_PUBLIC_VERCEL_URL
      : localUrl

  return url.includes('http') ? url : `https://${url}`
}

export default getURL
