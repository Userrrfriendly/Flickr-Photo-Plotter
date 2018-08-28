import React from 'react';
import './css/markerList.css'
class MarkersList extends React.Component {
    state = {
        query:'',
    }
    
    defaultMarkers = ()=> {
        return this.props.passAppState()[0].defaultMarkers;
    }

    updateQuery = (query)=> {
        this.setState({query}, ()=>{
            this.filterDisplayMarkers(this.state.query);
        });
    }
    
    filterDisplayMarkers = (q)=> {
        const lq = q.toLowerCase();
        const markers = this.defaultMarkers();
        if (q) {
            const newState = markers.map((marker)=> {
                !marker.title.toLowerCase().includes(lq) ? marker.setMap(null) : marker.setMap(window.map);
                return marker; 
            })
            this.props.changeStateAll(newState);
        } else {
            const newState = this.defaultMarkers().map((marker)=> {
                marker.setMap(window.map);
                return marker;
            });
            this.props.changeStateAll(newState);
        }
    }

    markerClick = (e) => {
        if (this.props.passAppState()[0].googleMapsError) {
            alert('it seems that google maps API is not loaded correctly...cannot display markers without google maps')
        } else {
            const marker = this.props.passAppState()[0].defaultMarkers.filter((m)=>{
                return m.title === e.target.id;
            });
            window.google.maps.event.trigger(marker[0],'click');
        }
    }

    render () {
        let markers = this.defaultMarkers().filter((marker)=> {
            return marker.map !== null;
        });

        return (
            <aside id="left-aside" >
                <div id="aside-content" className="animated">
                    <input aria-label="filter marker list"
                    type="text"
                    placeholder="Filter by location"
                    value={this.state.query}
                    onChange={(e)=>{this.updateQuery(e.target.value)}}
                    />
                    <section className='marker-list'>
                        <ul>
                            {markers.map((m)=>{
                                return (
                                    <li key={m.title}><button id={m.title} onClick={this.markerClick} className="menu-button">{m.title}</button></li>
                                )
                            })}
                        </ul>
                    </section>
                </div>
            </aside>
        )
    }
}

export default MarkersList;
