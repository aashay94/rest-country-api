import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Filter from "./Filter"

export default function Countries() {
    const [countries, setCountries] = useState([])
    const [filtered, setFiltered] = useState([])
    const [searchInput, setSearchInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)

    const fetchCountries = async () => {
        const res = await fetch(
            `http://api.countrylayer.com/v2/all?access_key=${process.env.REACT_APP_API_KEY}`
        )
        const data = await res.json()
        setCountries(data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchCountries()
    }, [])

    const searchCountries = (searchValue) => {
        setSearchInput(searchValue)

        if (searchInput) {
            const filteredCountries = countries.filter((country) =>
                Object.values(country)
                    .join("")
                    .toLowerCase()
                    .includes(searchValue.toLowerCase())
            )
            setFiltered(filteredCountries)
        } else {
            setFiltered(countries)
        }
    }

    return (
        <>
            {isLoading ? (
                <h1 className="flex items-center justify-center uppercase font-bold">
                    Loading...
                </h1>
            ) : (
                <>
                    <div className="">
                        <Filter
                            searchCountries={searchCountries}
                            searchInput={searchInput}
                            setCountries={setCountries}
                        />
                    </div>
                    {searchInput.length > 0 ? (
                        <div className="country-details">
                            {filtered.map(({ name, capital, region }) => (
                                <Link to={`/${capital}`} key={name}>
                                    <div className="country-inner">
                                        <h4 className="font-bold">
                                            {name}
                                        </h4>
                                        <ul>
                                            <li className="">
                                                Capital: {capital}
                                            </li>
                                            <li className="">
                                                Region: {region}
                                            </li>
                                        </ul>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <>
                            <div className="country-details col-md-12">
                                {countries.map(({ name, capital, region }) => (
                                    <Link to={`/${capital}`} key={name}>
                                        <div className="country-inner col-md-3">
                                            <h4 className="font-bold">
                                                {name}
                                            </h4>
                                            <ul>
                                                <li className="">
                                                    Capital: {capital}
                                                </li>
                                                <li className="">
                                                    Region: {region}
                                                </li>
                                            </ul>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    )
}