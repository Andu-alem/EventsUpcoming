import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App.jsx'
import LandingPage from './components/LandingPage'
import ErrorPage from './components/ErrorPage'
import Main from './components/Main'
import Schedule from './components/Schedule'
import PostEvent from './components/PostEvent'

export default function MainApp() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="events" element={<App />}>
            <Route path="" element={<Main />} />
            <Route path="post-event" element={<PostEvent />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
    </BrowserRouter>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)
