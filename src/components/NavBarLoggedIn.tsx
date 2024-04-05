import { User } from "../models/user";
import * as UsersApi from "../network/users_api";

interface NavBarLoggedInProps {
    user: User,
    onLogoutSuccessful: () => void,
}

const NavBarLoggedIn = ({ user, onLogoutSuccessful }: NavBarLoggedInProps) => {

    async function logout() {
        try {
            await UsersApi.logout();
            onLogoutSuccessful();
        } catch (error) {
            console.log(error);
            alert(error);
        }
    }

    return (
        <div>
            <h1>Signed in as: {user.username}</h1>
            <button onClick={logout}>Log out</button>
        </div>
    )
}

export default NavBarLoggedIn