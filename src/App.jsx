import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from "./pages/Home"
import About from "./pages/About"
import Info from "./pages/Info"
import Watch from "./pages/Watch.jsx"
import PassingData from "./components/PassingData"
import LatestPage from "./pages/LatestPage"

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<MainLayout />} > 
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/latest" element={<LatestPage />} />
                        <Route path="/info/:id" element={<Info />} />
                        <Route path="/watch/:id/:episodeId" element={<Watch />} />
                        <Route path="/pass/:id/:epNum" element={<PassingData />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
