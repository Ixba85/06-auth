import { logout, registerUser, loginUser, loginWithGoogle } from "./auth";


export const server = {
    //actions 
    registerUser,
    logout,
    loginUser,
    loginWithGoogle,
}