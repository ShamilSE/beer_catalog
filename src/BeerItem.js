import React from 'react'
import {Button, Card} from "react-bootstrap";

function BeerItem(props) {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.beerInfo.image_url} style={{width: '3rem'}}/>
            <Card.Body>
                <Card.Title>{props.beerInfo.name}</Card.Title>
                <Card.Text>{props.beerInfo.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export {BeerItem}