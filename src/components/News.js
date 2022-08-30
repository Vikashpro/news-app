import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {
    //articles =  [];
     api_key = process.env.REACT_APP_NEWS_API_KEY;
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,


    }
    constructor(){
        super();
        this.state = {
            articles: [],
            loading:false,
            page:1,
            totalResults:0,
        
        }
    }
   componentDidMount(){
     this.fetchArticles(this.state.page);

    }
    async fetchArticles(page){
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.api_key}&page=${page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.setState({loading:true});
        let parsedData = await data.json();
        this.setState({articles:parsedData.articles,totalResults:parsedData.totalResults, loading:false});
        this.setState({totalResults:parsedData.totalResults});


    }
    handlePreClick = ()=>{
        this.setState({
            page:this.state.page - 1,
        })
        this.fetchArticles(this.state.page-1);
    }
    handleNextClick = ()=>{
        this.setState({
            page:this.state.page + 1,
        })
        this.fetchArticles(this.state.page+1);

    }

    render() {
        return (
            <div className="container my-3">
                <h2> Daily News - Daily Update</h2>
                {this.state.loading && <Spinner/>}
                <div  className="row">
                    {
                        !this.state.loading && this.state.articles.map((element)=>{
                            return <div key={element.url} className="col-md-4 my-2"><NewsItems
                            title={element.title?element.title.slice(0,44):""}
                            description={element.description?element.description.slice(0,88):""}
                            imgURL={element.urlToImage}
                            url={element.url}
                            author={element.author}
                            date={element.publishedAt}
                            source={element.source.name}/> 
                            </div>
                        })}
                </div>
                <div className="container d-flex justify-content-between">
                <button type="button" disabled={this.state.page<=1} className="btn btn-primary" onClick={this.handlePreClick}>Previous</button>
                <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-primary" onClick={this.handleNextClick}>Next</button>
                </div>
            </div>
        );
    }
}

export default News;
