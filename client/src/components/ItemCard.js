import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ItemCard(props) {
    return (
      <Card style={{ width: '100%', height:"100%"}}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "72%"}}>
              <Card.Img variant="top" src={props.image} style={{maxHeight:"100%", maxWidth:"100%"}}/>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <Card.Body>
              <Card.Title style={{textAlign: 'center', height: "90px", overflow: "hidden", fontSize: "1.5em"}}>
                S.H.Figuarts Frieren "Frieren: Beyond Journey's End"
              </Card.Title>
              <Card.Title style={{textAlign: 'center', height: "50px", fontSize: "2.5em"}}>Now $100</Card.Title>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <Button 
                    variant="outline-succcess"
                    style=
                    {{backgroundImage: "linear-gradient(to bottom right, #7CFC00, cyan)",
                    height:"50px",
                    width: "200px",
                    fontFamily: "Poppins",
                    color: "black"
                    }}>
                      ADD TO CART
                    </Button>
              </div>
              </Card.Body>
          </div>
      </Card>
    );
  }
  
  export default ItemCard;