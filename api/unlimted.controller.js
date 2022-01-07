import puppeteer from "puppeteer";
import cheerio from "cheerio"


export default class unlimitedController {


    static async getFilmInfo(req, res, next) {
        const filmArray = []
                
        const date = new Date();
                const browser = await puppeteer.launch({
                  'args' : [
                    '--no-sandbox',
                    '--disable-setuid-sandbox'
                  ]
                });
                let cinema = req.query.cinema ? req.query.cinema : "sheffield"
                req.query.day && date.setDate(parseInt(req.query.day))
                req.query.month && date.setMonth(parseInt(req.query.month) - 1)

                const page = await browser.newPage(); 
                console.log(`Queries: ${JSON.stringify(req.query)}`)
                const selectedMonth = date.toLocaleDateString(`en-GB`, {month: "2-digit"})
                const selectedDay = date.toLocaleDateString(`en-GB`, {day: "2-digit"})
                console.log(`month: ${selectedMonth} and day: ${selectedDay}`)

                await page.goto(`https://www.cineworld.co.uk/cinemas/${cinema}/031#/buy-tickets-by-cinema?in-cinema=031&at=${date.getFullYear()}-${selectedMonth}-${selectedDay}&view-mode=list`);

                const data = await page.content()
                const $ = cheerio.load(data)
              $(".qb-movie").each(function (film, elem){
                //Find the elments by class or by tags specified
                const fname = $(this).find(".qb-movie-name").text()
            
                const genre = $(this).find(".qb-movie-info").children().first().text().replace(/[ |]/g, "");
                const runtime = $(this).find(".qb-movie-info").children().last().text();
                const img = "images/film-posters/" + fname.replace(/ *\([^)]*\) */g, "").replace(/[: ]/g, "_").replace(/'/g, "").toLowerCase() + ".jpg"
                const times = []
                // console.log(`name: ${fname}, runtime: ${runtime} and genre: ${genre}`);

 
                
                $(this).find(".btn-primary").each(function(i, elem){
                  //Set up time array for manipulation later [string time, start time Date object, finish time date object, state controller]
                  const tempTimeArray = []
                  const startTimeStr = $(this).text().trim()
                  const startTimeObj = new Date(date) 

                  startTimeObj.setMinutes(parseInt(startTimeStr.slice(3,)))
                  startTimeObj.setHours(parseInt(startTimeStr.slice(0,2)))
                  const finishTimeObj = new Date(startTimeObj.getTime() + ((parseInt(runtime) + 25)  * 60000 )) //25 is to allow for trailers and ads included in runtime

                  tempTimeArray.push(startTimeStr) // Index 0  is string for the render
                  tempTimeArray.push(startTimeObj) // Index 1 start time
                  tempTimeArray.push(finishTimeObj) // Index 2 Finish
                  tempTimeArray.push(true) // Index 3 true for default display value
                  tempTimeArray.push(false) // Index 4 selection control. Default fasle for unselcted 
                  times.push(tempTimeArray)
                });
        
                const tempFilm = {
                    name: fname,
                    genre: genre,
                    runtime: parseInt(runtime),
                    times: times,
                    img: img,

                }
        
                filmArray.push(tempFilm)
        
                // console.log(filmArray)
        
              });
              
              res.json(filmArray)
              await browser.close();
              return console.log("all done");
        
    }
}