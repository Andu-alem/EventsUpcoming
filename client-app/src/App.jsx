import { Outlet } from 'react-router-dom'
import Container from '@mui/material/Container'
import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import axios from 'axios'
import EventContext from './context'
import Header from './components/Header'
import Footer from './components/Footer'
import LoadingPage from './components/LoadingPage'
import imagesList from './imageAssets'



function App() {
  const [darkMode, setDarkMode] = useState(false)
  const [datas, setDatas] = useState([])
  const [loadingFinished, setLoadingFinished] = useState(false)
  const [task, setTask] = useState([])
  const darkTheme = createTheme({
    palette: {
      mode : darkMode ? 'dark' : 'light'
    }
  })
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }
  const addTask = ({ id, title, startingDate }) => {

    setTask([
      ...task, 
      {
        id,
        title,
        startingDate
      }
    ])
    setDatas(() => {
      return datas.map((data, index) => {
        if (index == id) {
          return {
            ...data,
            addedToSchedule: true
          }
        }
        return data
      })
    })
  }
  const removeTask = (id) => {
    setTask(() => {
      return task.filter((item) => item.id !== id)
    })
    setDatas(() => {
      return datas.map((data, index) => {
        if (index == id) {
          return {
            ...data,
            addedToSchedule: false
          }
        }
        return data
      })
    })
  }
  useEffect(() => {
    axios.get('/api/fetch-event')
    .then(res => {
        setDatas(() => {
          let data = res.data
          return data.map((event) => {
            let randomIndex = Math.floor(Math.random()*imagesList.length)
            let imageUrl = `assets/${imagesList[randomIndex]}`
            return {
              ...event,
              imageUrl,
              addedToSchedule: false
            }
          })
        })
        setLoadingFinished(true)
    })
  }, [])
  return (
    loadingFinished ?
    <>
      <EventContext.Provider 
        value={{ 
          datas, 
          addTask, 
          removeTask,
          task
        }}
      >
        <ThemeProvider theme={ darkTheme }>
          <CssBaseline />
          <Container maxWidth="xl">
            <Header toggleDarkMode={ toggleDarkMode } />
            <Outlet />
            <Footer />
          </Container>
        </ThemeProvider>
      </EventContext.Provider>
    </> :
    <LoadingPage />
  )
}

export default App
