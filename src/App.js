import React, {useEffect, useState} from 'react';
import axios from 'axios'
import Select from 'react-select'

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
    const [countrySelected, setCountrySelected] = useState()
    const [country, setCountry] = useState();
    const [allCountries, setAllCountries] = useState([]);
    useEffect(
        () => {
            getallStats();
            getAllCountries();
            getCountryStat()
        }, [country]
    );
    let optionChanged = value => {
        console.log(value)
        setCountrySelected(value)
    }
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
                value:country.iso3 || country.name,
                label:country.name
            })
        });
        setAllCountries(countriesArray);

    }

    return (
        <div className={'container'}>
            <h1 align={'center'} style={{padding: '2%'}} className="uk-heading-medium">COVID-19 Live Stats</h1>
            <div className="row">
                <div>
                    <div className="col s4">
                        <div style={{backgroundColor: '#FFEE58', borderRadius: 32, padding: '10%'}}>
                            <h3 align={'center'} style={{fontSize: '100%'}} className="uk-card-title">All Cases</h3>
                            <h4 align={'center'} style={{fontSize: '100%'}}>{allCases.confirmed}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col s4">
                        <div style={{backgroundColor: '#66BB6A', borderRadius: 32, padding: '10%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} style={{fontSize: '100%'}} className="uk-card-title">Recovered</h3>
                            <h4 align={'center'} style={{fontSize: '100%'}}>{allCases.recovered}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col s4">
                        <div style={{backgroundColor: '#ef5350', borderRadius: 32, padding: '10%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} style={{fontSize: '100%'}} className="uk-card-title">Deaths</h3>
                            <h4 align={'center'} style={{fontSize: '100%'}}>{allCases.deaths}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <h6 className={"right-align"}>Last update : {allCases.lastUpdate}</h6>
            <div className={'row'}>
                <h6 className={'col s6'}>Kindly Choose your country</h6>
                <Select options={allCountries} onChange={value=>setCountry(value.value)} className={'col s6'}/>
            </div>
            <div className="row">
                <div>
                    <div className="col s4">
                        <div style={{backgroundColor: '#FFEE58', borderRadius: 32, padding: '10%'}}>
                            <h3 align={'center'} style={{fontSize: '100%'}} className="uk-card-title">All Cases</h3>
                            <h4 align={'center'} style={{fontSize: '100%'}}>{countryCases.confirmed}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col s4">
                        <div style={{backgroundColor: '#66BB6A', borderRadius: 32, padding: '10%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} style={{fontSize: '100%'}} className="uk-card-title">Recovered</h3>
                            <h4 align={'center'} style={{fontSize: '100%'}}>{countryCases.recovered}</h4>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="col s4">
                        <div style={{backgroundColor: '#ef5350', borderRadius: 32, padding: '10%'}}
                             className="uk-animation-fade uk-card uk-card-default uk-card-body">
                            <h3 align={'center'} style={{fontSize: '100%'}} className="uk-card-title">Deaths</h3>
                            <h4 align={'center'} style={{fontSize: '100%'}}>{countryCases.deaths}</h4>
                        </div>
                    </div>
                </div>
            </div>
            {/*here ends hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh*/}
            <div name={'footer'}>
                <div className="uk-card uk-card-default uk-card-body" style={{marginTop: "3%"}}
                     uk-sticky="top: #offset"><h6 align={'center'}>See the source code here <a
                    href={'https://github.com/sbaiahmed1/coronaStats'}>at github</a></h6>
                </div>
            </div>

        </div>
    )
}

export default App;
