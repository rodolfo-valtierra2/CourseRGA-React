import ProjectsPage from './projects/ProjectsPage.tsx'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router';
import HomePage from './Home/HomePage.tsx';
import ProjectPage from './projects/ProjectPage.tsx'
import NewProject from './projects/NewProject.tsx'
import { useState } from 'react';
import {Provider} from './SessionContext'
import LogIn from './LogIn'

function App() {
	const [user, setUser] = useState({});

	return <BrowserRouter>
		<header className="sticky">
			<Provider value={{user, setUser}}>
				<span className="logo">
					<img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
				</span>
				<div className="container">
					<Routes>
						<LogIn>
							<Route path="/" element={<HomePage />} />
							<Route path="/projects" element={<ProjectsPage />} />
							<Route path="/projects/:id" element={<ProjectPage />} />
							<Route path="/NewProject" element={<NewProject />} />
						</LogIn>
					</Routes>
				</div>
			</Provider>
		</header>
	</BrowserRouter>
}

export default App
