import React from 'react'
import { UtilService } from './../service/UtilService';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
export default function Weather(props) {

    const foreCast = props.cityWeather.DailyForecasts
    if (!foreCast) return null
    const weather = foreCast.map((forecst, index) => {
        // let date = UtilService.dateFormat(forecst.EpochDate)
        if (+forecst.Night.Icon < 10) { var NIcon = '0' } else NIcon = ''
        if (+forecst.Day.Icon < 10) { var DIcon = '0' } else DIcon = ''
        var date = UtilService.dateFormatter(forecst.Date)
        return <li className="card flex column align-center" key={forecst.Date} >  <div className="flex column align-center"><span>{date}</span>
            <span className="flex  align-center space-between"><WbSunnyIcon /><span>{forecst.Day.ShortPhrase}</span></span>
            <img src={`https://developer.accuweather.com/sites/default/files/${DIcon}${forecst.Day.Icon}-s.png`} /></div>
            <div className="card flex column align-center">
                <span className="flex align-center space-between"><Brightness2Icon /><span>{forecst.Night.ShortPhrase}</span></span>
                <img src={`https://developer.accuweather.com/sites/default/files/${NIcon}${forecst.Night.Icon}-s.png`} />
                <span>{forecst.Temperature.Minimum.Value} -  {forecst.Temperature.Maximum.Value}  <span>&#8451;</span></span>

            </div>
        </li >
    })


    return weather



}

