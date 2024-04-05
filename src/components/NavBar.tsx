import { User } from "../models/user";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarLoggedOut from "./NavBarLoggedOut";

interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    return (
        <div>
            <h1>NavBar</h1>
            {loggedInUser
                ? <NavBarLoggedIn user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
            : <NavBarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
            }
        </div>
    );
}

export default NavBar;