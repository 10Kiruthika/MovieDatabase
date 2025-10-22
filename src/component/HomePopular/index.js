import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import MovieItem from '../MovieItem'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

class HomePopular extends Component {
  state = {initialList: [], apiStatus: apiStatusConstant.initial, pageNo: 1}

  componentDidMount() {
    this.renderApi()
  }

  renderApi = async () => {
    this.setState({apiStatus: apiStatusConstant.loading})
    const {pageNo} = this.state
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=5ca85eab821a4ec8ac78f3aeebeee7f5&language=en-US&page=${pageNo}`,
    )
    const data = await response.json()

    const moviesList = data.results.map(each => ({
      id: each.id,
      image: each.poster_path,
      name: each.title,
      rating: each.vote_average,
    }))

    this.setState({
      initialList: moviesList,
      apiStatus: apiStatusConstant.success,
    })
  }

  clickPrev = () => {
    const {pageNo} = this.state
    if (pageNo > 1) {
      this.setState(prev => ({pageNo: prev.pageNo - 1}), this.renderApi)
    }
  }

  clickNext = () => {
    this.setState(prev => ({pageNo: prev.pageNo + 1}), this.renderApi)
  }

  renderLoading = () => (
    <div className="load_cont">
      <Loader type="TailSpin" height={100} width={100} color="white" />
    </div>
  )

  renderSuccess = () => {
    const {initialList, pageNo} = this.state
    return (
      <>
        <ul className="unorder_list">
          {initialList.map(each => (
            <MovieItem details={each} key={each.id} />
          ))}
        </ul>
        <div className="page_cont">
          <button
            className="page_button"
            onClick={this.clickPrev}
            type="button"
          >
            Prev
          </button>
          <p className="page_para">{pageNo}</p>
          <button
            className="page_button"
            onClick={this.clickNext}
            type="button"
          >
            Next
          </button>
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
      <div className="background_cont">
        <Header />
        <div className="home_container">{this.renderSwitchcase()}</div>
      </div>
    )
  }
}
export default HomePopular
