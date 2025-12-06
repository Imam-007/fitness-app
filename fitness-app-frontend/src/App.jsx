import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router'
import { Box, Button, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from 'react-oauth2-code-pkce'
import { useDispatch } from 'react-redux'
import { setCredential } from './store/authSlice'
import ActivityForm from './components/ActivityForm'
import ActivityList from './components/ActivityList'
import ActivityDetails from './components/ActivityDetails'

const ActivityPage = () => {
  return (
    <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
      <ActivityForm onActivitiesAdded={() => window.Location.reload()} />
      <ActivityList />
    </Box>
  )
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext)
  const dispatch = useDispatch()
  const [authReady, setAuthReady] = useState(false)

  useEffect(() => {
    if (token) {
      dispatch(setCredential({ token, user: tokenData }))
      setAuthReady
    }
  }, [token, tokenData, dispatch])

  return (
    <Router>
      {!token ? (
        <Box
          sx={{
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom>
            Welcome to the Fitness Tracker App
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 3 }}>
            Please login to access your activities
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => {
              logIn()
            }}
          >
            LOGIN
          </Button>
        </Box>
      ) : (
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
          <Button variant="contained" color="secondary" onClick={logOut}>
            Logout
          </Button>
          <Routes>
            <Route path="/activities" element={<ActivityPage />} />
            <Route path="/activities/:id" element={<ActivityDetails />} />

            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/activities" replace />
                ) : (
                  <div> Welcome! Please Login </div>
                )
              }
            />
          </Routes>
        </Box>
      )}
    </Router>
  )
}

export default App
