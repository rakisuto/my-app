import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    user: null,
    setUser: () => { },
    userTeams: [],
    setUserTeams: () => { },
    teams: [],
    setTeams: () => { }
});

export const AppProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({ email: null, uid: null });
    const [userTeams, setUserTeams] = useState([]);
    const [teams, setTeams] = useState([]);

    console.log("AppProvider's setUser:", setUser);  // この行を追加

    return (
        <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, userTeams, setUserTeams, teams, setTeams }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider");
    }
    return context;
};
