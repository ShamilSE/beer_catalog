import React from 'react'
import {BeerItem} from "./BeerItem";
import {RegisterPopUp} from "./RegisterPopUp";
import {Navbar} from "./Navbar";

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
            beerPerPage: 5,
        }
    }

    queryPage(direction) {
        const per_page = this.state.beerPerPage
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
        if (event.target.value.length > 0) {
            let allBeer = this.state.allBeer
            let beers = allBeer.filter(el => {
                return !el.name.toLowerCase().indexOf(event.target.value.toLowerCase())
            })
            beers.splice(5, beers.length)
            this.setState({beers, searchInput: event.target.value})
        }
        else {
            let beers = JSON.parse(JSON.stringify(this.state.allBeer))
            beers.splice(5, this.state.allBeer.length)
            this.setState({beers, searchInput: ''})
        }
    }

    closePopUpFromOuterSpace(event) {
        if (event.target.className !== 'registerButton'
            && event.target.parentElement.className !== 'register-form'
            && event.target.className !== 'register-form'
            && this.state.showRegisterForm)
            this.closeRegisterForm()
    }

    render() {
        return (
            <div className={"main-div"}>
                <Navbar
                    value={this.state.searchInput}
                    onChange={(event) => this.handleSearch(event)}
                />
                {this.state.showRegisterForm ? <RegisterPopUp onClick={() => this.closeRegisterForm()} /> : null}
                <button onClick={() => this.onRegisterPopUpButton()} className={'registerButton'}>register</button>
                <div style={{display: "flex", flexWrap: 'wrap'}}>
                    {
                        this.state.beers.map( function (value) {
                            return (<BeerItem key={value.id} beerInfo={value}/>)
                        })
                    }
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li onClick={() => this.queryPage('prev')} className="page-item"><a className="page-link">Previous</a></li>
                        <li onClick={() => this.queryPage('next')} className="page-item"><a className="page-link">Next</a></li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export {Main}