import SignUpModal from './components/SignUpModal';
import LoginModal from './components/LoginModal';
import NavBar from './components/NavBar';
import { useState, useEffect } from 'react';
import { User } from './models/user';
import * as UsersApi from "./network/users_api";
import NotesPageLoggedIn from './components/NotesPageLoggedIn';
import NotesPageLoggedOut from './components/NotesPageLoggedOut';

function App() {

  const [loggedInUser, setLoggedInUser] = useState<User|null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoggedInUser() {
      try {
        const user = await UsersApi.getLoggedInUser();
        setLoggedInUser(user);
      } catch (error) {
        console.log(error);
      }
    }
    fetchLoggedInUser();
  }, [])

  const handleCloseSignUpModal = () => {
    setShowSignUpModal(false);
  }

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  }

  return (
    <>
      <h1>Krucks</h1>

      <NavBar
        loggedInUser={loggedInUser}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignUpClicked={() => setShowSignUpModal(true)}
        onLogoutSuccessful={() => setLoggedInUser(null)}
      />

      {loggedInUser
        ? <NotesPageLoggedIn />
        : <NotesPageLoggedOut />
      }

      {showSignUpModal &&
        <SignUpModal
          onClose={() => handleCloseSignUpModal()}
          onSignUpSuccessful={(user) => {
          setLoggedInUser(user);
          setShowSignUpModal(false);         
          }}
        />
      }

      {showLoginModal &&
        <LoginModal
          onClose={() => handleCloseLoginModal()}
          onLoginSuccessful={(user) => {
          setLoggedInUser(user);
          setShowLoginModal(false);
          }}
        />
      }
    </>
  )
}

export default App
