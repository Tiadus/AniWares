import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
import Image from 'react-bootstrap/Image';

function Banner() {
  return (
    <Carousel variant='dark' fade controls="true" touch="true">
        <Carousel.Item interval={2000}>
          <Image src="/banners/banner1.jpg" fluid className='bannerImage'/>
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Image src="/banners/banner2.jpg" fluid className='bannerImage'/>
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Image src="/banners/banner3.jpg" fluid className='bannerImage'/>
          <Carousel.Caption>
            <h3></h3>
            <p></p>
          </Carousel.Caption>
        </Carousel.Item>
    </Carousel>
  );
}

export default Banner;