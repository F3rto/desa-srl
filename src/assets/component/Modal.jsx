import {MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalHeader, MDBModalBody, MDBModalFooter,} from 'mdb-react-ui-kit';

export default function Modal(props) {
    /**
     * lista props:
     * crossFnc
     * body
     * btn1Txt
     * btn1Fnc
     * btn2Txt
     * btn2Fnc
     * modal
     * setModal
     * 
     * <Modal crossFnc={chiudi} body="Errore imprevisto! Articolo non aggiunto." btn1Txt="Close" btn1Fnc={chiudi} btn2Txt="" btn2Fnc={()=>{}} modal={erroreModal} setModal={setErroreModal}/>
     */
  return (
    <>
      <MDBModal show={props.modal} setShow={props.setModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBBtn className='btn-close' color='none' onClick={props.crossFnc}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>{props.body}</MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='danger' onClick={props.btn1Fnc}>{props.btn1Txt}</MDBBtn>
              {props.btn2Txt != "" ?<MDBBtn color='success' onClick={props.btn2Fnc}>{props.btn2Txt}</MDBBtn> : <></>}
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}