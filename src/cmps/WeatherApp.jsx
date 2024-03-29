import React, { Component } from 'react'
import { taskService } from '../service/taskService.js'
import Cities from './Cities.jsx';
import Weather from './Weather.jsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addFav, removeFav } from '../store/action/favActions';
import { connect } from 'react-redux'

export class _WeatherApp extends Component {
    state = {
        cityWeather: {},
        cities: [],
        currCityId: "",
        isFav: false,
        curCityname: '',
        celcious: true,

    }

    componentDidMount() {
        this.loadCity(215854)
        navigator.geolocation.getCurrentPosition(this.log)


    }
    log = async (w) => {
        let id = await taskService.getCityByCoords(w)
        if (!id) this.loadCity(215854)
        else this.loadCity(id)
    }


    loadCity = async (Id, name = "TLV") => {
        const cityWeather = await taskService.getForecast(Id)
        console.log(cityWeather);
        // let favoriteCities = this.state.favoriteCities
        const { favs } = this.props
        let isFav = favs.includes(Id)

        await this.setState({ ...this.state, cities: [], cityWeather, currCityId: Id, isFav: isFav, curCityname: name })
        // this.setState({ currCityId: id })
    }

    handleChange = async (event) => {
        const value = event.target.value
        let city = value
        const cities = await taskService.getCities(city)
        await this.setState({ cities })

    }
    toggleFavorite = (Id) => {
        const { favs } = this.props
        if (favs.includes(Id)) {
            console.log('remove');
            this.props.removeFav(Id)
        }
        else this.props.addFav(Id)

        this.setState({ ...this.state, isFav: !this.state.isFav })


    }
    changFormat = () => {
        this.setState({ ...this.state, celcious: !this.state.celcious })

    }


    render() {
        const { cities, cityWeather, currCityId, isFav, curCityname, celcious } = this.state
        if (!cityWeather) return <label>load</label>

        return (
            <div  >
                <button className="format" onClick={this.changFormat}>	&#8457; / 	&#8451;</button>
                <div className="flex column align-center">

                    <label htmlFor="title" className=""> <input type="text" placeholder="Search" className="title" name="title" onChange={this.handleChange}></input></label>
                    {cities.length > 0 && <ul className="cities"> <Cities cities={cities} loadCity={this.loadCity} /></ul>}
                </div>
                <h1>{curCityname}</h1>
                {!isFav && <FavoriteBorderIcon onClick={() => this.toggleFavorite(currCityId)} />}
                {isFav && < FavoriteIcon onClick={() => this.toggleFavorite(currCityId)} />}
                <ul className="card-grid "> <Weather cityWeather={cityWeather} celcious={celcious} /></ul>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        favs: state.favsModule.favs,

    }
}
const mapDispatchToProps = {
    addFav,
    removeFav
}


export const WeatherApp = connect(mapStateToProps, mapDispatchToProps)(_WeatherApp);