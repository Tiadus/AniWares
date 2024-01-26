import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./ItemCard.css";

function ItemCard({item}) {
    return (
      <Card className='itemCard'>
          <div className='cardImageContainer'>
              <Card.Img variant="top" src={item.itemImage} style={{width: "100%", height: "100%", objectFit: "scale-down"}}/>
          </div>
          <Card.Body className='cardBody'>
              <div>
                <Card.Title className='itemName'>
                  {item.itemType}
                  {item.itemScale === "" ? " " : " " +  item.itemScale + " "} 
                  {item.itemSeries} {item.itemName}
                </Card.Title>
                <Card.Title className='itemPrice'>
                  {item.itemDiscount > 0 ? "NOW $" : "$"}
                  {parseFloat((item.itemPrice - (item.itemPrice * item.itemDiscount)).toFixed(2))}
                </Card.Title>
                <div className='itemButtonContainer'>
                    <Button className='itemButton' variant="outline-succcess">ADD TO CART</Button>
                </div>
              </div>
          </Card.Body>
      </Card>
    );
  }
  
  export default ItemCard;