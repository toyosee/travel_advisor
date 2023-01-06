// Importing axios to handle api calls
import axios from "axios";

export const getPlacesData = async (type, sw, ne)=>{
    try {
        // Make request
        const options = {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'X-RapidAPI-Key': '45c9731f8cmsh25f5d474f27a36fp1612d4jsnbb232bd942e6',
              'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
          };
        
        const {data: {data}} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, options);
        return data;
        
    } catch (error) {
        console.log(error)
        
    }
}

