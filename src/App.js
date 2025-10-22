import './App.css'
import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import HomePopular from './component/HomePopular'
import TopRated from './component/TopRated'
import Upcoming from './component/Upcoming'
import SingleMovieDetail from './component/SingleMovieDetail'
import SearchMovie from './component/SearchMovie'
import SearchContext from './SearchContext'

// write your code here
class App extends Component {
  state = {userInput: ''}

  clickedSearchButton = value => {
    console.log(value)
    this.setState({userInput: value})
  }

  render() {
    const {userInput} = this.state
    return (
      <SearchContext.Provider
        value={{
          userInput,
          clickedSearchButton: this.clickedSearchButton,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={HomePopular} />
            <Route exact path="/top-rated" component={TopRated} />
            <Route exact path="/upcoming" component={Upcoming} />
            <Route exact path="/movie/:id" component={SingleMovieDetail} />
            <Route exact path="/search" component={SearchMovie} />
          </Switch>
        </BrowserRouter>
      </SearchContext.Provider>
    )
  }
}

export default App
