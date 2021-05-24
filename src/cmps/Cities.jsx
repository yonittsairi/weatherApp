import React from 'react'

export default function Cities({ cities, loadCity }) {



    if (!cities) return null
    const search = cities.map((city, index) => {
        return <li className="flex align-center" key={city.Key + city.LocalizedName} onClick={() => loadCity(city.Key, city.LocalizedName)}>{city.LocalizedName},
     {city.Country.LocalizedName}</li>
    })

    return search
}
