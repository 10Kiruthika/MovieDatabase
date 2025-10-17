import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'
import SearchContext from '../../SearchContext'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class SearchMovie extends Component {
  state = {filterList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.renderApi()
  }

  renderApi = async () => {
    const {userInput} = this.context

    this.setState({apiStatus: apiStatusConstant.loading})

    console.log(userInput)
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=5ca85eab821a4ec8ac78f3aeebeee7f5&language=en-US&query=${userInput}&page=1`,
    )
    const data = await response.json()
    console.log(data)
    const moviesList = data.results.map(each => ({
      id: each.id,
      image: each.poster_path,
      name: each.title,
      rating: each.vote_average,
    }))
    this.setState({
      filterList: moviesList,
      apiStatus: apiStatusConstant.success,
    })
  }

  renderLoading = () => (
    <div className="load_cont">
      <Loader type="TailSpin" height={100} width={100} color="white" />
    </div>
  )

  renderSuccess = () => {
    const {filterList} = this.state
    return (
      <ul className="unorder_list">
        {filterList.map(each => (
          <MovieItem details={each} key={each.id} />
        ))}
      </ul>
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
      <div className="background_cont">
        <Header />
        <div className="home_container">{this.renderSwitchcase()}</div>
      </div>
    )
  }
}
SearchMovie.contextType = SearchContext
export default SearchMovie
