import "bootstrap/dist/css/bootstrap.min.css";
import ItemCard from "../components/ItemCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayBoard = (props) => {
    const deployItems = () => {
        let displayItems = props.items.map(item => {
            return (
                <Col key={item.itemCode} style={{display: 'flex', alignItems: 'center', justifyContent: 'center', height: "70vh"}}>
                    <ItemCard image="images/rem.jpg" item={item}/>
                </Col>
            )
        })
        return displayItems;
    }

    return (
        <Row xxl={4} xl={4} lg={2} md={2} sm={2} className="gy-4" style={{borderTop: "2px solid grey"}}>
            {deployItems()}
        </Row>
    );
}

export default DisplayBoard;