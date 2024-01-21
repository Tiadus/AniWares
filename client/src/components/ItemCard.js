import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ItemCard(props) {
    return (
      <Card style={{ width: '17rem', height:"35rem"}}>
        <div style={{ width: '100%', height:"100%"}}> 
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: "5px solid green", height: "72%"}}>
                <Card.Img variant="top" src={props.image} style={{maxHeight:"100%", maxWidth:"100%", objectFit: 'cover'}}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <Card.Body>
                <Card.Title style={{textAlign: 'center'}}>Item Name</Card.Title>
                <Card.Title style={{textAlign: 'center'}}>Item Price</Card.Title>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button variant="primary">Add To Cart</Button>
                </div>
                </Card.Body>
            </div>
        </div>
      </Card>
    );
  }
  
  export default ItemCard;