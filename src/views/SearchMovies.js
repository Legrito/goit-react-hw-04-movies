import { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import axios from "axios";
import MoviesList from '../components/MoviesList/MoviesList';
import { MovieLoader } from '../components/Loader';

const API_KEY = 'a9bb7243d3a710c2ab16652dca81dddb';
const BASE_URL = `https://api.themoviedb.org/3/`;

const queryString = require('query-string');

class SearchMovies extends Component {
    state = {
        value: '',
        findedMovies: [],
        searchFailed: false,
        loader: false,
    }

    componentDidMount() {
        const parsed = queryString.parse(this.props.location.search);
        console.log(parsed.query);
    
        if (parsed.query) {
          this.setState({loader: true, });
          axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${parsed.query}`)
          .then(resp => {
            if(resp.data.results.length === 0) {
                this.setState({searchFailed: true});
                return;
            }

            this.setState({searchFailed: false, findedMovies: resp.data.results, loader: false})});
        }
      }

    onChange = (e) => {
        console.log(e.currentTarget.value);
        this.setState({value: e.currentTarget.value})
    }

    onClick = (e) => {
        e.preventDefault();
        this.setState({loader: true, });
        axios.get(`${BASE_URL}search/movie?api_key=${API_KEY}&query=${this.state.value}`)
        .then(resp => {
            this.props.history.push({
                pathname: this.props.location.pathname,
                search: `query=${this.state.value}`,
              });
            console.log(resp.data.results);
            if(resp.data.results.length === 0) {
                this.setState({searchFailed: true});
                return;
            }

            this.setState({searchFailed: false, findedMovies: resp.data.results, loader: false})});
    }

    render() {
        const { value, findedMovies, searchFailed, loader} = this.state;
        return ( 
            <section className="search__section">
                <form onSubmit={this.onClick}>                    
                <input value={value} onChange={this.onChange} className="search__input" />
                <button type="submit" className="search__button" >Search</button>
                </form>                
                {searchFailed && <p>Nothing is found...</p> }
                { loader ? <MovieLoader /> 
                : <MoviesList movies={findedMovies} />}
            </section>
        )
    }
} 

export default withRouter(SearchMovies);