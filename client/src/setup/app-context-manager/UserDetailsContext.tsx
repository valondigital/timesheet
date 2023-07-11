import React, { createContext, useContext, useEffect, useState } from 'react';

const initialUserDetails = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    role: ''
} 
 
const UserDetailsContext =  createContext<{userDetails: Partial<IUserDetails>, updateUserDetails: (data: Partial<IUserDetails>) => void}>(null!);


export const UserDetailsProvider = ({ children } : {children: React.ReactNode}) => {
    const [userDetails, setUserDetails] = useState<Partial<IUserDetails>>(initialUserDetails)

    useEffect(() => {
        if(localStorage.user){
         setUserDetails(JSON.parse(localStorage.user))
        }
    }, [])

    const updateUserDetails = (data : Partial<IUserDetails>) => {
        setUserDetails(data);
    }

    return (
        <UserDetailsContext.Provider value={{ userDetails, updateUserDetails}}>
           {children}
        </UserDetailsContext.Provider>
    )
}


export const useUserDetailsContext = () => useContext(UserDetailsContext)