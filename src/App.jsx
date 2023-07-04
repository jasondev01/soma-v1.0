import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from "./pages/Home"
import About from "./pages/About"
import Info from "./pages/Info"
import Watch from "./pages/Watch"
import PassingData from "./components/PassingData"

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<MainLayout />} > 
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/info/:id" element={<Info />} />
                        <Route path="/watch/:id/:episodeID" element={<Watch />} />
                        <Route path="/pass/:id/:epNum" element={<PassingData />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
