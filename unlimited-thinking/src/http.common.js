import axios from "axios";

export default axios.create({
    baseURL: "https://still-lowlands-19150.herokuapp.com/",
    // baseURL: "http://localhost:5000/", //Testing environment
    headers:{
        "Content-type": "application/json"
    }
})
