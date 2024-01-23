import "bootstrap/dist/css/bootstrap.min.css";
import ItemCard from "../components/ItemCard";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const DisplayBoard = () => {
    let lg=6;
    let xl=3;
    return (
        <Container>
            <div style={{width: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <div 
                    className="col-sm-4 col-md-4 col-lg-4" 
                    style=
                    {{borderBottom: "3px solid #7CFC00",
                    textAlign:"center",
                    alignItems: 'center',
                    fontSize: "3em",
                    color: "#d95f76",
                    borderTop: "3px solid #41980a"}}
                >
                    On Sale
                </div>
            </div>
            <Row className="gy-4" style={{marginTop: "10px", borderTop: "2px solid grey"}}>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} className='hover-shadow' style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="rem.jpg"/>
                </Col>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="erisss.jpg"/>
                </Col>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="eriss.jpg"/>
                </Col>
                <Col xxl={3} xl={6} lg={6} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="emilia.jpg"/>
                </Col>
                <Col lg={3} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="nino.jpg"/>
                </Col>
                <Col lg={3} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="melusine.jpeg"/>
                </Col>
                <Col lg={3} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="morgan.jpg"/>
                </Col>
                <Col lg={3} md={6} sm={12} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <ItemCard image="eris.jpg"/>
                </Col>
            </Row>
        </Container>
    );
}

export default DisplayBoard;