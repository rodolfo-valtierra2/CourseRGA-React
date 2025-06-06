import ProjectsPage from './projects/ProjectsPage.tsx'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import HomePage from './Home/HomePage.tsx';
import ProjectPage from './projects/ProjectPage.tsx'
import NewProject from './projects/NewProject.tsx'
import { Provider } from './SessionContext'
import LogIn from './LogIn'
import NavBar from "./Content/NavBar";

function App() {

	return <BrowserRouter>
		<Provider>
			<header className="sticky">
				<span className="logo">
					<img src="/assets/logo-3.svg" alt="logo" width="49" height="99" />
				</span>
			</header>
			<div className="container">
				<LogIn>
						<NavBar/>
						<Route path="/" element={<HomePage />} />
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/projects/:id" element={<ProjectPage />} />
						<Route path="/NewProject" element={<NewProject />} />
						<Route path="*" element={<Navigate to="/" replace />} />
				</LogIn>
			</div>
		</Provider>
	</BrowserRouter>
}

export default App
