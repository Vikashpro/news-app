import React, { Component } from 'react'

export class NewsItems extends Component {

    render() {
    let {title, description,imgURL, url,author, date,source} = this.props;


    return (
<div className="card" style={{width: "18rem"}}>
  

        <img src={imgURL} className="card-img-top" alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}<span class="badge text-bg-secondary">{source}</span></h5>
          <p className="card-text">{description}</p>
          <p class="card-text"><small class="text-muted">By <cite title="Author">{author?author:'Unknown'}</cite> on {new Date(date).toGMTString()}</small></p>
          <a href={url} target="blank" className="btn btn-sm btn-primary">Read More</a>
        </div>
      </div>
    )
  }
}

export default NewsItems
