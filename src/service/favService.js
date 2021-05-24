// import { storageService } from './asyncStorageService'
// import { httpService } from './httpService'
import { StorageService } from './StorageService';

export const favService = {
    removeFav,
    addFav,
    query
}

window.favService = favService

async function query() {
    var favs = await StorageService.load('favoriteCities')
    return favs
}
async function removeFav(favId) {
    var favs = await StorageService.load('favoriteCities')
    if (!favs) {
        return null
    }
    else favs = favs.filter(favi => favi !== favId)
    console.log(favs);
    StorageService.save('favoriteCities', favs)
    return favId
}

async function addFav(favId) {
    var favs = await StorageService.load('favoriteCities')
    if (!favs) {
        favs = []
        favs.push(favId)
    }
    else favs.push(favId)
    StorageService.save('favoriteCities', favs)
    return favId
}
