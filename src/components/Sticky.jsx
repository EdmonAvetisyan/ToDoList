/* jshint ignore:start */ 
import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Sticky extends Component{
  constructor(props){
    super(props);
    this.state = {
      isEdit: false,
      stickyTitle: '',
      stickyBody: '',
      date: '',
    }

    this.titleRef = React.createRef();
    this.titleInputRef = React.createRef();
    this.bodyRef = React.createRef();
    this.bodyTextareaRef = React.createRef();

    this.editeSticky = this.editeSticky.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }
  
  editeSticky(){
    if(this.state.isEdit){
      return;
    } 

    this.setState(
      {
        isEdit: ! this.state.isEdit,
        stickyTitle: this.titleRef.current.textContent,
        stickyBody: this.bodyRef.current.textContent,
      }, 
      ()=>{
        this.titleInputRef.current.value = this.state.stickyTitle;
        this.bodyTextareaRef.current.value = this.state.stickyBody;
      }
    );
    
  }

  saveEdit(event){
    const index = event.target.attributes['data-index'].value;

    this.setState({
      isEdit: ! this.state.isEdit,
      stickyTitle: this.titleInputRef.current.value,
      stickyBody: this.bodyTextareaRef.current.value,
    }, this.saveInStorage.bind(this, index));
  }

  saveInStorage(stickyIndex){
    this.titleRef.current.textContent = this.state.stickyTitle;
    this.bodyRef.current.textContent = this.state.stickyBody;

    const editedSticky = {
      stickyTitle: this.state.stickyTitle.trim(),
      stickyBody: this.state.stickyBody.trim(),
      date: new Date().toLocaleString("RU").slice(0, -3),
    }

    let storageData = JSON.parse(localStorage.getItem('stickyData'));
    storageData[stickyIndex] = editedSticky;
    localStorage.setItem('stickyData', JSON.stringify(storageData));
  }

  cancelEdit(){
    console.log('cancel');

    this.setState({
      isEdit: ! this.state.isEdit,
    });
  }

  render(){
    return (
      <div className="card sticky">
        <div className="card-header text-center">
          <div className="btn-group">
            <button 
              className="edit-btn"
              onClick = {this.editeSticky}
            >
              &#x270E;
            </button>
            <button 
              className="delete-btn"
              onClick = {this.props.deleteSticky}
              data-index = {this.props.data_index}
            >
              &#x2715;
            </button>
          </div>  
          {
            ! this.state.isEdit 
            ? 
            <p ref={this.titleRef}>{this.props.stickyTitle}</p>
            :
            <input 
              ref={this.titleInputRef}
              className="form-control form-control-sm" 
              defaultValue={this.props.stickyTitle} 
              placeholder="Title..."
            />
          }
        </div>
        <div className="card-body">
          {
            ! this.state.isEdit 
            ? 
            <p ref={this.bodyRef}>{this.props.stickyBody}</p>
            :
            <div>
              <textarea 
                ref={this.bodyTextareaRef}
                className="form-control form-control-sm" 
                defaultValue={this.props.stickyBody}
                placeholder="Type sticky..."
              >
              </textarea>
              <div className="btn-group w-100">
                <button 
                  className="btn btn-sm" 
                  data-index = {this.props.data_index} 
                  onClick = {this.saveEdit}
                >
                  save
                </button>
                <button 
                  className="btn btn-sm" 
                  onClick = {this.cancelEdit}
                >
                  cancel
                </button>
              </div>
              
            </div>
          } 
          <p className="card-text">
            <small className="text-muted">
              {this.props.date}
            </small>
          </p>
        </div>
      </div>
    );
  }
};

export default Sticky;
/* jshint ignore:end */ 