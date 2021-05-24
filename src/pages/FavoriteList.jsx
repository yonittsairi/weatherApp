import React, { Component } from 'react'
import { addFav, removeFav } from './../store/action/favActions';
import { connect } from 'react-redux'
import { taskService } from './../service/taskService';

export class _FavoriteList extends Component {
    state = {
        favList: []
    }
    componentDidMount() {
        this.getfavs()
    }
    async getfavs() {
        const { favs } = this.props
        var { favList } = this.state
        var copy = favList
        for (let i = 0; i <= favs.length - 1; i++) {
            console.log(favs[i]);
            let a = await taskService.getCitiesByID(favs[i])
            copy.push(a)

        }

        this.setState({ favList: copy })
    }


    render() {
        var { favList } = this.state
        if (favList.length < 1) return null
        const search = favList.map((city, index) => {
            return <li className="flex justify-center" key={city.Key + city.LocalizedName} >{city.LocalizedName},
             {city.Country.LocalizedName}</li>
        })
        return <div>{search}</div>

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


export const FavoriteList = connect(mapStateToProps, mapDispatchToProps)(_FavoriteList);
