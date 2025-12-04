import { BrowserRouter as Router , Navigate, Route, Routes, useLocation} from 'react-router'
// import './App.css'
import { Box, Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredential } from './store/authSlice'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import ActivityDetails from './components/ActivityDetails'

const ActivityPage = () => {
  return(
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivitiesAdded = {() => window.Location.reload()} />
      <ActivityList />
    </Box>
  )
}

function App() {

  const {token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext)
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(setCredential({token, user: tokenData}));
      setAuthReady
    }

  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
          <Button variant='contained' color='#dc004e'
        onClick = {() =>{
          logIn();
        }}
        >Login</Button> 
      ) : (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Routes>
            <Route path='/activities' element={<ActivityPage />}/>
            <Route path='/activities/:id' element={<ActivityDetails />}/>

            <Route path='/' element={token ? <Navigate to="/activities" replace /> :<div> Welcome! Please Login </div>} />
          </Routes>
        </Box>
      )}
    </Router>
  )
}

export default App
