import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import CastView from '../CastView'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}
class SingleMovieDetail extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    initialMovieDetail: {},
    initialCastList: [],
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
    console.log(movieData)
    const movieDetail = {
      id: movieData.id,
      movieImage: movieData.poster_path,
      movieName: movieData.title,
      rating: movieData.vote_average,
      genre: movieData.genres,
      overview: movieData.overview,
      releaseDate: movieData.release_date,
    }

    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5ca85eab821a4ec8ac78f3aeebeee7f5&language=en`,
    )
    const castData = await castResponse.json()
    console.log(castData)
    const castDataList = castData.cast.map(each => ({
      id: each.id,
      profileImage: each.profile_path,
      originalName: each.original_name,
      characterName: each.character,
    }))
    console.log(castData)

    this.setState({
      initialMovieDetail: movieDetail,
      initialCastList: castDataList,
      apiStatus: apiStatusConstant.success,
    })
  }

  renderLoading = () => (
    <div className="load_cont">
      <Loader type="TailSpin" height={100} width={100} color="white" />
    </div>
  )

  renderSuccess = () => {
    const {initialMovieDetail, initialCastList} = this.state
    const {
      movieImage,
      movieName,
      rating,
      genre,
      overview,
      releaseDate,
    } = initialMovieDetail
    console.log(movieImage)
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
            <p className="single_para">Genre: {genre[0].name}</p>
            <p className="single_para">Released on {releaseDate}</p>
            <p className="single_para">{overview}</p>
          </div>
        </div>

        <div>
          <h1 className="movie_detail_head">Cast details</h1>

          <ul className="unorder_cast_list">
            {initialCastList.map(each => (
              <CastView key={each.id} details={each} />
            ))}
          </ul>
        </div>
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
