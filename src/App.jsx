import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import MainLayout from './layouts/MainLayout'
import Home from "./pages/Home"
import Search from "./pages/Search"
import Info from "./pages/Info"
import Watch from "./pages/Watch.jsx"
import PassingData from "./components/PassingData"
import LatestPage from "./pages/LatestPage"
import TrendingPage from "./pages/TrendingPage"
import PopularPage from "./pages/PopularPage"
import OngoingPage from "./pages/OngoingPage"
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {

    return (
        <>
            <Router>
                <Routes>
                    <Route element={<MainLayout />} > 
                        <Route path="/" element={<Home />} />
                        <Route path="/search/:query" element={<Search />} />
                        <Route path="/latest" element={<LatestPage />} />
                        <Route path="/trending" element={<TrendingPage />} />
                        <Route path="/popular" element={<PopularPage />} />
                        <Route path="/ongoing" element={<OngoingPage />} />
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
