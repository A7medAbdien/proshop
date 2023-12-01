import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const DriverScreen = () => {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [numSeats, setNumSeats] = useState('');
    const [at, setAt] = useState();

    // const dispatch = useDispatch();
    const navigate = useNavigate();

    // const [register, { isLoading }] = useRegisterMutation();

    // const { userInfo } = useSelector((state) => state.auth);

    // const { search } = useLocation();
    // const sp = new URLSearchParams(search);
    // const redirect = sp.get('redirect') || '/';

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate(redirect);
    //     }
    // }, [navigate, redirect, userInfo]);


    const getFromLocation = (e) => {
        console.log("getFromLocation form Google Map API");
        setFromLocation(e.target.value)
    }

    const getToLocation = (e) => {
        console.log("getToLocation form Google Map API");
        setToLocation(e.target.value)
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        console.log({
            fromLocation,
            toLocation,
            numSeats,
            at,
        });
    };

    return (
        <FormContainer>
            <h1>Trip Form</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group className='my-2' controlId='from'>
                    <Form.Label>From Location</Form.Label>
                    <Form.Control
                        type='string'
                        placeholder='Enter From Location'
                        value={fromLocation}
                        onChange={getFromLocation}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='to'>
                    <Form.Label>To Location</Form.Label>
                    <Form.Control
                        type='string'
                        placeholder='Enter To Location'
                        value={toLocation}
                        onChange={getToLocation}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='numSeats'>
                    <Form.Label>Number of Seats</Form.Label>
                    <Form.Control
                        type='number'
                        placeholder='Enter Number of Seats'
                        value={numSeats}
                        onChange={(e) => setNumSeats(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='at'>
                    <Form.Label>Enter time of your trip</Form.Label>
                    <Form.Control
                        type='time'
                        placeholder='Enter time of your trip'
                        value={at ? at : new Date(Date.now()).toLocaleTimeString('en-US', { hour12: false })}
                        onChange={(e) => setAt(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                {/* <Button disabled={isLoading} type='submit' variant='primary'>
                    Register
                </Button> */}
                <Button type='submit' variant='primary'>
                    Add The Trip
                </Button>

                {/* {isLoading && <Loader />} */}
            </Form>

            <Row className='py-3'>
                {/* <Col>
                    Already have an account?{' '}
                    <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                        Login
                    </Link>
                </Col> */}
            </Row>
        </FormContainer>
    );
};

export default DriverScreen;
