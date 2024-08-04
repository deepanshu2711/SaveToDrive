import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "@/lib/firebase";

// Initialize the Google provider
const provider = new GoogleAuthProvider();

// Function to handle Google sign-in/sign-up
export const handleGoogleAuth = async () => {
    const auth = getAuth(app);
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        return { user, token, success: true };
    } catch (error: Error | any) {
        const errorMessage = error.message;
        return { errorMessage, success: false };
    }
};
