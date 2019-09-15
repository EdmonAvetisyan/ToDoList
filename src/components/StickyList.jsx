/* jshint ignore:start */
import React, { Component } from 'react';
import Sticky from './Sticky';
import DefaultSticky from './DefaultSticky';

class StickyList extends Component{
  constructor(props){
    super(props)
    this.state = {stickyData: localStorage.getItem('stickyData')}
  }

  deleteSticky(title, event){
    const conf = window.confirm(
      `Do you want to delete this sticky ?
      
        "${title}"`
    );
    
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
                      deleteSticky={this.deleteSticky.bind(this, sticky.stickyTitle)}
                      data_index={index}
                    />
                  )
                })
                :
                <DefaultSticky />
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