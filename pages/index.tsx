import type { NextPage } from "next";
import { getAuth, GoogleAuthProvider, User, signInWithPopup } from "firebase/auth";

import Daily from "components/Daily";
import { app } from "utils/db";
import { useState } from "react";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const GoogleSignInButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button className="flex items-center p-2" style={{
      fontFamily: 'Roboto,Helvetica,Arial,sans-serif', fontWeight: 500, color: '#757575', fontSize: '14px',
      boxShadow: '0 2px 2px 0 rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.2), 0 1px 5px 0 rgba(0,0,0,.12)',
    }} onClick={onClick}>
      <img className="w-6 mr-2" alt="" src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"></img>
      Sign in with Google
    </button>
  );
}

const Home: NextPage = () => {
  const [user, setUser] = useState<User | undefined>();

  const signIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential!.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // TODO: display error
        console.error(errorMessage);
      });
  }

  return (
    <div className="font-sans">
      <div className="m-8">
        {user ? <Daily /> : <GoogleSignInButton onClick={signIn} />}
      </div>
    </div>
  );
};

export default Home;
