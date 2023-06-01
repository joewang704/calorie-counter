import type { NextPage } from "next";

import Daily from "components/Daily";
import { useUserContext } from "context/User";

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
  const { user, loading, signIn } = useUserContext();

  if (loading) {
    return <></>;
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
