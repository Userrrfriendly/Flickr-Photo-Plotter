import React from 'react';
import Modal from 'react-modal';
 
class ModalImage extends React.Component {
    constructor () {
      super();
      this.state = {
        showModal: false
      };
      
      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
    }
    
    handleOpenModal () {
      this.setState({ showModal: true });
    }
    
    handleCloseModal () {
      this.setState({ showModal: false });
    }
    
    render () {
      return (
        <div>
          <Modal 
             isOpen={this.state.showModal}
             contentLabel="Minimal Modal Example"
          >
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </Modal>
        </div>
      );
    }
  }
  
  const props = {};

  export default ModalImage
  // ReactDOM.render(<ModalImage {...props} />, document.getElementById('main'))