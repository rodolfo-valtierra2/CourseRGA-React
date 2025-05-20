import { createRoot } from 'react-dom/client'
import Greeter from './projects/ProjectsPage'
import './index.css'


createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <Greeter/>
)
