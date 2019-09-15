/* jshint ignore:start */
import React, { Component } from 'react';

let STORAGE_DATA = [];

class Form extends Component{
	constructor(props){
		super(props);
		this.addSticky = this.addSticky.bind(this);
		this.saveDataInStorage = this.saveDataInStorage.bind(this);
	}	
	addSticky(e){		
		e.preventDefault();
		let stickyTitle = e.target.stickyTitle.value.trim();
		let stickyBody = e.target.stickyBody.value.trim();

		if(! stickyTitle && ! stickyBody){
			return;
		}

		if(stickyTitle.length === 0){
			stickyTitle = stickyBody.split(' ')[0];
		}

		e.target.stickyTitle.value = '';
		e.target.stickyBody.value = '';

		this.saveDataInStorage(stickyTitle, stickyBody);
	}

	saveDataInStorage(title, body){
		const STICKY_DATA = {stickyTitle: '', stickyBody: '', date: ''};
		const storageData = JSON.parse(localStorage.getItem('stickyData'));

		STICKY_DATA.stickyTitle = title;
		STICKY_DATA.stickyBody = body;
		STICKY_DATA.date = new Date().toLocaleString("RU").slice(0, -3);

		if (storageData){
			STORAGE_DATA = storageData;
			STORAGE_DATA.unshift(STICKY_DATA);
			localStorage.setItem('stickyData', JSON.stringify(STORAGE_DATA));
		} else {
			STORAGE_DATA.unshift(STICKY_DATA);
			localStorage.setItem('stickyData', JSON.stringify(STORAGE_DATA));
		}
		window.location.reload(true);
	}
	
	render(){
		return (
			<form className="align-middle" onSubmit={this.addSticky}>
				<div className="form-group">
					<input 
						name="stickyTitle"
						type="text" 
						className="form-control form-control-lg" 
						placeholder="Title..."
					/>
					<textarea 
						name="stickyBody"
						className="form-control form-control-lg" 
						placeholder="Type sticky..."
					>
					</textarea>
				</div>
				<button 
					type="submit" 
					className="form-control btn btn-lg btn-block"
				>
					Add sticky
				</button>
			</form>
		);
	};
};

export default Form;
/* jshint ignore:end */