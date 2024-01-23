import "bootstrap/dist/css/bootstrap.min.css";
import ItemCard from "../components/ItemCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayBoard = () => {
    return (
        <Row xxl={4} xl={4} lg={2} md={2} sm={2} className="gy-4" style={{borderTop: "2px solid grey"}}>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="rem.jpg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="erisss.jpg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="eriss.jpg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="emilia.jpg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="nino.jpg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="melusine.jpeg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="morgan.jpg"/>
            </Col>
            <Col style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <ItemCard image="eris.jpg"/>
            </Col>
        </Row>
    );
}

export default DisplayBoard;