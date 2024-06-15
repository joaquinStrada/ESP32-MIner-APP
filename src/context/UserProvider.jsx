import { createContext, useState, useEffect } from 'react'
import { ApiUser } from '../utils/api'

export const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [AccessToken, setAccessToken] = useState(null)
  const [RefreshToken, setRefreshToken] = useState(null)
  const [ExpiresInRefreshToken, setExpiresInRefreshToken] = useState(null)
  const [ExpiresInAccessToken, setExpiresInAccessToken] = useState(null)

  const updateAccessToken = async () => {
    if (new Date().getTime() > ExpiresInRefreshToken) return
    
    try {
      const { data } = await ApiUser.get('/refresh', {
        headers: {
          Authorization: `Bearer ${RefreshToken}`
        }
      })

      if (data.error) return

      // Actualizamos los datos
      const { accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken } = data.data

      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      setExpiresInRefreshToken(expiresInRefreshToken + new Date().getTime() - 500)
      setExpiresInAccessToken(expiresInAccessToken + new Date().getTime() - 500)

      // Actualizamos el local storage en caso de estar habilitado
      if (window.localStorage.getItem('refreshToken')) {
        const tokenStorage = {
          refreshToken,
          expiresIn: new Date().getTime() + expiresInRefreshToken - 500
        }

        window.localStorage.setItem('refreshToken', JSON.stringify(tokenStorage))
      }
    } catch (err) {
      console.error(err)
    }
  }

  const login = (accessToken, refreshToken, expiresInAccessToken, expiresInRefreshToken, remember) => {
    const storageToken = {
      refreshToken,
      expiresIn: new Date().getTime() + expiresInRefreshToken - 500
    }

    if (remember) {
      window.localStorage.setItem('refreshToken', JSON.stringify(storageToken))
    } else {
      window.sessionStorage.setItem('refreshToken', JSON.stringify(storageToken))
    }

    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
    setExpiresInRefreshToken(expiresInRefreshToken + new Date().getTime() - 500)
    setExpiresInAccessToken(expiresInAccessToken + new Date().getTime() - 500)
  }

  const getRefreshToken = () => {
    const refreshToken = window.localStorage.getItem('refreshToken') || window.sessionStorage.getItem('refreshToken')
    // Validamos que el token exista
    if (!refreshToken) return

    // Validamos que el token no haya expirado
    const dataToken = JSON.parse(refreshToken)

    if (new Date().getTime() > dataToken.expiresIn) return

    // Seteamos el nuevo token
    setRefreshToken(dataToken.refreshToken)
    setExpiresInRefreshToken(dataToken.expiresIn)
  }

  useEffect(() => {
    if (RefreshToken === null) {
      getRefreshToken()
    } else if (RefreshToken && ExpiresInRefreshToken && ExpiresInAccessToken === null) {
      updateAccessToken()
    } else {
      setTimeout(updateAccessToken, ExpiresInAccessToken - new Date().getTime())
    }
  })

  
  return (
    <UserContext.Provider value={{ AccessToken, login }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider