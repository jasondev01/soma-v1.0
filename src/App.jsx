import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from "./pages/Home"
import About from "./pages/About"
import Info from "./pages/Info"
import Episode from "./pages/Episode"

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<MainLayout />} > 
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/info/:id" element={<Info />} />
                        <Route path="/episode/:id/:episodeID/" element={<Episode />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
