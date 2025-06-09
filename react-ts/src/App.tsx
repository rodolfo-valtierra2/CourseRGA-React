import ProjectsPage from './projects/ProjectsPage.tsx'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import HomePage from './Home/HomePage.tsx';
import ProjectPage from './projects/ProjectPage.tsx'
import NewProject from './projects/NewProject.tsx'
import { Provider } from './SessionContext'
import LogIn from './LogIn'
import NavBar from "./Content/NavBar";
import Header  from './Content/Header.tsx';

function App() {

	return <BrowserRouter>
		<Provider>
			<Header/>
			<div className="container">
				<NavBar/>
				<LogIn>
						<Route path="/" element={<HomePage />} />
						<Route path="/projects" element={<ProjectsPage />} />
						<Route path="/projects/:id" element={<ProjectPage />} />
						<Route path="/NewProject" element={<NewProject />} />
						<Route path="/*" element={<Navigate to="/" replace />} />
				</LogIn>
			</div>
		</Provider>
	</BrowserRouter>
}

export default App
