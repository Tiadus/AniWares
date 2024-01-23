import ItemCard from "../components/ItemCard";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QueryBoard = () => {
    const withFilter = () => {
        return (
            <Row className="gy-4">
            <Col xxl={3} xl={3} lg={3} md={12} sm={12}>
                <Col>Filter Value</Col>
                <Col>Filter Value</Col>
                <Col>Filter Value</Col>
                <Col>Filter Value</Col>
                <Col>Filter Value</Col>
            </Col>
            <Col xxl={9} xl={9} lg={9} md={12} sm={12}>
                <Row xxl={3} xl={2} lg={2} md={2} sm={2} className="gy-4">
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
            </Col>
            </Row>
        );
    }
        
    const withoutFilter = () => {
        <Row className="gy-4">
            <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
            <Row xxl={4} xl={4} lg={2} md={2} sm={2} className="gy-4">
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
            </Col>
        </Row>
    }

    return(
        <h1>WIP</h1>
    )
}

export default QueryBoard;