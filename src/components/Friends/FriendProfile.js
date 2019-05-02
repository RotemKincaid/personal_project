import React, {Component} from 'react'
import './FriendProfile.css'

export default class FriendsProfile extends Component {
    constructor(props){
        super(props)

        this.state ={
         
        }
    }


    render(){
        const {name, age, city, state, country, favorites, breed, gender, image} = this.props.dog
        return (
            <div className='friend-profile-container'>
                <div className='friend-image-container'><img alt='friend-dog' src={image} />
                </div>
                <div className='friend-profile'>
                    <div className="friend-name">
                        <div className='friend-info-logo'></div>
                        <h1>{name}</h1>
                    </div>
                        
                    <div className='friend-info'>
                        <h3>{age}</h3>
                        <h3>{breed}</h3>
                        <h3>{gender}</h3>
                        <h3>{city}, {state}, {country}</h3>
                        <h3>Favorites: {favorites}</h3>
                    </div>
                    
                     
                  
                    
                    
                    <div className='friend-buttons'>
                            <button className="friend-delete" onClick={()=> this.props.delete(this.props.profileId)}></button>
                            <button className="friend-message" onClick={()=> this.props.message(this.props.profileId)}></button>
                    </div>
               </div>
           
            </div>
        )
    }
}