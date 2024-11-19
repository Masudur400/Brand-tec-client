import { createContext, useEffect } from "react";
import app from "../../firebase/firebase.config";
import PropTypes from 'prop-types'
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import useAxiosPublic from "../Hooks/useAxiosPublic";




export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider()
    const axiosPublic = useAxiosPublic()



    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            if(currentUser){
                const userInfo ={email: currentUser?.email}
                axiosPublic.post('/jwt', userInfo)
                .then(res =>{
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                setLoading(false)
            }
            setUser(currentUser)
            setLoading(false)
       
    })
        return () =>{
            unSubscribe()
        }
    }, [axiosPublic])


    const userinfo = {
        user,
        loading,
        createUser,
        login,
        googleLogin,
        logOut,
        setLoading
    }

    return (
        <AuthContext.Provider value={userinfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
}

export default AuthProvider;