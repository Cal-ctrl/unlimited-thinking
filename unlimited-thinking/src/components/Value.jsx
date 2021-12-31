import { Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import UnlimitedDataService from "../services/unlimited.js"
import Card from "./Card";

function Value () {
    // const films = ["images/film-posters/cyrano.jpg", "images/film-posters/elf.jpg", "images/film-posters/no_time_to_die.jpg"]
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
            setSavings(value * -1)

        })
        .catch(e => {
            console.error(`error in retrieving times: ${e}`)
        })

    }

    const [value, setValue] = useState(9.99)
    const [savings, setSavings] =useState(0)
    const [ticketPrice, setTicketPrice] = useState(4.99)



    
    return (<div className="value">
    <h1>Is subscription cinema for you?</h1>
    <p>These movies are all out now or scheduled for the next 4 weeks, swipe right if your interested and the calculator will let you know how much you could saving signing up!</p>
    
    
    <Input placeholder="Monthly cost or service" sx={{mt: 0}} name="cost" value={value} onChange={e => {
        setValue(e.target.value);
        const savingUpdate = e.target.value * -1
        setSavings(savingUpdate)
        }} />
        <h5>Input monthly cost above</h5>
    <Input placeholder="Ticket Price" name="ticket" value={ticketPrice} onChange={e => {

        const ticket = e.target.value * 1
        setTicketPrice(ticket)
        }} />
        <h5>Input your ticket price</h5>
        <div className="frame-place">{cineworldFilmTimes.map((film, i) => (
            <Card key={i} image={film.img} updateSaving={setSavings} ticketPrice={ticketPrice}/>
        ))}</div>

        
        
        <h1>You will save .... £<em>{Math.round(savings * 100) / 100}</em> this month!!</h1>
    </div>)
  
   
}

export default Value;