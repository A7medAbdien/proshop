import { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Product = ({ product }) => {
    return (
        <Card className='my-3 p-3 rounded'>
            <LinkContainer to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </LinkContainer>

            <Card.Body>
                <LinkContainer to={`/product/${product._id}`}>
                    <Card.Title as='div'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </LinkContainer>

                <Card.Text as='h3'>${product.price}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default Product;