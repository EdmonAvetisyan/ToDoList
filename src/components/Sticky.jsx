/* jshint ignore:start */ 
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Sticky = (props)=>{
	return (
    <div className="card sticky">
      <div className="card-header text-center">
        <button 
          className="delete-btn"
          onClick = {props.deleteSticky}
          data-index = {props.data_index}
        >
          &#x2716;
        </button>
        <p>{props.stickyTitle}</p>
      </div>
      <div className="card-body">
        <p>{props.stickyBody}</p>
        <p className="card-text">
          <small className="text-muted">
            {props.date}
          </small>
        </p>
      </div>
    </div>
	);
};

export default Sticky;
/* jshint ignore:end */ 