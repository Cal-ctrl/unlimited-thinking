import React, { useEffect, useState } from "react";
import UnlimitedDataService from "../services/unlimited.js"
import FilmBox from "./FilmBox.jsx";
import Box from '@mui/material/Box';
import { Button, Container, Typography } from "@mui/material";

const FilmTimes =  () => {
    const [cineworldFilmTimes, setCineworldFilmTimes] = useState([])

    
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




        function handleRemoveTime(e) {
   

        }

    return <Container className="film-container" maxWidth="lg">

        <Typography variant="h4">Selected times <Typography paragraph="true">(Films you cant make calculated by runtime below plus 25 mins for ads and trailers, click the button in this list to remove the time)</Typography></Typography>
        {
            cineworldFilmTimes.map((film, i) => {

            return ( <div>
                {film.times.map((time, i) => {
                    return time[4] && <div key={i}><Button onClick={ e => {
                        changeButtonOnClick(time)
                        addFilm(e)
                    }} sx={{display: "inline"}} name={film.name} value={time[0]} variant="contained">{time[0]}</Button><Typography sx={{display: "inline", ml: "10px"}} variant="h5">{film.name}</Typography> </div>
                    })} 
                    </div>
        
            )
             
               
               
            })
        }

    <Typography variant="h5">Todays film times @ Cineworld Sheffield <Typography paragraph="true">click the times to add to you watch list today</Typography></Typography>
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