import { Routes, Route, useNavigate } from "react-router-dom"
import { useState } from "react"

import * as authAPI from "./api/auth-api"
import AuthContext from "./contexts/authContext"
import PATH from "./paths/paths"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import GameList from "./components/game-list/GameList"
import GameCreate from "./components/game-create/GameCreate"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import GameDetails from "./components/game-details/GameDetails"
import Logout from "./components/logout/Logout"

function App() {
	const navigate = useNavigate();

	const [auth, setAuth] = useState(() => {
		localStorage.removeItem('accessToken');

		return {};
	});

	const loginSubmitHandler = async (values) => {
		const result = await authAPI.login(values.email, values.password);

		setAuth(result);

		localStorage.setItem('accessToken', result.accessToken);

		navigate(PATH.HOME);
	}

	const registerSubmitHandler = async (values) => {
		const result = await authAPI.register(values.email, values.password);

		setAuth(result);

		localStorage.setItem('accessToken', result.accessToken);

		navigate(PATH.HOME);
	}

	const logoutHandler = () => {
		setAuth({});

		localStorage.removeItem('accessToken');

		navigate(PATH.HOME);
	}

	const values = {
		loginSubmitHandler,
		registerSubmitHandler,
		logoutHandler,
		username: auth.username || auth.email,
		email: auth.email,
		// double negation - if truthy value cast to TRUE
		// double negation - if falsy value cast to FALSE
		isAuthenticated: !!auth.email,
	};

	return (
		<>
			<AuthContext.Provider value={values}>
				<div id="box">

					<Header />

					{/* <!-- Main Content --> */}
					<main id="main-content">
						<Routes>
							<Route path={PATH.HOME} element={<Home />} />
							<Route path="/games" element={<GameList />} />
							<Route path="/games/create" element={<GameCreate />} />
							<Route path="/games/:gameId" element={<GameDetails />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path={PATH.LOGOUT} element={<Logout />} />
						</Routes>
					</main>

				</div>
			</AuthContext.Provider>
		</>
	)
}

export default App
