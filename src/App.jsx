import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import { Authenticate } from './pages/Authenticate'
import { MyProfile } from './pages/MyProfile/MyProfile' 
import { Profile } from './pages/Profile/Profile'
import { Nav } from './components/Nav/Nav'
import { Header } from '/src/components/Header/Header'
function App() {
  return (
    <AuthContextProvider>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/auth' element={<Authenticate/>}></Route>
          <Route path='/MyProfile' element={<MyProfile />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
        <Nav />
      </main>
    </AuthContextProvider>
    
  )
}

export default App
