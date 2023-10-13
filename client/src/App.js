import React, { useContext, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { useAppContext } from './AppContext';
import Login from './login';  // 追加
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import SignupForm from './SignupForm';
import ProfileEdit from './ProfileEdit';

function App() {
    console.log('App component rendered');  // この行を追加
    const { user, setUser } = useAppContext();

    console.log("App's setUser:", user);  // この行を追加

    // Firebaseの認証状態が変わるたびにこのコールバックが実行される
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log('authUser:', authUser);  // この行を追加
            if (authUser) {
                // ユーザーがログインしている場合
                console.log("Firebase detected user login:", authUser);
                setUser(authUser);
            } else {
                // ユーザーがログアウトしている場合
                console.log("Firebase detected user logout or no user.");
                setUser(null);
            }
        });

        // クリーンアップ関数: コンポーネントがアンマウントされる時に呼ばれる
        return () => {
            unsubscribe();
        };
    }, [setUser]);

    const handleLogout = async () => {
        try {
            await auth.signOut();
            alert("ログアウトしました");
        } catch (error) {
            alert("ログアウトに失敗しました:", error);
        }
    };

    return (
        <div>
            {user ? (
                <div>
                    <p>ログインしています: {user.email}</p>
                    <Profile /> {/* プロファイルコンポーネントを表示 */}
                    <ProfileEdit /> {/* プロファイル編集コンポーネントを表示 */}
                    <LogoutButton />
                </div>
            ) : (
                <div>
                    <p>ログインしていません</p>
                    <LoginForm />  {/* ログインコンポーネントを表示 */}
                    <SignupForm />
                </div>
            )}
        </div>
    );
}

export default App;