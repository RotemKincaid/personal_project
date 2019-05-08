import React, {Component} from 'react'
import Modal from 'react-modal'
import UserInfo from '../../components/UserInfo/UserInfo'
import logo from './../Home/resources/whitefurlogo.png'
// import logo1 from './whitelogotest1.png'
import whitelogotest2 from './whitelogotest2.png'
import whitelogotest3 from './whitelogotest3.png'
import whitelogotest4 from './whitelogotest4.png'
import whitelogotest5 from './whitelogotest5.png'
import whitelogotest6 from './whitelogotest6.png'
import whitelogotest7 from './whitelogotest7.png'
import './Header.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {setUser} from './../../ducks/userReducer'
import axios from 'axios'
import { StickyContainer, Sticky } from 'react-sticky';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      height: '900px',
      width: '900px',
      borderRadius: '3%',
      backgroundColor: 'rgba(100, 100, 100, 0.7)'

    }
  };


class Header extends Component {
    constructor(props){
        super(props)

        this.state = {
            loggedInUser: null,
            isActive: false,
        }
    }
    
    
   

    componentDidMount() {
        Modal.setAppElement('body');
        axios.get("/auth/user").then(res => {
            // this.props.setUser(res.data);
            if (res.data){
                this.setState({
                    loggedInUser: res.data,
                })
            }
          
        });
    }

    toggleModal = ()=> {
        this.setState({
            isActive: !this.state.isActive
        })
    }

    logout = () => {
        axios.get("/auth/logout").then(() => {
          this.props.setUser(null)
          this.setState({
            loggedInUser: null
          })
        });

    };


    render(){
        console.log('logged in user in header component', this.state.loggedInUser)
        console.log('user in component header',this.props.user)
        const {user} = this.props.user


        return (
            <StickyContainer>
            {/* Other elements can be in between `StickyContainer` and `Sticky`,
            but certain styles can break the positioning logic used. */}
            <Sticky>
              {({
                style,
     
                // the following are also available but unused in this example
                isSticky,
                wasSticky,
                distanceFromTop,
                distanceFromBottom,
                calculatedHeight
              }) => (
            <header style={style}>
                <section>
                        <Modal 
                            isOpen={this.state.isActive}
                            onRequestClose={this.toggleModal}
                            style={customStyles}
                            animationType='slide'
                            transparent={true}
                        >
                            
                            <UserInfo />
                            <button onClick={this.toggleModal}>Exit</button>
                        </Modal>

                    </section>
                <div className='logo-container'>
                    <Link to='/'><img className='logo' alt ='FURBook' src={whitelogotest7}/></Link>
                    <nav>
                        {!user ? (
                            <div className='nav'>
                                <Link className='nav-link' to='/register'>Register </Link>
                                <Link className='nav-link' to='/login'> Login</Link>
                                <Link className='home-icon' className='nav-link' to = '/'><img/></Link>
                              
                            </div>
                        ) : (
                            <div className='nav'
                            >
                                <h1 onClick={this.toggleModal}className='nav-link-name'>{user.user_name} logged in <i class="material-icons">
account_circle
</i></h1>
                                
                                
                                <Link to='/friends' className='nav-link' >Friends </Link>
                                <Link className='nav-link' to = '/messages'>       Messages</Link>
                                
                                <Link className='nav-link' to = '/profile'> Pets</Link>
                                <Link className='nav-link' to = '/profiles'> Find Friends</Link>
                                <Link className='nav-link' onClick={this.logout} > Logout</Link>
                            </div>
                        )}
                    </nav>
                </div>
                <div className="nav-down-container" className='nav-down'>
                    <div className='nav-down'
                                >
                                    
                                    <Link className='link' to = '/'> Home</Link>
                                    <Link className='link' to = '/new'>       New</Link>
                                    <Link className='link' onClick={this.logout} >Logout</Link>
                                    <Link to='/friends' className='link' >Friends</Link>
                                    <Link className='link' to = '/profile'>My Pets</Link>
                                    <Link className='link' to = '/profiles'>Find Friends</Link>
                                </div>
                            </div>
                {/* <div className='header-nav-trial'>
                    <h1>HEllo</h1>
                    <div className='nav'>
                                <h1 className='link'> logged in</h1>
                                <Link className='link' to = '/'> Home |</Link>
                                <Link className='link' to = '/new'>       New</Link>
                                <Link className='link' onClick={this.logout} >| Logout</Link>
                                <Link to='/friends' className='link' > | My Friends </Link>
                                <Link className='link' to = '/profile'> | My Pets</Link>
                                <Link className='link' to = '/profiles'> | Find Friends</Link>
                            </div> */}
                {/* </div> */}
            </header>
              )}
            </Sticky>
            {/* ... */}
          </StickyContainer>
            
    
        
             
            
        )
    }
}

const mapStateToProps = reduxState => {
    return {
      user: reduxState.user
    };
  };
  
  const mapDispatchToProps = {
    setUser: setUser
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(Header);

  