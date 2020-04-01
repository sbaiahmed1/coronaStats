import React, {useEffect, useState} from 'react';
import axios from 'axios'


function App() {
    const [allCases, setAllCases] = useState({
        confirmed: 0,
        recovered: 0,
        deaths: 0,
        lastUpdate: 0
    });
    const [countryCases, setCountryCases] = useState({
        confirmed: 0,
        recovered: 0,
        deaths: 0,
    });
    const [country, setCountry] = useState();
    const [allCountries, setAllCountries] = useState([]);
    useEffect(
        () => {
            getallStats();
            getAllCountries();
            getCountryStat()
        }, [country]
    );

    async function handleChange(event) {
        setCountry(event.target.value);
    }

    async function getallStats() {
        const url = 'https://covid19.mathdro.id/api';
        let res = await axios.get(url);
        console.log(res.request.response);
        let jsonRes = JSON.parse(res.request.response);
        let confirmed = await jsonRes.confirmed.value;
        let recovered = await jsonRes.recovered.value;
        let deaths = await jsonRes.deaths.value;
        let lastUpdate = jsonRes.lastUpdate;
        setAllCases({
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths,
            lastUpdate: lastUpdate
        })
    }

    async function getCountryStat() {
        const url = 'https://covid19.mathdro.id/api/countries/' + (country || 'AFG');
        const response = await axios.get(url);
        console.log(response);
        let jsonRes = JSON.parse(response.request.response);
        let confirmed = await jsonRes.confirmed.value;
        let recovered = await jsonRes.recovered.value;
        let deaths = await jsonRes.deaths.value;
        setCountryCases({
            confirmed: confirmed,
            recovered: recovered,
            deaths: deaths,
        })
    }


    async function getAllCountries() {
        const url = 'https://covid19.mathdro.id/api/countries';
        const response = await axios.get(url);
        let all = await response.data.countries;
        let countriesArray = [];
        await all.map(country => {
            countriesArray.push({
                name: country.name,
                iso: country.iso3 || country.name
            })
        });
        setAllCountries(countriesArray);

    }

    return (
        <div>
            <h1 align={'center'} style={{padding: '2%'}} className="uk-heading-medium">COVID-19 Live Stats</h1>
            <div className="uk-column-1-3 uk-column-divider">
                <div>
                    <div className="uk-animation-toggle">
                        <div style={{backgroundColor: '#FFEE58', borderRadius: 32, width: '95%', marginLeft: '3%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} className="uk-card-title">All Cases</h3>
                            <h4 align={'center'}>{allCases.confirmed}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-animation-toggle">
                        <div style={{backgroundColor: '#66BB6A', borderRadius: 32, width: '95%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} className="uk-card-title">Recovered</h3>
                            <h4 align={'center'}>{allCases.recovered}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="uk-animation-toggle">
                        <div style={{backgroundColor: '#ef5350', borderRadius: 32, width: '95%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} className="uk-card-title">Deaths</h3>
                            <h4 align={'center'}>{allCases.deaths}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <h4 align={'right'}>Last update : {allCases.lastUpdate}</h4>
            <div className="uk-column-1-2 uk-column-divider">
                <h3 align={'center'}>Kindly choose your country : </h3>
                <select onChange={handleChange} align={'center'} style={{padding: '1%', borderRadius: 32,}}>
                    {
                        allCountries.map(country => {
                            return (<option key={country.iso} value={country.iso}>{country.name}</option>)
                        })
                    }
                </select>
            </div>
            <div style={{marginTop: '2%'}}>
                <div className="uk-column-1-3 uk-column-divider">
                    <div>
                        <div className="uk-animation-toggle">
                            <div style={{backgroundColor: '#FFEE58', borderRadius: 32, width: '95%', marginLeft: '3%'}}
                                 className="uk-animation-fade uk-card uk-card-default uk-card-body">
                                <h3 align={'center'} className="uk-card-title">All Cases</h3>
                                <h4 align={'center'}>{countryCases.confirmed}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="uk-animation-toggle">
                            <div style={{backgroundColor: '#66BB6A', borderRadius: 32, width: '95%'}}
                                 className="uk-animation-fade uk-card uk-card-default uk-card-body">
                                <h3 align={'center'} className="uk-card-title">Recovered</h3>
                                <h4 align={'center'}>{countryCases.recovered}</h4>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="uk-animation-toggle">
                            <div style={{backgroundColor: '#ef5350', borderRadius: 32, width: '95%'}}
                                 className="uk-animation-fade uk-card uk-card-default uk-card-body">
                                <h3 align={'center'} className="uk-card-title">Deaths</h3>
                                <h4 align={'center'}>{countryCases.deaths}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="uk-card uk-card-default uk-card-body" style={{marginTop: "3%"}}
                     uk-sticky="top: #offset"><h6 align={'center'}>See the source code here <a
                    href={'https://github.com/sbaiahmed1/coronaStats'}>at github</a></h6>
                </div>
            </div>

        </div>
    )
}

export default App;
