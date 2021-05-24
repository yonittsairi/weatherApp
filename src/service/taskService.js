// import { storageService } from './asyncStorageService'
// import { httpService } from './httpService'
import axios from 'axios';
import { StorageService } from './StorageService';
export const taskService = {
    getCities,
    // getById,
    // remove,
    // save,
    // query,
    // start,
    getCitiesByID,
    getForecast
}

window.taskService = taskService
// Note: due to async, must run one by one...

// var axios = Axios.create({
//     withCredentials: false,
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//     }
// })
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
        const res = await axios.get(`${url}`, { headers })
        console.log(res.data);
        await StorageService.save('FAVLIST', res.data)
        return res.data
    } catch (err) {

        throw err
    }
}

async function getForecast(key) {
    console.log(key);
    // const url = `http://dataservice.accuweather.com/forecasts/v1/daily/5day/${city}?apikey=a6G5iYMGG7hF7iiEnGgh41oa4pANsd46&details=true&metric=true`;
    try {
        const res = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${key}?apikey=a6G5iYMGG7hF7iiEnGgh41oa4pANsd46`)
        // const res = await axios.get(`${url}`, { headers })
        await StorageService.save('forecast', res.data)
        return res.data
    } catch (err) {
        console.log(err);

        //  throw new Error(err)
        return StorageService.load('forecast')
    }

}
// function getById(taskId) {
//     // return storageService.get('task', taskId)
//     return httpService.get(`task/${taskId}`)
// }
// function remove(taskId) {

//     return httpService.delete(`task/${taskId}`)
// }
// function start(task) {
//     return httpService.put(`task/${task._id}/start`, task)
// }

// async function update(task) {
//     const editedTask = await httpService.put(`task/${task._id}`, task)
//     // console.log(editedTask);
//     return editedTask
// }

// function query(filterBy) {
//     console.log(filterBy);
//     var queryStr = (!filterBy) ? '' : `?title=${filterBy.title}&tags=${filterBy.tags}&minPrice=${filterBy.minPrice}&maxPrice=${filterBy.maxPrice}&sort=anaAref`
//     console.log(queryStr);
//     return httpService.get(`task${queryStr}`)
//     // return storageService.query('task')
// }
