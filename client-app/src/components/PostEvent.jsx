import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import axios from 'axios'
import UploadProgress from './UploadProgress'
import Typography from '@mui/material/Typography';


export default function PostEvent() {
    const navigate = useNavigate()
    const [dateTime, setDateTime] = useState(null)
    const [postAllowed, setPostAllowed] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [fileData, setFileData] = useState(null)
    const [titleError, setTitleError] = useState(false)
    const [descriptionError, setDescriptionError] = useState(false)
    const [emptyField, setEmptyField] = useState({
        file: true,
        title: true,
        description: true,
        dateTime: true
    })
    const [display, setDisplay] = useState('none')
    const [openModal, setModalOpen] = useState(false)
    const [progress, setProgress] = useState(0)
    const handleOpen = () => setModalOpen(true)
    const handleClose = () => setModalOpen(false)    

    const changeHandler = (event) => {
        if (event.target === undefined) {
            setDateTime(event)
            setEmptyField({...emptyField, dateTime: false})
            return
        }
        switch (event.target.name) {
            case 'file':
                setFileData(event.target.files[0])
                setEmptyField({...emptyField, file: false})
                break;
            case 'title':
                setTitle(event.target.value)
                setTitleError(false)  
                setEmptyField({...emptyField, title: false})
                break;
            case 'description':
                setDescription(event.target.value)
                setDescriptionError(false)  
                setEmptyField({...emptyField, description: false})
                break;
            default:
                break;
        }
        validate()
    }
    const validate = () => {
        const { file, title, description, dateTime } = emptyField
        //enable submit button if all fields are filled
        if (!file && !title && !description && !dateTime) {
            setPostAllowed(true)
        }
    }
    const handleBlur = (event) => {
        if (event.target.value==='') {
            switch (event.target.name) {
                case 'title':
                    setTitleError(true)  
                    setEmptyField({...emptyField, title: true})
                    break 
                case 'description':
                    setDescriptionError(true)  
                    setEmptyField({...emptyField, description: true})
                    break    
                case 'file': 
                    setEmptyField({...emptyField, file: true})
                    break       
                default:
                    break;
            }
        }
        validate()
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('image', fileData)
        formData.append('title', title.trim())
        formData.append('description', description.trim())
        formData.append('startingDate', dateTime.format())
        
        setModalOpen(true)
        axios.post('/api/create-event', formData,{
            onUploadProgress: (progressEvent) => {
                const { loaded, total } = progressEvent;
                let percentCompleted = Math.round((loaded*100)/total);
                setProgress(percentCompleted)

            }
        }).then(res => {
            if(res.status === 200){
                setModalOpen(false)
                navigate("/events")            
            }
        }).catch(error => {
            setModalOpen(false)
            setDisplay("block")
        })
    }
    window.addEventListener('click', validate)

    return (
        <Box
            component="form"
            sx={{ 
                '& .MuiTextField-root': { m: 1, width: '35ch' }, 
                display: 'flex',
                flexDirection : 'column',
                alignItems : 'center',
                mt: 10
            }}
            noValidate
            autoComplete="off">
            <Typography variant='h6' sx={{ display: display, color: 'red' }}>
                Please try to submit again
            </Typography>
            <TextField
                required
                error={ titleError }
                name="title"
                id="outlined-required"
                label="Title"
                onChange={ changeHandler }
                onBlur={ handleBlur }
                helperText={ titleError ? "Title is Required":"" }
            />
            
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    required
                    disablePast
                    name="date-time"
                    value={dateTime}
                    onChange={ changeHandler }
                    referenceDate={dayjs()}
                />
            </LocalizationProvider>
            <TextField
                required
                multiline
                error={ descriptionError }
                name="description"
                id="outlined-required"
                label="Description"
                defaultValue=""
                minRows={7}
                maxRows={10}
                onChange={ changeHandler }
                onBlur={ handleBlur }
                helperText={ descriptionError ? "Description is Required":"" }
            />
            <TextField
                required
                name="file"
                id="outlined-required"
                type="file"
                onChange={ changeHandler }
            />
            <Button onClick={ handleSubmit } disabled={ !postAllowed } variant="contained" size="large">Submit</Button>
            <UploadProgress open={ openModal } handleClose={ handleClose } progress={ progress } />
        </Box>
    )
}