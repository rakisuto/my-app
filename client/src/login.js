import React, { useState } from 'react';
import SignupForm from './SignupForm';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSignupForm, setShowSignupForm] = useState(false);

    const handleLogin = () => {
        // TODO: Firebase Authenticationと連携する処理を書く
        console.log('Logged in:', email, password);
    };

    return (
        <div>
            {showSignupForm ? (
                <SignupForm />
            ) : (
                <>
                    <h2>Login</h2>
                    <div>
                        <label>Email: </label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div>
                        <label>Password: </label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button onClick={handleLogin}>Login</button>
                    <button onClick={() => setShowSignupForm(true)}>Sign up</button>
                </>
            )}
        </div>
    );
};

export default Login;
