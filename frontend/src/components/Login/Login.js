import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import { auth, provider } from '../../firebase';
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router-dom';

function Login() {
    const [state, dispatch] = useStateValue();
    const history = useHistory();
    const signIn = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                dispatch({
                    type: "SET_USER",
                    user: {
                        name: result.user.displayName,
                        image: result.user.photoURL
                    },
                });
                history.push("/")
            })
            .catch(err => alert(err.message))
    };
    return (
        <div className="login">
            <Button onClick={signIn}>Login with Google</Button>
        </div>
    )
}

export default Login
