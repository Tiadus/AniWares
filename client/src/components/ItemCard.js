import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./ItemCard.css";

function ItemCard(props) {
    return (
      <Card className='itemCard'>
          <div className='cardImageContainer'>
              <Card.Img variant="top" src={props.image}/>
          </div>
          <Card.Body className='cardBody'>
              <div>
                <Card.Title className='itemName'>S.H.Figuarts Frieren "Frieren: Beyond Journey's End"</Card.Title>
                <Card.Title className='itemPrice'>Now $100</Card.Title>
                <div className='itemButtonContainer'>
                    <Button className='itemButton' variant="outline-succcess">ADD TO CART</Button>
                </div>
              </div>
          </Card.Body>
      </Card>
    );
  }
  
  export default ItemCard;