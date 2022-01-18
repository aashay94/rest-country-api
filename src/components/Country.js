import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"

export default function Country() {
    const [country, setCountry] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { capital } = useParams()

    useEffect(() => {
        const fetchCountryData = async () => {
            const res = await fetch(
                `http://api.countrylayer.com/v2/capital/${capital}?access_key=${process.env.REACT_APP_API_KEY}`
            )
            const data = await res.json()
            setCountry(data)
            setIsLoading(false)
        }

        fetchCountryData()
    }, [capital])

    return (
        <>
      {isLoading ? (
        <h1 className="flex items-center justify-center uppercase font-bold">
          Loading...
        </h1>
      ) : (
        <div className="country-details">
          {country.map(({ name, capital, region, topLevelDomain }) => (
            <div key={name} className="country-inner">
              <h4 className="">
                {name},{" "}
                <span className="">
                  {capital}
                </span>
              </h4>
              <ul>
                <li className="">
                  Region: {region}
                </li>
                <li className="">
                  Top Level Domain: {topLevelDomain}
                </li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
    )
}
