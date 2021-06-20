import React from 'react'
import {BeerItem} from "./BeerItem";
import {RegisterPopUp} from "./RegisterPopUp";

class Main extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            beers: [],
            showPerPage: 5,
            error: null,
            showRegisterForm: false,
            currentPage: 1,
            allBeer: [],
            searchInput: '',
        }
    }

    queryPage(direction) {
        const per_page = this.state.showPerPage
        let nextPage
        if (direction === 'next')
            nextPage = this.state.currentPage + 1
        else if (direction === 'prev')
            nextPage = this.state.currentPage - 1
        else
            nextPage = this.state.currentPage

        if ((direction === 'prev' && nextPage >= 1) || (direction === 'next') || (direction === 'curr')) {
            fetch(`https://api.punkapi.com/v2/beers?page=${nextPage}&per_page=${per_page}`)
                .then(res => res.json())
                .then(res => {
                        const beers = []
                        res.forEach((value) => {
                            beers.push(value)
                        })
                        this.setState({beers})
                    },
                    (error) => {
                        this.setState({error})
                    })
            let currentPage = 1
            if (direction === 'next')
                currentPage = this.state.currentPage + 1
            else if (direction === 'prev')
                currentPage = this.state.currentPage - 1
            this.setState({currentPage})
        }
    }

    queryAll() {
        for (let index = 1; index <= 5; index++) {
            fetch(`https://api.punkapi.com/v2/beers?page=${index}&per_page=80`)
                .then(res => res.json())
                .then(res => {
                    let allBeer = this.state.allBeer
                    res.forEach((value) => {
                        allBeer.push(value)
                        this.setState({allBeer})
                    })
                }, (error) => {
                    this.setState({error})
                })}
    }

    componentDidMount() {
        this.queryPage('curr')
        this.queryAll()
    }

    onRegisterPopUpButton() {
        if (this.state.showRegisterForm)
            this.setState({showRegisterForm: false})
        else
            this.setState({showRegisterForm: true})
    }

    closeRegisterForm() {this.setState({showRegisterForm: false})}

    handleSearch(event) {
        let allBeer = this.state.allBeer
        let beers = allBeer.filter(el => {
            return !el.name.toLowerCase().indexOf(event.target.value.toLowerCase())
        })
        beers.splice(5, beers.length)
        this.setState({beers, searchInput: event.target.value})
    }

    render() {
        return (
            <div>
                <h1>Beer catalog app</h1>
                {this.state.showRegisterForm ? <RegisterPopUp onClick={() => this.closeRegisterForm()} /> : null}
                <input
                    style={{display: 'inherit'}}
                    value={this.state.searchInput}
                    onChange={(event) => this.handleSearch(event)}
                />
                <button onClick={() => this.onRegisterPopUpButton()}>register</button>
                <div style={{display: "flex", flexWrap: 'wrap'}}>
                    {
                        this.state.beers.map( function (value) {
                            return (<BeerItem key={value.id} beerInfo={value}/>)
                        })
                    }
                </div>
                <button onClick={() => this.queryPage('prev')}>previous</button>
                <button onClick={() => this.queryPage('next')}>next</button>
            </div>
        )
    }
}

export {Main}