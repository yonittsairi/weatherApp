// import { storageService } from './asyncStorageService'
// import { httpService } from './httpService'
import axios from 'axios';
import { StorageService } from './StorageService';
export const taskService = {
    getCities,
    getCitiesByID,
    getForecast
}

window.taskService = taskService

const headers = {
    'Content-Type': '*'


};
async function getCities(city) {


    const url = `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=a6G5iYMGG7hF7iiEnGgh41oa4pANsd46&q=${city}`;
    try {
        const res = await axios.get(`${url}`, { headers })
        console.log(res.data);
        await StorageService.save('search', res.data)
        return res.data
    } catch (err) {

        throw err
    }
}
async function getCitiesByID(city) {
    console.log(city);
    const url = `http://dataservice.accuweather.com/locations/v1/${city}?apikey=a6G5iYMGG7hF7iiEnGgh41oa4pANsd46`;
    try {
        const res = await axios.get(`${url}`)
        console.log(res.data);
        await StorageService.save('FAVLIST', res.data)
        return res.data
    } catch (err) {

        throw err
    }
}

async function getForecast(key) {
    console.log(key);
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=a6G5iYMGG7hF7iiEnGgh41oa4pANsd46&language=en-us&details=false&metric=false`)
        await StorageService.save('forecast', res.data)
        return res.data
    } catch (err) {
        console.log(err);

        return StorageService.load('forecast')
    }

}
