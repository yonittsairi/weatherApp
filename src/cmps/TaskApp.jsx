import React, { Component } from 'react'
import { taskService } from '../service/taskService.js'
import Cities from './Cities.jsx';
import Weather from './Weather.jsx';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { addFav, removeFav } from './../store/action/favActions';
import { connect } from 'react-redux'

export class _TaskApp extends Component {
    state = {
        cityWeather: {},
        cities: [],
        currCityId: "",
        isFav: false,
        curCityname: ''
    }

    componentDidMount() {
        let id = "215854"
        this.loadCity(id)


    }

    loadCity = async (Id, name = "TLV") => {
        const cityWeather = await taskService.getForecast(Id)

        // let favoriteCities = this.state.favoriteCities
        const { favs } = this.props
        let isFav = favs.includes(Id)

        await this.setState({ cityWeather, currCityId: Id, isFav: isFav, curCityname: name })
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

        this.setState({ isFav: !this.state.isFav })


    }


    render() {
        const { cities, cityWeather, currCityId, isFav, curCityname } = this.state
        if (!cityWeather) return <label>load</label>

        return (
            <div >

                <div className="flex column align-center">

                    <label htmlFor="title" className=""> <input type="text" placeholder="Search" className="title" name="title" onChange={this.handleChange}></input></label>
                    {cities.length > 0 && <ul className="cities"> <Cities cities={cities} loadCity={this.loadCity} /></ul>}
                </div>
                <h1>{curCityname}</h1>
                {!isFav && <FavoriteBorderIcon onClick={() => this.toggleFavorite(currCityId)} />}
                {isFav && < FavoriteIcon onClick={() => this.toggleFavorite(currCityId)} />}
                <ul className="card-grid "> <Weather cityWeather={cityWeather} /></ul>
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


export const TaskApp = connect(mapStateToProps, mapDispatchToProps)(_TaskApp);