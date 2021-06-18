import React from 'react'
import {Card, Button} from "react-bootstrap";

class BeerItem extends React.Component {
    render() {
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={this.props.beerInfo.image_url} style={{width: '3rem'}} />
                <Card.Body>
                    <Card.Title>{this.props.beerInfo.name}</Card.Title>
                    <Card.Text>{this.props.beerInfo.description}</Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        )
    }
}

export {BeerItem}