import React from 'react'
import {BeerItem} from "./BeerItem";

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            beers: [],
            error: null,
        }
    }

    componentDidMount() {
        fetch("https://api.punkapi.com/v2/beers", {method: 'GET'})
            .then((res) => res.json())
            .then((res) => {
                    const beers = this.state.beers.slice()
                    res.forEach((value) => {
                        beers.push(value)
                    })
                    this.setState({beers})
                },
                (error) => {this.setState({error})}
            )
    }

    render() {
        return (
            <div>
                <h1>Header</h1>
                {
                    this.state.beers.map( (value) => {
                        return (<BeerItem key={value.id} beerInfo={value}/>)
                    })
                }
            </div>
        )
    }
}

export {Main}