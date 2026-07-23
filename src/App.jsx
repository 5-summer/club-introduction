import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header.jsx'
import Apply from './pages/Apply.jsx'
import Gallery from './pages/Gallery.jsx'
import Home from './pages/Home.jsx'
import Introduce from './pages/Introduce.jsx'
import List from './pages/List.jsx'
import GlobalStyles from './styles/GlobalStyles.jsx'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/list" element={<List />} />
        <Route path="/introduce" element={<Introduce />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/apply" element={<Apply />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
