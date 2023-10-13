import React, { useState, useEffect } from 'react';
import { useAppContext } from './AppContext';
import { firestore as db } from './firebaseConfig';
import { doc, getDoc, onSnapshot } from '@firebase/firestore';

function Profile() {
    const { user } = useAppContext();
    const [userData, setUserData] = useState(null);
    const [userProfileData, setUserProfileData] = useState(null);


    useEffect(() => {
        if (!user || !user.uid) return;  // ここでユーザーの存在とuidの存在を確認

        const docRef = doc(db, "users", user.uid);
        const unsubscribe = onSnapshot(docRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                setUserProfileData(docSnapshot.data());
            } else {
                console.error("ユーザーデータが存在しません:", user.uid);
            }
        });

        return () => unsubscribe();
    }, [user]); // 依存配列に user を追加


    if (!user) return <p>ログインしてください。</p>;

    return (
        <div>
            <h2>プロファイル</h2>
            <p>メール: {user.email}</p>
            <p>ユーザ名：{userProfileData?.username}</p>
            {userProfileData?.iconURL && <img src={userProfileData.iconURL} alt="ユーザーアイコン" />}
        </div>
    );
}

export default Profile;
