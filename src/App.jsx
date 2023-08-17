import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Loader } from '/src/components/Loader/Loader.jsx'
import { AuthContextProvider } from './context/AuthContext'
import { Authenticate } from './pages/Authenticate'
import { MyProfile } from './pages/MyProfile/MyProfile' 
import { Profile } from './pages/Profile/Profile'
import { Nav } from './components/Nav/Nav'
import { Header } from '/src/components/Header/Header'
import { LoadingContext } from '/src/context/LoaderContext.jsx'
import { useState } from 'react'
function App() {
  const [isLoading, setLoading] = useState(false)

  return (
    <AuthContextProvider>
      
      <LoadingContext.Provider value={{isLoading, setLoading}}>
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
        {isLoading && <Loader />}
      </LoadingContext.Provider>
      
    </AuthContextProvider>
    
  )
}

export default App
