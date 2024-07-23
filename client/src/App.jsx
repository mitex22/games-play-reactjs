import { Routes, Route } from "react-router-dom"

import { AuthProvider } from "./contexts/authContext"
import PATH from "./paths/paths"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Register from "./components/register/Register"
import Login from "./components/login/Login"
import GameList from "./components/game-list/GameList"
import GameCreate from "./components/game-create/GameCreate"
import GameDetails from "./components/game-details/GameDetails"
import GameEdit from "./components/game-edit/GameEdit"
import Logout from "./components/logout/Logout"

function App() {
	return (
		<>
			<AuthProvider>
				<div id="box">

					<Header />

					{/* <!-- Main Content --> */}
					<main id="main-content">
						<Routes>
							<Route path={PATH.HOME} element={<Home />} />
							<Route path="/games" element={<GameList />} />
							<Route path="/games/create" element={<GameCreate />} />
							<Route path="/games/:gameId" element={<GameDetails />} />
							<Route path={PATH.GAME_EDIT} element={<GameEdit />} />
							<Route path="/login" element={<Login />} />
							<Route path="/register" element={<Register />} />
							<Route path={PATH.LOGOUT} element={<Logout />} />
						</Routes>
					</main>

				</div>
			</AuthProvider>
		</>
	)
}

export default App;
