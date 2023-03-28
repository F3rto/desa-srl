import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import i1 from '../images/1.jpg'
import i2 from '../images/2.jpg'
import i3 from '../images/3.jpg'


export default function Carosello(props) {
  
  return (
    <MDBCarousel showControls showIndicators dark>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src={i1}
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src={i2}
        alt='...'
      />
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src={i3}
        alt='...'
      />
    </MDBCarousel>
  );
}