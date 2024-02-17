import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function useIsLogin() {
    const isLogin = useSelector(state => state.login.value);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLogin) {
            navigate("/");
        }
    }, [isLogin]);
}

export default useIsLogin;