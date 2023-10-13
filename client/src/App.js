import React, { useContext, useEffect } from 'react';
import { auth } from './firebaseConfig';
import { useAppContext } from './AppContext';
import Login from './login';  // 追加
import LoginForm from './LoginForm';
import LogoutButton from './LogoutButton';

function App() {
    const { user, setUser } = useAppContext();

    console.log("App's setUser:", setUser);  // この行を追加

    // Firebaseの認証状態が変わるたびにこのコールバックが実行される
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                // ユーザーがログインしている場合
                setUser(authUser);
            } else {
                // ユーザーがログアウトしている場合
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
                    <LogoutButton />
                </div>
            ) : (
                <div>
                    <p>ログインしていません</p>
                    <LoginForm />  {/* ログインコンポーネントを表示 */}
                </div>
            )}
        </div>
    );
}

export default App;