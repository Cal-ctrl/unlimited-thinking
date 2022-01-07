import http from "../http.common.js";

class UnlimitedDataService {
    
    getFilmInfo(){
        return http.get("/api/unlimited")

    }

    getFilmInfoSpecific(cinema, day, month){
        return http.get(`/api/unlimited?cinema=${cinema}&day=${day}&month=${month}`)

    }
}

export default new UnlimitedDataService