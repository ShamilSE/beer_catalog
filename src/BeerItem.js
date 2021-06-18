import React from 'react'

class BeerItem extends React.Component {
    render() {
        return (
            <div>
                {this.props.beerInfo.name}
            </div>
        )
    }
}

export {BeerItem}