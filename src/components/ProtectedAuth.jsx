import { useContext } from "react"
import { UserContext } from "../context/UserProvider"

const ProtectedAuth = ({ children }) => {
    const { IsLogged } = useContext(UserContext)

    if (IsLogged === false) {
        window.location.href = '/login'
    }

    return children
}

export default ProtectedAuth