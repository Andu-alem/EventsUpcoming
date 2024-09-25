import { useContext } from 'react'
import Grid from '@mui/material/Grid2'
import Box from '@mui/material/Box'
import useMediaQuery from '@mui/material/useMediaQuery'
import Event from './Event'
import EventContext from '../context'
import imagesList from '../imageAssets'


export default function EventList(){
    const { datas } = useContext(EventContext)
    const matches = useMediaQuery('(max-width: 450px)')
    
    return (
        <Box sx={{ width:'100%'}}>
             <Grid container spacing={4}>
                { datas.map((data, index) => {
                    let randomIndex = Math.floor(Math.random()*imagesList.length)
                    let imageUrl = `../src/assets/${imagesList[randomIndex]}`
                    data = {
                        ...data,
                        imageUrl: imageUrl
                    }
                    return (
                        <Grid 
                            key={index} 
                            size={{ 
                                xs: matches ? 12 : 6 , 
                                lg:4
                            }}
                        > 
                            <Event data={ data } id={ index } />
                        </Grid>
                    )
                })}
            </Grid>
        </Box>
    )
}
