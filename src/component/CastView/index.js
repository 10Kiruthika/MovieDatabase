import './index.css'
import {Component} from 'react'

class CastView extends Component {
  render() {
    const {details} = this.props
    const {profileImage, originalName, characterName} = details

    return (
      <li className="cast_list_cont">
        <img
          className="profile_img"
          src={`https://image.tmdb.org/t/p/original${profileImage}`}
          alt={originalName}
        />
        <p className="name">Original Name: {originalName}</p>
        <p className="name">Character Name: {characterName}</p>
      </li>
    )
  }
}
export default CastView
