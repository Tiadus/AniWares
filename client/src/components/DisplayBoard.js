import "bootstrap/dist/css/bootstrap.min.css";
import ItemCard from "../components/ItemCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayBoard = (props) => {
    const deployItems = () => {
        let displayItems = props.items.map(item => {
            return (
                <Col key={item.itemCode}>
                    <ItemCard image="images/rem.jpg" item={item}/>
                </Col>
            )
        })
        return displayItems;
    }

    return (
        <Row xxl={props.withFilter === true? 3:4} xl={props.withFilter === true? 3:4} lg={2} md={1} sm={1} className="gy-4" style={{borderTop: "2px solid grey"}}>
            {deployItems()}
        </Row>
    );
}

export default DisplayBoard;