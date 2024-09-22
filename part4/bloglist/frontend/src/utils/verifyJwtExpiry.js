import { jwtDecode } from 'jwt-decode'

export const isJwtExpired = (token) => {
  if (!token) {
    return true
  }
  try {
    const decoded = jwtDecode(token)
    const now = Date.now() / 1000
    return decoded.exp < now
  } catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
}