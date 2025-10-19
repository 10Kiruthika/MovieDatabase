import './index.css'
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {withRouter} from 'react-router-dom'
import CastView from '../CastView'

const apiStatusConstant = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}
class Cast extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
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

    const castResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/credits?api_key=5ca85eab821a4ec8ac78f3aeebeee7f5&language=en`,
    )
    const castData = await castResponse.json()
    const castDataList = castData.cast.map(each => ({
      id: each.id,
      profileImage: each.profile_path,
      originalName: each.original_name,
      characterName: each.character,
    }))
    console.log(castData)
    this.setState({
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
    const {initialCastList} = this.state
    return (
      <div>
        <h1 className="movie_detail_head">Cast details</h1>

        <ul className="unorder_cast_list">
          {initialCastList.map(each => (
            <CastView key={each.id} details={each} />
          ))}
        </ul>
      </div>
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
        <div className="home_single_cont">{this.renderSwitchcase()}</div>
      </div>
    )
  }
}
export default withRouter(Cast)
