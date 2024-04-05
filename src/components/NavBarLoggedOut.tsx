interface NavBarLoggedOutProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOut = ({ onSignUpClicked, onLoginClicked}: NavBarLoggedOutProps) => {
  return (
    <div>
        <button onClick={onSignUpClicked}>Sign up</button>
        <button onClick={onLoginClicked}>Log in</button>
    </div>
  )
}

export default NavBarLoggedOut