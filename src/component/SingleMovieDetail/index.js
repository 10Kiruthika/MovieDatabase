import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Cast from '../Cast'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}
class SingleMovieDetail extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    initialMovieDetail: {},
  }

  componentDidMount() {
    this.renderApiCall()
  }

  renderApiCall = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5ca85eab821a4ec8ac78f3aeebeee7f5&language=en-US`,
    )
    const movieData = await response.json()

    const movieDetail = {
      id: movieData.id,
      movieImage: movieData.poster_path,
      movieName: movieData.title,
      rating: movieData.vote_average,
      genre: movieData.genres,
      overview: movieData.overview,
      releaseDate: movieData.release_date,
    }

    this.setState({
      initialMovieDetail: movieDetail,
      apiStatus: apiStatusConstant.success,
    })
  }

  renderLoading = () => (
    <div className="load_cont">
      <Loader type="TailSpin" height={100} width={100} color="white" />
    </div>
  )

  renderSuccess = () => {
    const {initialMovieDetail} = this.state
    const {
      movieImage,
      movieName,
      rating,
      genre,
      overview,
      releaseDate,
    } = initialMovieDetail
    return (
      <>
        <h1 className="movie_detail_head">Movie details</h1>
        <div className="movie_detail_cont">
          <img
            className="movie_detail_image"
            src={`https://image.tmdb.org/t/p/original${movieImage}`}
            alt={movieName}
          />
          <div className="content_container">
            <h1 className="movie_detail_name">{movieName}</h1>
            <p className="single_para">Rating: {rating}</p>
            <p className="single_para">Released on {releaseDate}</p>
            <p className="single_para">{overview}</p>
          </div>
        </div>

        <Cast />
      </>
    )
  }

  renderSwitchcase = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.loading:
        return this.renderLoading()
      case apiStatusConstant.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="background_single_cont">
        <Header />
        <div className="home_single_cont">{this.renderSwitchcase()}</div>
      </div>
    )
  }
}
export default SingleMovieDetail
