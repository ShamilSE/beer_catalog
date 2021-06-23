import React from 'react'
import {Button, Card} from "react-bootstrap";
import "./general.css"

function BeerItem(props) {
    return (
        <Card style={{width: '18rem'}}>
            <Card.Img variant="top" src={props.beerInfo.image_url} className="center"/>
            <Card.Body>
                <Card.Title>{props.beerInfo.name}</Card.Title>
                <Card.Text>{props.beerInfo.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    )
}

export {BeerItem}