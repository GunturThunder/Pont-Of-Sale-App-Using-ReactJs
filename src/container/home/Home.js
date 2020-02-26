import React, {Component} from'react';
import { Link } from 'react-router-dom';
// import Navbar from '../../component/contentPart/navbar/Navbar'
import CartPart from '../../component/carPart/CartPart';
import ContentPart from '../../component/contentPart/contentPart';
import './Home.css';


class Home extends Component{
    componentDidMount(){
        if(!localStorage.getItem('isAuth')){
            this.props.history.push('/login');
        }
    }

    onLogout(){
        localStorage.removeItem('user-id');
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        this.props.history.push('/login');
    }
    render(){
        return(
            <div className="home">
                <p>Welcome, {localStorage.getItem('name')} <Link to="#" onClick={this.onLogout.bind(this)}>Logout</Link></p>
                <div className="row">
                    <div className className="col-md-9">
                        <ContentPart />
                    </div>
                    <div className="col-md-3">
                        <CartPart />
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Home;