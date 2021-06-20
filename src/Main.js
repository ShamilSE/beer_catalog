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
            currentPage: 1,
            allBeer: [],
            searchInput: null
        }
    }

    queryPage(direction) {
        const per_page = 5
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

    async queryAll() {
        for (let index = 1; index <= 5; index++) {
            fetch(`https://api.punkapi.com/v2/beers?page=${index}&per_page=80`)
                .then(res => res.json())
                .then(res => {
                        let allBeer = this.state.allBeer
                        res.forEach((value) => {
                            allBeer.push(value)
                            this.setState({allBeer})
                        })
                    },
                    (error) => {
                        this.setState({error})
                    })
        }
    }

    componentDidMount() {
        this.queryPage('curr')
    }

    onRegisterPopUpButton() {
        if (this.state.showRegisterForm)
            this.setState({showRegisterForm: false})
        else
            this.setState({showRegisterForm: true})
    }

    closeRegisterForm() {this.setState({showRegisterForm: false})}

    logAllBeer() {
        console.log(this.state.allBeer)
    }

    render() {
        return (
            <div>
                <h1>Beer catalog app</h1>
                {this.state.showRegisterForm ? <RegisterPopUp onClick={() => this.closeRegisterForm()} /> : null}
                <input value={this.state.searchInput}/>
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
                <button onClick={() => this.queryAll()}>query all</button>
                <button onClick={() => this.logAllBeer()}>show all beer</button>
            </div>
        )
    }
}

export {Main}