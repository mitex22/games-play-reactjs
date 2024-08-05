import { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/authContext';
import PATH from '../../paths/paths';

const Header = () => {

    const {
        isAuthenticated,
        username
    } = useContext(AuthContext);

    return (
        <header>
            {/* <!-- Navigation --> */}
            <h1><Link className="home" to={PATH.HOME}>GamesPlay</Link></h1>
            <nav>
                <Link to={PATH.GAMES}>All games</Link>

                {/* <!-- Logged-in users --> */}
                {isAuthenticated && (
                    <div id="user">
                        <Link to={PATH.GAME_CREATE}>Create Game</Link>
                        <Link to={PATH.GAME_PORTFOLIO}>My Portfolio</Link>
                        <Link to={PATH.LOGOUT}>Logout</Link>
                        <span>| Welcome, {username}</span>
                    </div>
                )}

                {/* <!-- Guest users --> */}
                {!isAuthenticated && (
                    <div id="guest">
                        <Link to={PATH.LOGIN}>Login</Link>
                        <Link to={PATH.REGISTER}>Register</Link>
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header