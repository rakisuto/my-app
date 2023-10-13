import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { firestore } from './firebaseConfig';

function SignupForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [icon, setIcon] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(firestore, 'users', user.uid), {
                username: username,
                email: email,
                //iconも
            });

            console.log("新規アカウント作成成功:", user);
        } catch (error) {
            console.error("アカウント作成エラー:", error);
        }
    };

    return (
        <div>
            <h2>サインアップ</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
                </div>
                <div>
                    <label>Password: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></label>
                </div>
                <div>
                    <label>Username: <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /></label>
                </div>
                {/* アイコンのアップロードフィールド（後で実装） */}
                <div>
                    <label>Icon: <input type="file" onChange={(e) => setIcon(e.target.files[0])} /></label>
                </div>
                <button type="submit">サインアップ</button>
            </form>
        </div>
    );
}

export default SignupForm;
