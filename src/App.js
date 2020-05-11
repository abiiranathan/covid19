import React from 'react';
import {Cards, CountryPicker, Chart} from './components';
import styles from './App.module.css';
import {fetchData} from './api'
import coronaImage from './images/image.png'

class App extends React.Component{
    state = {
        data: {},
        country: ''
    }

    handleCountryChange = async (country) =>{
        // fetch the data, then set the state
        try{
            const fetchedData = await fetchData(country);
            this.setState({data: fetchedData, country:country});
        }catch(e){
            console.log(e)
        }


    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({data: fetchedData});
    }

    render(){
        const {data, country} = this.state;
        return (
            <div className={styles.container}>
                <div className={ styles.imgContainer}>
                    <img src={coronaImage} alt="SIRS-Cov2" className={styles.image}/>
                </div>
                <Cards data={data}/>
                <CountryPicker handleCountryChange= { this.handleCountryChange }/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;
