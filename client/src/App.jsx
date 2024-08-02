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
import RouteGuard from "./components/common/RouteGuard"

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
							<Route path={PATH.REGISTER} element={<Register />} />
							<Route path={PATH.LOGIN} element={<Login />} />
							<Route path={PATH.GAMES} element={<GameList />} />
							<Route path={PATH.GAME_DETAILS} element={<GameDetails />} />
							<Route element={<RouteGuard />}>
								<Route path={PATH.GAME_CREATE} element={<GameCreate />} />
								<Route path={PATH.GAME_EDIT} element={<GameEdit />} />
								<Route path={PATH.LOGOUT} element={<Logout />} />
							</Route>
						</Routes>
					</main>

				</div>
			</AuthProvider>
		</>
	)
}

export default App;
