import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



function FilmBox (props) {


    return <Card sx={{ maxWidth: 345 }}>
    <CardMedia
      component="img"
      height="500"
      width="340"
      image={props.img}
      alt={props.name}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {props.name}
      </Typography>      
      <Typography gutterBottom variant="h5" component="div">
        {props.genre}
      </Typography>
      <Typography gutterBottom variant="h5" component="div">
        {props.runtime} mins
      </Typography>
    </CardContent>
    <CardActions>
    <Box sx={{display: 'grid',
        gap: 1,
        gridTemplateColumns: "repeat(4, minmax(50px, 1fr))"}}>
    {props.times.map((time, i) => {
        return (
            <Button key={i} name={props.name} onClick={(e) => {
                props.checkTimes(time)
                props.addFilm(e)
            }} disabled={!time[3]} variant="contained" value={time[0]}>{time[0]}</Button>
        )
    })}
    </Box>

    </CardActions>
  </Card>
}


export default FilmBox;