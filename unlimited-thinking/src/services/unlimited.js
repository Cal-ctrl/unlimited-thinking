import http from "../http.common.js";

class UnlimitedDataService {
    
    getFilmInfo(){
        return http.get("/api/unlimited")

    }
}

export default new UnlimitedDataService