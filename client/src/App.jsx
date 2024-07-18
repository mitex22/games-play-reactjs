import { Routes, Route } from "react-router-dom"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import GameList from "./components/game-list/GameList"
import GameCreate from "./components/game-create/GameCreate"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import GameDetails from "./components/game-details/GameDetails"

function App() {
	return (
		<>
			<div id="box">

				<Header />

				{/* <!-- Main Content --> */}
				<main id="main-content">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/games" element={<GameList />} />
						<Route path="/games/create" element={<GameCreate />} />
						<Route path="/games/:gameId" element={<GameDetails />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</main>
				
			</div>
		</>
	)
}

export default App
