import {Component} from 'react'
import './index.css'
import {Link} from 'react-router-dom'

class MovieItem extends Component {
  render() {
    const {details} = this.props
    const {id, image, name, rating} = details
    console.log(image)
    return (
      <li className="list_cont">
        <img
          src={`https://image.tmdb.org/t/p/original${image}`}
          alt={name}
          className="img_style"
        />
        <h1 className="movie_head">{name}</h1>
        <p className="movie_para">{rating}</p>
        <Link to={`/${id}`}>
          <button type="button" className="view_button">
            View Details
          </button>
        </Link>
      </li>
    )
  }
}
export default MovieItem
