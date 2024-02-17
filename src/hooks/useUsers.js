import axios from 'axios';
import { useEffect, useState } from 'react';

function useUsers() {
    const [users, setUsers] = useState([]);
    const [randomNum, setRandomNum] = useState(4);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_BASE_URL}/users`).then(response => setUsers(response.data.users));
        setRandomNum(Math.floor(Math.random() * 30));
    }, []);

    let user = users[randomNum];
    let userObj = { username: '', password: '' };
    if (user) {
        userObj.username = user.username;
        userObj.password = user.password;
    }
    return userObj;
}

export default useUsers;