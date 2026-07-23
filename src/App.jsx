import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoute from './auth/AdminRoute.jsx'
import AuthProvider from './auth/AuthProvider.jsx'
import Header from './components/Header.jsx'
import ActivityWrite from './pages/ActivityWrite.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import Apply from './pages/Apply.jsx'
import ClubRegister from './pages/ClubRegister.jsx'
import Gallery from './pages/Gallery.jsx'
import Home from './pages/Home.jsx'
import Introduce from './pages/Introduce.jsx'
import List from './pages/List.jsx'
import GlobalStyles from './styles/GlobalStyles.jsx'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <GlobalStyles />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/list" element={<List />} />
          <Route path="/introduce/:clubId" element={<Introduce />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/register"
            element={
              <AdminRoute>
                <ClubRegister />
              </AdminRoute>
            }
          />
          <Route
            path="/register/:clubId/edit"
            element={
              <AdminRoute>
                <ClubRegister />
              </AdminRoute>
            }
          />
          <Route
            path="/activity/write"
            element={
              <AdminRoute>
                <ActivityWrite />
              </AdminRoute>
            }
          />
          <Route
            path="/activity/:activityId/edit"
            element={
              <AdminRoute>
                <ActivityWrite />
              </AdminRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
