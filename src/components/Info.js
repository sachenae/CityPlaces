import React, { Component } from 'react';

class Info extends Component {

    render(){   
        const {places } = this.props
        const list = places.map((obj, i) => {
            return (
                <div onClick={() => this.props.selectionAdded(obj)} className="card border-info mb-3" key= {i}>
                    <div className="row no-gutters">
                            <div className="col-md-4">
                            <img 
                            className="w-100"
                            style={{width: `100%`, height: `100%`, maxHeight: '180px', minWidth: '180px' }} 
                            src={obj.image} alt=''
                            >
                            </img>
                        </div>
                        <div className="col-md-8 px-2">
                        <div className="card-block px-2 text-left">
                                <h6 className="card-title">{obj.name}</h6>
                                <p className="card-text">{obj.description}</p>
                            </div> 
                        </div>
                     </div>
                        
                </div>
            )
        })

        return(
            <div>
                <h5>
                    <em>
                        <strong>Choose your Destinations</strong>
                        <p>Click to select</p>
                    </em>
                </h5>
                <hr/>
                
                <ul className="nav nav-pills nav-stacked" style={{height: '660px', overflowY: 'scroll' }}>
                <li className="nav-item">
      {list}
    </li>
                    
                    </ul>
                </div>
            
        );
    }
}

export default Info;