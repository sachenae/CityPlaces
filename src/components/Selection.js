import React, { Component } from 'react';

class Selection extends Component {

    render(){   
        const selectedList = this.props.selected.map((obj, i) => {
            
            return (
                <div  className="card border-success mb-3" key= {i}>
                    <div className="row no-gutters">
                        <div className="col-md-12 px-2">
                            <div className="card-block px-2 text-left">
                                <h6 >{obj.name}
                                    <button onClick={() => this.props.selectionRemoved(obj)} type="button" className="close" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </h6>
                            </div> 
                        </div>
                     </div>
                        
                </div>
            )
        })

        return(
            <div>
                <h5 >
                    <em>
                        <strong>Selected Destinations</strong>
                    </em>
                </h5>
                <hr/>     
                    {selectedList}        
                </div>
            
        );
    }
}

export default Selection;