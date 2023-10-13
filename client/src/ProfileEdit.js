import React, { useState, useContext } from 'react';
import { useAppContext } from './AppContext';
import { firestore, storage } from './firebaseConfig';
import { updateEmail } from '@firebase/auth';
import { collection, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



function ProfileEdit() {
    const { user } = useAppContext();
    const [userEmail, setUserEmail] = useState(user?.email || "");
    const [username, setUsername] = useState(user?.username || "");
    const [icon, setIcon] = useState(null);

    if (!user) return <p>ログインしてください。</p>;

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // アイコンのアップロード
            if (icon) {
                const storageRef = ref(storage, 'user_icons/' + user.uid);
                await uploadBytes(storageRef, icon);
                const iconURL = await getDownloadURL(storageRef);

                // FirestoreにアイコンのURLを保存
                const userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, {
                    username: username,
                    email: userEmail,
                    iconURL: iconURL  // この行を追加
                });
            } else {
                // アイコン以外の情報を更新
                const userRef = doc(firestore, "users", user.uid);
                await updateDoc(userRef, {
                    username: username,
                    email: userEmail
                });
            }

            // Firebase Authenticationのメールアドレスを更新
            await updateEmail(user, userEmail);

            alert("プロファイルを更新しました！");
        } catch (error) {
            console.error("プロファイルの更新に失敗しました:", error);
        }
    };


    return (
        <div>
            <h2>プロファイルを編集する</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メール: </label>
                    <input type="text" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} />
                </div>
                <div>
                    <label>ユーザ名: </label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label>アイコン: </label>
                    <input type="file" onChange={(e) => setIcon(e.target.files[0])} />
                </div>
                <button type="submit">更新</button>
            </form>
        </div>
    );
}

export default ProfileEdit;
