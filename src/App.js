import React from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { trackPromise } from 'react-promise-tracker';
import Loader from 'react-loader-spinner';

import ArticleCard from './Component/ArticleCard'
import LoadingIndicator from './index';
import SearchCard from './Component/Search-card'
import Navbar from './Component/Navbar'
import NotFound from './Component/NotFound'


class App extends React.Component {


	constructor( props ) {


		super( props );

		this.state = {
			queryNut: '',
			nutritionResults: {},
			articleResults: {},
			thumbnailResults: {},
			loadingArticle: true,
			nutritionMessage: '',
			articleMessage: ''
		};
	}

	fetchSearchnutritionResults = (updatedPageNo = '', queryNut ) => {

		// const pageNumber = updatedPageNo ? `&page=${updatedPageNo}` : '';

		// By default the limit of nutritionResults is 20
		const searchUrl = `https://nutritionix-api.p.rapidapi.com/v1_1/search/${queryNut}`;
		const options = {
			method: 'GET',
			url: searchUrl,
			params: {fields: 'item_name,item_id,brand_name,nf_calories,nf_total_fat'},
			headers: {
				'x-rapidapi-key': 'e1216e638emsh115d8a998d4d376p117e35jsnf92a3abff6ee',
				'x-rapidapi-host': 'nutritionix-api.p.rapidapi.com'
			}
		};

		if (this.cancel) {
			// Cancel the previous request before making a new request
			this.cancel.cancel();
		}
		// Create a new CancelToken
		this.cancel = axios.CancelToken.source();

		trackPromise(axios.request(options, {
				cancelToken: this.cancel.token,
			})
			.then((res) => {
				const resultNotFoundMsg = !res.data.hits.length
					? 'Makanan Tidak Terdaftar.'
					: '';

				this.setState({
					nutritionResults: res.data.hits,
					nutritionMessage: resultNotFoundMsg,
					loading: false,
				});
			})

			.catch((error) => {
				if (axios.isCancel(error) || error) {
					this.setState({
						loading: false,
						nutritionMessage: 'Internet Tidak Terdeteksi.',
					});
				}
			}));
	};

handleOnInputChange = (event) => {
		const queryNut = event.target.value;
			if ( !queryNut ) {
				this.setState({ queryNut, nutritionResults: {}, nutritionMessage: '' } );
			} else {
				this.setState({ queryNut, loading: true, nutritionMessage: '' }, () => {
					this.fetchSearchnutritionResults(1, queryNut);
				});
			}
		// console.log(this.state.nutritionResults)
	};

renderSearchnutritionResults = () => {
		const {nutritionResults} = this.state;

		if (Object.keys(nutritionResults).length && nutritionResults.length) {
			return (
					<div className="hasil-search">
							<div className="row">
							{nutritionResults.map((result,i) => {
								return (
									<SearchCard
										id={nutritionResults[i].fields._id}
										item={nutritionResults[i].fields.item_name}
										brand={nutritionResults[i].fields.brand_name}
										porsi={nutritionResults[i].fields.nf_serving_size_qty}
										kalori={nutritionResults[i].fields.nf_calories}
										lemak={nutritionResults[i].fields.nf_total_fat}
									/>
									);
								})}
						</div>
				</div>


			);
		}
	};


getThumbnail = () =>{

		const searchUrl = `https://google-search3.p.rapidapi.com/api/v1/images/q=diet%20food`;

		const options = {
			  method: 'GET',
			  url: searchUrl,
			  headers: {
			    'x-rapidapi-key': 'e1216e638emsh115d8a998d4d376p117e35jsnf92a3abff6ee',
			    'x-rapidapi-host': 'google-search3.p.rapidapi.com'
			  }
			};

		axios.request(options)
			.then((res) => {
				// const resultNotFoundMsg = !res.data.news_results.length
				// 	? 'Tidak Ada Berita'
				// 	: '';

				this.setState({
					thumbnailResults: res.data.image_results
					// articleMessage: resultNotFoundMsg,
				});
				// console.log(this.state.thumbnailResults[1].image.src)
			})

			.catch((error) => {
					console.log(error)
			});

	}

async getGoogleNews(){

		 const response = await fetch("https://google-search3.p.rapidapi.com/api/v1/news/q=diet+sehat&hl=id", {
			 "method": "GET",
			 "headers": {
				 "x-rapidapi-key": "518dacdf68mshe074609f26cc4e9p107185jsn84ce96ca1395",
				 "x-rapidapi-host": "google-search3.p.rapidapi.com"
			 },
			 redirect: "follow", // manual, *follow, error
			 referrerPolicy: "no-referrer", // no-referrer, *client
			 // body: JSON.stringify(data) // Attach body with the request
		 });
		 this.setState({
			 articleResults: await response.json(),
			 loadingArticle:false

		 });


	 // 	const searchUrl = `https://google-search3.p.rapidapi.com/api/v1/news/q=diet+sehat&cr=countryID&hl=id`;
	 //
	 // 	const options = {
	 // 		 method: 'GET',
	 // 		 url: searchUrl,
	 // 		 headers: {
	 // 			 	'Content-Type': 'application/json',
	 // 		    'x-rapidapi-key': '518dacdf68mshe074609f26cc4e9p107185jsn84ce96ca1395',
	 // 		    'x-rapidapi-host': 'google-search3.p.rapidapi.com'
	 // 		  }
	 // 		}
	 //
	 // 	trackPromise(axios.request(options)
	 // 		.then((res) => {
	 // 			// const resultNotFoundMsg = !res.data.news_results.length
	 // 			// 	? 'Tidak Ada Berita'
	 // 			// 	: '';
	 //
	 // 			this.setState({
	 // 				articleResults: res.data.entries
	 // 				// articleMessage: resultNotFoundMsg,
	 // 			});
	 // 			console.log(this.state.articleResults)
	 // 		})
	 //
	 // 		.catch((error) => {
	 // 				console.log(error);
	 // 		}));
	 //
}

renderGoogleNews(){
	const {articleResults,thumbnailResults} = this.state;
	const entri = articleResults.entries

	console.log(articleResults)
	if (Object.keys(articleResults).length && articleResults.entries.length) {
		if (Object.keys(thumbnailResults).length && thumbnailResults.length) {
			// console.log(articleResults.entries[0])
			//    const buildMap = (key, values) => {
			// 		   const map = new Map();
			//
			// 			 try {
			// 				 for(let i = 0; i < key.length; i++){
			// 						map.set(key[i], values[i]);
			// 						console.log(key[i].title)
			// 						if(i == 5)
			// 							return (
			// 								<div>
			// 									<ArticleCard
			// 										id={ i }
			// 										title={ key[i].title }
			// 										snippet={ key[i].link }
			// 										source={ key[i].source.title }
			// 										thumbnail={ values[i].image.src }
			// 										/>
			// 								</div>
			// 							)
			// 					}
			//
			// 			 }finally {
			//
			// 			 }
			//
			//
			// };
			// return buildMap(entri,thumbnailResults)

				  // console.log(thumbnailResults,entri)
					return (

							<div>
								{entri.slice(0,19).map((val,index) => {
										return (
											<ArticleCard
												id={ index }
												title={ val.title }
												link={ val.link }
												source={ val.source.title }
												thumbnail={ thumbnailResults[index].image.src }
											/>
											);
									})}
						</div>
					)
		}
	}
}

componentDidMount(){
	this.getGoogleNews();
	this.getThumbnail();
}

