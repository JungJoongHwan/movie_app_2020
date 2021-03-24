import React from 'react';
import axios from 'axios';
import Movie from '../components/Movie';
import './Home.css';

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };

  // async, await 사용
  // async는 자바스크립트에게 getMovies()함수가 비동기함수라고 알려주고
  // await는 자바스크립트에게 axios.get()의 실행을 기다려 달라고 한다.
  getMovies = async () => {
    // 1. 영화데이터를 가져와서 출력해본다..
    //const movies = await axios.get('https://yts-proxy.now.sh/list_movies.json');
    //console.log(movies.data.data.movies);
    
    // 2. 영화데이터를 구조분해할당으로 저장한다.
    const {
      data: {
        data: { movies },
      },
    } = await axios.get('https://yts-proxy.now.sh/list_movies.json?sort_by=rating');
    //console.log(movies);

    // 3. 앞에 movies는 state의 movies이고, 뒤에 movies는 영화데이터이다.
    //this.setState({movies: movies}); 

    // 4. key와 value가 같으면 축약이 가능하다. isLoading도 false로 바꿔준다.
    this.setState({movies, isLoading: false});
  }

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return ( 
      <section className="container"> {
        isLoading ? ( 
          <div className="loader">
            <span className="loader__test">Loading...</span>
          </div> 
        ): (
          <div className="movies"> {
            movies.map((movie) => {
              //console.log(movie);
              return ( 
                <Movie
                  key = {movie.id} 
                  id = {movie.id}
                  year = {movie.year}
                  title = {movie.title}
                  summary = {movie.summary}
                  poster = {movie.medium_cover_image}
                  genres = {movie.genres}/>
              ); 
            })
          }
          </div>
        )}
      </section>
    );
  } 
}


export default Home;
