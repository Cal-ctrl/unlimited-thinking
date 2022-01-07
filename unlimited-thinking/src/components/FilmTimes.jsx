import React, { useEffect, useState } from "react";
import UnlimitedDataService from "../services/unlimited.js"
import FilmBox from "./FilmBox.jsx";
import Box from '@mui/material/Box';
import { Button, Container, Typography } from "@mui/material";
import DateAdapter from '@mui/lab/AdapterMoment';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import TextField from '@mui/material/TextField';

const FilmTimes =  () => {
    const [cineworldFilmTimes, setCineworldFilmTimes] = useState([])
    const [dateSelected, setDateSelected] = useState(new Date())

    
    useEffect(() => {
        retrieveFilmTimes();
    }, [])

    function retrieveFilmTimes () {
        console.log(`triggered retrieve Film times from data service`)
        UnlimitedDataService.getFilmInfo()
        .then(res => {
            console.log(res)
            setCineworldFilmTimes(res.data)

        })
        .catch(e => {
            console.error(`error in retrieving times: ${e}`)
        })

    }

    function changeButtonOnClick (filmTime) {

        const tempArray = cineworldFilmTimes

        const startTimeofClicked = new Date(filmTime[1]).getTime()
        const finishTimeofClicked = new Date(filmTime[2]).getTime()

        const buttonDisableController = filmTime[4] === false ? false : true

        cineworldFilmTimes.map((film, filmIndex) => {
               
                
            film.times.forEach((time, timeIndex) => {
                let checkStart = new Date(time[1]).getTime()
                let checkFin = new Date(time[2]).getTime()

                if (checkStart >= startTimeofClicked && checkStart <= finishTimeofClicked){
                    
                    tempArray[filmIndex].times[timeIndex][3] =  buttonDisableController
                   
                    // console.log(`We have a clash with start time`)
                } else if (checkFin >= startTimeofClicked && checkFin <= finishTimeofClicked) {
                    tempArray[filmIndex].times[timeIndex][3] = buttonDisableController
                    // console.log(`We have a clash with finish time`)

                }else if (checkStart <= startTimeofClicked && checkFin >= finishTimeofClicked) {
                    tempArray[filmIndex].times[timeIndex][3] = buttonDisableController
                }
                 else {
                    console.log(`no clash`)

                }
            });
            
        })

        
        return setCineworldFilmTimes([...tempArray])

    }

        function addFilm(e) {
            const name = e.target.name
            const selectTime = e.target.value
            console.log(`name: ${name} and time: ${selectTime}`)
            const updateSelecetedArray = cineworldFilmTimes

            updateSelecetedArray.map((film, index) => {
                if (film.name === name) {
                    film.times.map((time, i) => {
                        if (time[0] === selectTime) {
                            updateSelecetedArray[index].times[i][4] = !updateSelecetedArray[index].times[i][4]
                        }
                    })

                } 

            })
            console.log(updateSelecetedArray)

            setCineworldFilmTimes([...updateSelecetedArray])

        }

        function updateTimes (date) {
            console.log(`Update times triggered for date: ${date}`)
            const selectedMonth = date.toLocaleDateString(`en-GB`, {month: "2-digit"})
            const selectedDay = date.toLocaleDateString(`en-GB`, {day: "2-digit"})
            console.log(`Month: ${selectedMonth} Day: ${selectedDay}`)
            UnlimitedDataService.getFilmInfoSpecific("sheffield", selectedDay, selectedMonth)
            .then(res => {
                console.log(`Date pick test: Success`)
                console.log(res.data)
                setCineworldFilmTimes(res.data)
            })
            .catch(e => {
                console.error(`error in retrieving times for specific day: ${e}`)
            })

        }





    return <Container className="film-container" maxWidth="lg">

        <Typography variant="h4">Selected times <Typography paragraph={true} >(Films you cant make calculated by runtime below plus 25 mins for ads and trailers, click the button in this list to remove the time)</Typography></Typography>
        {
            cineworldFilmTimes.map((film, i) => {

            return ( <div key={i}>
                {film.times.map((time, i) => {
                    const finish = new Date(time[2])
                    return time[4] && <div key={i}><Button key={i} onClick={ e => {
                        changeButtonOnClick(time)
                        addFilm(e)
                        
                    }} sx={{display: "inline"}} name={film.name} value={time[0]} variant="contained">{time[0]} - {finish.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Button><Typography sx={{display: "inline", ml: "10px"}} variant="h5">{film.name}</Typography> </div>
                    })} 
                    </div>
        
            )
             
               
               
            })
        }

    <Typography variant="h5">Showing times for selected date<Typography paragraph={true} >Choose which times you would like to watch and they will be added to the list above</Typography></Typography>
    <div id="date-select">
    <LocalizationProvider dateAdapter={DateAdapter}>
    <MobileDatePicker
          label="Planning ahead?"
          value={dateSelected}
          onChange={(newValue) => {
            setDateSelected(newValue);
            updateTimes(new Date(dateSelected));
          }}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
        </div>
    <Box  sx={{
        display: 'grid',
        gap: 1,
        justifyContent: 'center',
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))"}}>

        {cineworldFilmTimes.map((film, i) => {
            return (
            <FilmBox 
            key={i}
            name={film.name}
            genre={film.genre}
            times={film.times}
            runtime={film.runtime}
            img={film.img}
            checkTimes={changeButtonOnClick}
            addFilm={addFilm}
            />
            )

        })}
        </Box>
        </Container>

}




export default FilmTimes;