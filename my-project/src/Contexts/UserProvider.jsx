import { useState } from "react"
import { UserContext } from "./User.context"


const UserProvider = ({children}) => {
    const [user, setUser]=useState(null)
  return (
    <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
  )
}

export default UserProvider