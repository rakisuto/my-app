import React, { useState, useContext } from 'react';
import { auth } from './firebaseConfig';
import { useAppContext } from './AppContext';
import { signInWithEmailAndPassword } from 'firebase/auth';


function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useAppContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            setUser(user);
            console.log("ログイン成功:", user);
        } catch (error) {
            console.error("ログインエラー:", error);
        }
    };

    return (
        <div>
            <h2>ログイン</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                </div>
                <div>
                    <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                </div>
                <button type="submit">ログイン</button>
            </form>
        </div>
    );
}

export default LoginForm;
