import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import { Authenticate } from './pages/Authenticate'
import { Profile } from './pages/Profile/Profile'
import { Nav } from './components/Nav/Nav'
import { Header } from '/src/components/Header/Header'
import { Friends } from './pages/Friends/Friends'
import { MyPosts } from './pages/MyPosts/MyPosts'
import { LoadingContextProvider } from './context/LoaderContext'
import { ScreenContext } from './context/ScreenSizeContext'
function App() {
  
  const screenSize = ScreenContext()

  return (
    <AuthContextProvider>
      <LoadingContextProvider>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/auth' element={<Authenticate/>}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/friends' element={<Friends />}></Route>
            <Route path='/MyPosts' element={<MyPosts />}></Route>
          </Routes>
          {
            screenSize.width > 986 && <Nav />
          }
          
        </main>
      </LoadingContextProvider>
    </AuthContextProvider>
    
  )
}

export default App
