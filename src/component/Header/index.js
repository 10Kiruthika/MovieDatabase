import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import SearchContext from '../../SearchContext'

class Header extends Component {
  state = {inputVal: ''}

  clickInput = event => {
    this.setState({inputVal: event.target.value})
  }

  clickButton = event => {
    event.preventDefault()
    const {inputVal} = this.state
    const {history} = this.props
    const {clickedSearchButton} = this.context
    clickedSearchButton(inputVal)
    history.replace('/search')
  }

  render() {
    return (
      <nav className="header_container">
        <h1 className="movie_name">movieDB</h1>

        <form className="input_search_cont" onSubmit={this.clickButton}>
          <input
            type="search"
            className="input_box"
            placeholder="Search movies"
            onChange={this.clickInput}
          />
          <button type="submit" className="search_button">
            search
          </button>
        </form>

        <div className="pages-cont">
          <Link to="/">
            <button type="button" className="page_button">
              Popular
            </button>
          </Link>
          <Link to="/top-rated">
            <button type="button" className="page_button">
              Top Rated
            </button>
          </Link>
          <Link to="/upcoming">
            <button type="button" className="page_button">
              Upcoming
            </button>
          </Link>
        </div>
      </nav>
    )
  }
}
Header.contextType = SearchContext
export default withRouter(Header)
