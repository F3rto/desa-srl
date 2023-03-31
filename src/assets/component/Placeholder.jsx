import { MDBCard, MDBCardBody, MDBCardText, MDBCardTitle, MDBCardImage } from "mdb-react-ui-kit";
import '../../App.css';
import image from '../images/placeholder-image.png'
 
export default function Placeholder(props) {

    return (
        <div className="articolo">
            <MDBCard alignment="start" className='mb-3 w-75' aria-hidden='true' shadow="5">
                <img
                    src={image}
                    className='img-fluid w-25'
                    position='top'
                    alt='...'
                />
                <MDBCardBody alignment="left">
                    <MDBCardTitle className="placeholder-glow">
                        <span className="placeholder col-4"></span>
                    </MDBCardTitle>
                    <MDBCardText className="placeholder-glow">
                        <span className="placeholder col-3"></span>
                    </MDBCardText>
                    <MDBCardText className="placeholder-glow">
                        <span className="placeholder col-8"></span>
                    </MDBCardText>
                    <MDBCardText className="placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </MDBCardText>
                    <MDBCardText className="placeholder-glow">
                        <span className="placeholder col-7"></span>
                    </MDBCardText >
                    <MDBCardText className="placeholder-glow">
                        <span className="placeholder col-3"></span>
                    </MDBCardText>
                </MDBCardBody>
            </MDBCard>
        </div>
    )

}