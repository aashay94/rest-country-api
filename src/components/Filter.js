import React, { useEffect } from "react"

export default function Filter({ searchCountries, searchInput, setCountries }) {
    const region = [
        {
            name: "Africa",
        },
        {
            name: "Americas",
        },
        {
            name: "Asia",
        },
        {
            name: "Europe",
        },
        {
            name: "Oceania",
        },
    ]

    const fetchCountryByRegion = async (region) => {
        const res = await fetch(
          `http://api.countrylayer.com/v2/region/${region}?access_key=${process.env.REACT_APP_API_KEY}`
        )
        const data = await res.json()
        setCountries(data)
        console.log(data)
      }
    
      useEffect(() => {
        fetchCountryByRegion()
      }, [])
    
      return (
        <>
          <div className="">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Search by country name"
              value={searchInput}
              onChange={(e) => searchCountries(e.target.value)}
              className=""
              autoComplete="off"
            />
            <select
              name="select"
              id="select"
              className=""
              value={region.name}
              onChange={(e) => fetchCountryByRegion(e.target.value)}
            >
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Oceania">Oceania</option>
              <option value="Americas">Americas</option>
              <option value="Europe">Europe</option>
            </select>
          </div>
        </>
      )
    }
