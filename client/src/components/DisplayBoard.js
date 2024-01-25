import "bootstrap/dist/css/bootstrap.min.css";
import ItemCard from "../components/ItemCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayBoard = (props) => {
    const deployItems = () => {
        let displayItems = props.items.map(item => {
            return (
                <Col md={12} sm={9} key={item.itemCode}>
                    <ItemCard image="images/rem.jpg" item={item}/>
                </Col>
            )
        })
        return displayItems;
    }

    return (
        <Row xxl={4} xl={4} lg={2} md={1} sm={1} className="gy-4" style={{borderTop: "2px solid grey", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            {deployItems()}
        </Row>
    );
}

export default DisplayBoard;