/* jshint ignore:start */
import React, { Component } from 'react';
import Sticky from './Sticky';
import defaultSticky from '../img/default-sticky.png';

class StickyList extends Component{
  constructor(props){
    super(props)
    this.deleteSticky = this.deleteSticky.bind(this);
    this.state = {stickyData: localStorage.getItem('stickyData')}
  }

  deleteSticky(event){
    const conf = window.confirm('Do you want to delete this sticky ?');
    
    if(conf){
      const index = event.target.attributes['data-index'].value;
      let stickyData = JSON.parse(this.state.stickyData);
      stickyData.splice(index, 1);
      localStorage.setItem('stickyData', JSON.stringify(stickyData));
      this.setState({stickyData: localStorage.getItem('stickyData')});
      
      if(stickyData.length === 0){
        localStorage.removeItem('stickyData');
        this.setState({stickyData: localStorage.getItem('stickyData')});
      }
    }
  }
  
  render(){
    const stickyData = JSON.parse(this.state.stickyData);

    return (
      <section id="sticky-list">
        <div className="sticky-box">
          <div className="container-fluid">
            <div className="card-columns">
              {
                stickyData != null
                ?
                stickyData.map((sticky, index)=>{
                  return(
                    <Sticky 
                      stickyTitle={sticky.stickyTitle} 
                      stickyBody={sticky.stickyBody}
                      date={sticky.date}
                      key={index}
                      deleteSticky={this.deleteSticky}
                      data_index={index}
                    />
                  )
                })
                :
                <img src={defaultSticky} alt="sticky" className='default-sticky'/>
              }
            </div>
          </div>
        </div>
      </section>
    );
  };
};

export default StickyList;
/* jshint ignore:end */