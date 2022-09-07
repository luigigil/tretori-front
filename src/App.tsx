import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AppBarContainer from './layouts/app-bar-container'
import Copyright from './layouts/copyright'
import DrawerContainer from './layouts/drawer-container'
import Contracts from './pages/contracts'
import PhysicalPerson from './pages/physical-person'
import SignInSide from './pages/sign-in'
import SignUp from './pages/sign-up'

const mdTheme = createTheme()
export default function App() {
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => {
    setOpen(!open)
  }

  return (
    <>
      <ThemeProvider theme={mdTheme}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBarContainer open={open} handleDrawerOpen={toggleDrawer} />
          <DrawerContainer open={open} handleDrawerOpen={toggleDrawer} />
          <Box
            component='main'
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
            <Toolbar />
            <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
              <Grid>
                <Routes>
                  <Route path='/signin' element={<SignInSide />} />
                  <Route path='/signup' element={<SignUp />} />
                  <Route path='/pessoa-fisica' element={<PhysicalPerson />} />
                  <Route path='/contrato' element={<Contracts />} />
                </Routes>
              </Grid>
              <Copyright sx={{ pt: 4 }} />
            </Container>
          </Box>
        </Box>
      </ThemeProvider>
    </>
  )
}
