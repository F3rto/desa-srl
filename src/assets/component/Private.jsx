import { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import '../../App.css'
import { MDBContainer, MDBInput, MDBBtn, MDBRipple, MDBValidation, MDBValidationItem, MDBIcon } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import logo from '../images/logo.png'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from "../../../firebase";
import Spinner from "./Spinner"


export default function Private() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [user, loading, err] = useAuthState(auth);
    const [showSpinner, setShowSpinner] = useState(false);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [errorCode, setErrorCode] = useState("");


    useEffect(() => {
        if (loading) {
            //console.log("loading...");
        }
        if (user) {
            navigate("/area_riservata");
        }
    }, [user, loading]);

    async function login() {
        try {
            setShowSpinner(true);
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (err) {
            setShowSpinner(false)
            let code = err.message + "";
            code = code.substring(17, code.length - 2);
            setShow(true);
            console.log(code);
            switch (code) {
                case 'auth/invalid-email':
                    setErrorCode("Email mancante o non valida");
                    break;
                case 'auth/internal-error':
                    setErrorCode("Credenziali errate");
                    break;
                case 'auth/wrong-password':
                    setErrorCode("Password errata");
                    break;
            }
        }
    }

    return (
        <div className='principale'>
            {
                showSpinner ?
                <Spinner/>
                :
                <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
                    <MDBRipple rippleTag='a'>
                        <img src={logo} className='img-fluid ' alt='logo' />
                    </MDBRipple>
                    <br />
                    <MDBValidation>
                        <MDBValidationItem feedback="">
                            <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email' required onChange={(event) => {
                                setLoginEmail(event.target.value);
                            }} />
                        </MDBValidationItem>

                        <MDBValidationItem feedback="">
                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' required name='pswd' onChange={(event) => {
                                setLoginPassword(event.target.value);
                            }} />
                        </MDBValidationItem>

                        <Alert variant='danger' show={show}>
                            {errorCode}
                        </Alert>

                        <MDBBtn color='dark' className="mb-4" onClick={login}>
                            <MDBIcon className='me-2' fas icon='sign-in-alt' /> Login
                        </MDBBtn>

                    </MDBValidation>

                    <div className="text-center">
                        <p>Se hai dimenticato la password contatta l'amministratore del sistema.</p>
                    </div>
                </MDBContainer>
            }
        </div>
    );
}
