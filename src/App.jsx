import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { AuthContextProvider } from './context/AuthContext'
import { Authenticate } from './pages/Authenticate'
import { Profile } from './pages/Profile/Profile'
import { Nav } from './components/Nav/Nav'
import { Header } from '/src/components/Header/Header'
import { Friends } from './pages/Friends/Friends'
import { MyNotes } from './pages/MyNotes/MyNotes'
import { LoadingContextProvider } from './context/LoaderContext'
import { ScreenContext } from './context/ScreenSizeContext'
import {QueryClient,
  QueryClientProvider,
} from 'react-query'
function App() {

// Create a client
const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 30000 }}
})
  
const screenSize = ScreenContext()

return (
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <LoadingContextProvider>
        <Header />
        <main>
          <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/auth' element={<Authenticate/>}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/friends' element={<Friends />}></Route>
            <Route path='/MyPosts' element={<MyNotes />}></Route>
          </Routes>
          {
            screenSize.width > 986 && <Nav />
          }
          
        </main>
      </LoadingContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>
)
}

export default App
