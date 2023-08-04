import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from "./pages/Home"
import Search from "./pages/Search"
import Info from "./pages/Info"
import Watch from "./pages/Watch.jsx"
import PassingData from "./components/PassingData"
import LatestPage from "./pages/LatestPage"
import PopularPage from "./pages/PopularPage"
import NewSeason from "./pages/NewSeason"
import 'react-lazy-load-image-component/src/effects/blur.css';
import DMCA from "./pages/DMCA"
import Terms from "./pages/Terms"

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<MainLayout />} > 
                        <Route path="/" element={<Home />} />
                        <Route path="/dmca" element={<DMCA />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/search/:query" element={<Search />} />
                        <Route path="/latest" element={<LatestPage />} />
                        <Route path="/popular" element={<PopularPage />} />
                        <Route path="/new-season" element={<NewSeason />} />
                        <Route path="/info/:id" element={<Info />} />
                        <Route path="/watch/:id/:episode/:episodeId" element={<Watch />} />
                        <Route path="/pass/:id/:epNum" element={<PassingData />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Route>
                </Routes>
            </Router>
        </>
    )
}

export default App