	render() {
		const {queryNut, nutritionMessage, articleResults,loadingArticle} = this.state;
		return (
			<div>
				<Navbar/>
				<Switch>
					{/*route search*/}
					<Route exact path="/dietpedia"
							render={() => (
								<div className="container">
									{/*Heading*/}
										<div className="row">
											<div className="col-12 bagian-atas">
												<h2>Cari Makanan</h2>
											</div>
											<div className="col-12">
												<div class="form-group has-search">
													<span class="material-icons size-22 form-control-feedback">search</span>
														<input
														 className="form-control me-2 search-custom"
														 type="text"
														 name="queryNut"
														 value={queryNut}
														 placeholder="Search..."
														 onChange={this.handleOnInputChange}
													 />
											  </div>
											</div>
											<div className="col-12"><br/>
												{ nutritionMessage && <h5>{ nutritionMessage }</h5> }
											</div>
										</div>
										<LoadingIndicator/>
										{ this.renderSearchnutritionResults() }
								</div>
							)}
					/>

					{/*route article*/}
					<Route path="/article"
							render={() => (
								<div>
									<div className="container">
						          <div className="hasil-search">
												<div className="row">
														<div class="col-12 bagian-atas">
																<h2>Artikel</h2>
														</div>
															{this.renderGoogleNews()}
															<Loader className={loadingArticle ? 'show-loader' : 'hide-loader' } type="ThreeDots" color="#94B447" height="100" width="100" />
												</div>
										</div>
						      </div>
								</div>
							)}
					/>
					<Route component={NotFound}/>
				</Switch>
			</div>
		);
	}
}

export default App;
