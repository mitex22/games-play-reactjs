import { Routes, Route } from "react-router-dom"
import { useState } from "react"

import Header from "./components/header/Header"
import Home from "./components/home/Home"
import GameList from "./components/game-list/GameList"
import GameCreate from "./components/game-create/GameCreate"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import GameDetails from "./components/game-details/GameDetails"

function App() {

	const [auth, setAuth] = useState({});

	const loginSubmitHandler = (values) => {
		console.log(values);
	}

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
						<Route path="/login" element={<Login loginSubmitHandler={loginSubmitHandler} />} />
						<Route path="/register" element={<Register />} />
					</Routes>
				</main>
				
			</div>
		</>
	)
}

export default App
