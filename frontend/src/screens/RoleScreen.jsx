import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RoleScreen = () => {

    const navigate = useNavigate();

    const handelPassenger = () => {
        // navigate('/passenger');
        console.log("set isDriver to false");
    }
    const handelDriver = () => {
        navigate('/driver');
        console.log("set isDriver to true");
    }

    return (
        <div class="d-flex justify-content-center gap-5">

            <Card style={{ maxWidth: '18rem' }}>
                <Card.Body>
                    <Card.Title>Driver</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic molestiae accusamus laudantium ipsum nihil!
                    </Card.Text>
                    <Button variant="primary" onClick={handelDriver}>Driver</Button>
                </Card.Body>
            </Card>

            <Card style={{ maxWidth: '18rem' }}>
                <Card.Body>
                    <Card.Title>Passenger</Card.Title>
                    <Card.Text>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. In hic molestiae accusamus laudantium ipsum nihil!
                    </Card.Text>
                    <Button variant="primary" onClick={handelPassenger}>Passenger</Button>
                </Card.Body>
            </Card>

        </div>
    );
};

export default RoleScreen;