import "bootstrap/dist/css/bootstrap.min.css";
import DisplayBoard from "../components/DisplayBoard";
import Container from 'react-bootstrap/Container';
import "./Home.css"

const Home = () => {
    return(
        <div>
            <div className="captionHolder">
                <div className="col-sm-4 col-md-4 col-lg-4 caption">On Sale</div>
            </div>
            <Container className="boardHolder">
                <DisplayBoard /> 
            </Container> 
        </div>
    );
}

export default Home;