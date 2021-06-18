import React from 'react'
import {BeerItem} from "./BeerItem";
import {RegisterPopUp} from "./RegisterPopUp";

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            beers: [],
            error: null,
            showRegisterForm: false,
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

    onRegisterPopUpButton() {
        if (this.state.showRegisterForm)
            this.setState({showRegisterForm: false})
        else
            this.setState({showRegisterForm: true})
    }

    closeRegisterForm() {this.setState({showRegisterForm: false})}

    render() {
        return (
            <div>
                <h1>Header</h1>
                {this.state.showRegisterForm ? <RegisterPopUp onClick={() => this.closeRegisterForm()} /> : null}
                <button onClick={() => this.onRegisterPopUpButton()}>register</button>
                {
                    this.state.beers.map( function (value) {
                        return (<BeerItem key={value.id} beerInfo={value}/>)
                    })
                }
            </div>
        )
    }
}

export {Main}