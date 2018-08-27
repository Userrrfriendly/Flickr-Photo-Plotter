import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Map from './components/map';
import MarkerList from './components/markersList';
import Footer from './components/footer';

class App extends Component {
  state = {
    defaultMarkers:[],
    geoPhotosMarkers:[],
    defaultLocations: [
      {title: 'Rhodes', location: {lat: 36.203525, lng: 27.947093}},
      {title: 'Kos', location: {lat: 36.834969, lng: 27.145413}},
      {title: 'Patmos', location: {lat: 37.308679, lng: 26.546345}},
      {title: 'Astypalaia', location: {lat: 36.553647, lng: 26.314539}},
      {title: 'Kalymnos', location: {lat: 36.982527, lng: 26.98345}},
      {title: 'Karpathos', location: {lat: 35.545921, lng: 27.150171}},
      {title: 'Leipsoi', location: {lat: 37.30141, lng: 26.744271}},
      {title: 'Leros', location: {lat: 37.144199, lng: 26.843606}},
      {title: 'Nisyros', location: {lat: 36.590521, lng: 27.165803}},
      {title: 'Symi', location: {lat: 36.597748, lng: 27.831788}},
      {title: 'Tilos', location: {lat: 36.447799,lng: 27.347907}},
      {title: 'Kastellorizo', location: {lat: 36.142716, lng: 29.583504}},
      {title: 'Delos', location:{lat: 37.392021, lng: 25.271401}},
      {title: 'Santorini', location:{lat: 36.391760, lng: 25.466727}},
      // {title: 'Arkksi', location: {lat: 37.385147, lng: 26.736431}}, //intentionally wrong title used for debugging
    ],
    showModalImage: false,
    modalImageUrl: '',
    modalImgAlt: ''
  }

  getDefaultLocations = ()=> {
    return this.state.defaultLocations;
  }

  changeStateAll = (newState)=> {
    //Updates all default landmark markers. Runs once on App init. 
    this.setState({
      defaultMarkers: newState
    });
  }

  changeStateSingle = (marker)=> {
    //updates one marker at a time.
    this.setState((state)=>{
      return {
        defaultMarkers: state.defaultMarkers.map((m)=>{
          if (m.id === marker.id ) m = marker;
          return m;
      })
    }
    })
  }

  plotPhotoOnMap = (marker)=> {
    const newState = this.state.geoPhotosMarkers;
    newState.push(marker);
    this.setState({
      geoPhotosMarkers: newState
    });
  }

  passAppState = () => {
    const tempState = []
    tempState.push(this.state);
    return tempState;
  }

  imageClick = (e)=> {
    //Opens image-modal on click on an infowindow's image
    this.setState({
      showModalImage: true,
      modalImageUrl: e.target.src,
      modalImgAlt: e.target.alt
    });
    document.addEventListener('keydown', this.trapTabKey, true);
  }

  trapTabKey = (e)=> {
    const closeModalBtn = document.getElementById('close-modal');
    if (e.keyCode === 9) {
      //trap focus if the user presses the tab key
      e.preventDefault();
      closeModalBtn.focus();
    }
    if (e.keyCode === 27) {
      // close modal if the user presses escape key
      this.closeModal(e,true);
    }

  }

  closeModal = (e,keyPress=false)=>{
    const appInstance = this;
    if (keyPress) {
      //if the escape key is pressed close the modal
      document.removeEventListener("keydown", this.trapTabKey, true)
      this.setState({
        showModalImage: false
      })
    }
    if (e.target.classList.contains("overlay") || e.target.id === "close-modal" || e.target.classList.contains('modal-window')) {
      document.removeEventListener("keydown", appInstance.trapTabKey, true);//restore normal focus order
      this.setState({
        showModalImage: false
      })
    }
  }

  render() {
    return (
      <div className="App">
          {this.state.showModalImage && <div id ="modal" className="overlay" onClick={this.closeModal}>
          <div className="modal-window">
            <button id="close-modal" onClick={this.closeModal}>X</button>
            <picture id="modal-image">
              <source srcSet={this.state.modalImageUrl.replace('t.jpg', 'b.jpg')} media="(min-width: 600px)"></source>
              <img src={this.state.modalImageUrl.replace('_t.jpg','.jpg')} alt={this.state.modalImgAlt}></img>
            </picture>
          </div>
          </div>}
        <Header />
        <main>
          <MarkerList
            passAppState={this.passAppState}
            changeStateAll={this.changeStateAll}
          />
          <Map
            imageClick={this.imageClick}
            getDefaultLocations={this.getDefaultLocations}
            plotPhotoOnMap={this.plotPhotoOnMap}
            changeStateSingle={this.changeStateSingle}
            changeStateAll={this.changeStateAll}  
          />
        </main>
        <Footer />
      </div>
    );
  }
}

export default App;
