import axios from "axios";


export default axios.create({
baseURL: "http://10.0.2.2:8800/api", // Android Studio
// baseURL: "http://localhost:8800/api", // Web
});