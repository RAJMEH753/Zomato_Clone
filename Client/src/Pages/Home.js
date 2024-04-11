import React from 'react';
import '../Styles/frontpage.css';
import Banner from './Banner';
import QuickSearch from './QuickSearch';
import axios from 'axios';  //help in connecting to API's

class Homepage extends React.Component {

    constructor(){
        super();
        this.state = {
             loc:[],
             Mealtype:[]
        }
    }

  componentDidMount(){
    //location API
    axios({
        url: 'http://localhost:5500/location',
        method: 'get',
        headers: {'Content-Type': 'application/JSON'}
    })
    .then(res =>{
        this.setState({loc : res.data.location })
    })
    .catch((err => console.log(err)))

//Mealtype API
        axios({
            url: 'http://localhost:5500/mealtype',
            method: 'get',
            headers: {'Content-Type': 'application/JSON'}
        })
        .then(res =>{
            this.setState({Mealtype : res.data.Mealtype })
        })
        .catch((err => console.log(err)))
  }

    render() {
        const {loc, Mealtype } = this.state;
       // console.log( Mealtype);
        return (
            <div>
                {/* <!--Banner Part (upper)--> */}

                    <Banner locationData = { loc }/>

                {/* <!--Quick Searches Part (lower)--> */}

                <QuickSearch mealtypeData = { Mealtype }/>

            </div>
        )
    }
}


export default Homepage;