import React, { useContext } from 'react';
import { auth } from './firebaseConfig';
import { useAppContext } from './AppContext';

function LogoutButton() {
    const { setUser } = useAppContext();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            setUser(null);
            console.log("ログアウト成功");
        } catch (error) {
            console.error("ログアウトエラー:", error);
        }
    };

    return <button onClick={handleLogout}>ログアウト</button>;
}

export default LogoutButton;
