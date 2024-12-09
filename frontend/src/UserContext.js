import { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import {data } from "autoprefixer"

export const UserContext = createContext();

export function UserContextProvider({children}) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(()=> {
        if (!user) {
            axios.get('/api/profile').then(({data}) => {
                setUser(data);
                setReady(true);
            }).catch((error) => {
                if (error.response && error.response.status === 401) {
                    console.error('User not authenticated');
                } else {
                    console.error('Failed to fetch user profile:', error);
                }
                setReady(true);
            });
        }
    }, [user]);
    return (
        <UserContext.Provider value={{user, setUser, ready}}>
            {children}
        </UserContext.Provider>
    );
}