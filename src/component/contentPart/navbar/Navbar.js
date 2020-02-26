import React,{Component, Fragment} from 'react';
import axios from 'axios';
import './Navbar.css'
import {Modal, Button, Row, Col, Form} from 'react-bootstrap'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id_product:'',
            post: [],
            id_category: 0,
            name: '',
            price: 0,
            stock: 0,
            description: '',
            image: '',
            productIdSelected:null,
            loading: false

        }
      }

      onChangeSearch = (event) => {
        console.log(event.target.value)
        axios.get(`http://localhost:4040/product/?searchName=${event.target.value}`)
      .then(response => {
        this.setState({ post: response.data.result })
      })
      .catch(error => {
        console.log(error)
      })
      
      }
      onChangeSortBy = (e) => {
        console.log(e.target.value)
        axios.get(`http://localhost:4040/product/?sort=${e.target.value}`)
      .then(response => {
        this.setState({ post: response.data.result })
      })
      .catch(error => {
        console.log(error)
      })
      
      }
      onClickHandler = (e)=>{
        //   console.log(e)
        this.setState({
            productIdSelected:e
        })
    }

    onChangeImageHandler = (e)=>{
        this.setState({image:e.target.files[0]})
    }
    
    onChangeHandler = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    onSubmitHandler = (e)=>{
        e.preventDefault()
        let formData = new FormData()
    console.log(this.state)
        formData.append("id_category", this.state.id_category)
        formData.append("name", this.state.name)
        formData.append("price", this.state.price)
        formData.append("description", this.state.description)
        formData.append("stock", this.state.stock)
        formData.append("image", this.state.image)
    
        let data = {
            method: "PATCH",
            body:formData
        }
        console.log(this.state.productIdSelected)
        fetch(`http://localhost:4040/product/${this.state.productIdSelected}`, data)
        // console.log(this.state.formData)
        .then(res=>{
            alert('data diubah')
            this.componentDidMount()
        })
    }
      
      // Delete by id
      deleteButtonHandler = (id_product) => {
        axios.delete(`http://localhost:4040/product/${id_product}`)
          .then(response => {
            console.log(response)
            this.componentDidMount()
          })
          .catch(error => {
            console.log(error)
          })
      }
    
      getAll(){
        const authorization = localStorage.getItem('token');
        const userId = localStorage.getItem("user-id");
            axios.get('http://localhost:4040/product', {
                headers: {
                    "authorization": authorization,
                    "user-id": userId
                  }
            
                })
            .then(response=>{
                this.setState({
                    post : response.data.result,
                    loading: false
                })
            })
      }

      componentDidMount(){
        const authorization = localStorage.getItem('token');
        const userId = localStorage.getItem("user-id");
            axios.get('http://localhost:4040/product')
            .then(response=>{
                this.setState({
                    post : response.data.result,
                   // loading: false
                })
            })
        }

    render(){
        console.log(this.state.post)
        return(
            <Fragment>
            <div className="container-navbar" >
                
                <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor:"#FFFFF", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)"}} >
                    <a className="navbar-brand" href="#">Navbar</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <input className="form-control mr-sm-2 " type="search" placeholder="Sort By" aria-label="Sort By" onChange={this.onChangeSortBy}/>
                        </ul>
                        <form className="form-inline my-2 my-lg-0 ">
                            <input className="form-control mr-sm-2 " type="search" placeholder="Search" aria-label="Search" onChange={this.onChangeSearch}/>
                        </form>
                    </div>
                </nav>
            <div className="content" >

            {this.state.post.map((post) => (
                <div>
                <div className="card" key={post.id_product}>
                 <div className="img">
                     <img src={post.image}/>
                 </div>
                     <div className="content-product">
                         <h4>{post.name}</h4>
                         <h6>Rp. {post.price}</h6>
                     </div>
                     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#editData" onClick={()=>this.onClickHandler(post.id_product)}  >Edit</button>
                     <button type="button" className="btn btn-danger" data-toggle="modal" data-target="#deletemodal" onClick={() => this.deleteButtonHandler(post.id_product)} >Delete</button>
                     </div>

                {/*Insert Modal*/}
                <div class="modal fade" id="editData" tabindex="-1" role="dialog" aria-labelledby="editDataTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="editDataTitle">Edit</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">

                        <form encType="multipart/form-data" onSubmit={this.onSubmitHandler}>
                        <div class="form-group">
                            <label class="my-1 mr-2" for="inlineFormCustomSelectPref">Category</label>
                        <select value={this.state.id_category} name="id_category" onChange={this.onChangeHandler} class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref">
                            <option selected disabled>Choose...</option>
                            <option value={1}>Food</option>
                            <option value={2}>Drink</option>
                        </select>
                            <label >Product Name</label>
                            <input value={this.state.name} name="name" onChange={this.onChangeHandler} class="form-control" placeholder="Black Forest"/>
                            <label >Price</label>
                            <input value={this.state.price} type="number" name="price" onChange={this.onChangeHandler} class="form-control" placeholder="Rp. 20000"/>
                            <label >Stock</label>
                            <input value={this.state.stock} type="number" name="stock" onChange={this.onChangeHandler} class="form-control" placeholder="230"/>
                            <label >Description</label>
                            <input value={this.state.description}  name="description" onChange={this.onChangeHandler} class="form-control" placeholder="Made From Love"/>
                        <div class="form-group">
                            <label for="exampleFormControlFile1">Example file input</label>
                            <input name="image" onChange={this.onChangeImageHandler} type="file" class="form-control-file" id="exampleFormControlFile1"/>
                        </div>
                        </div >
                        <button type="submit" class="btn btn-primary" >Save changes</button>
                        </form >
                            </div>
                            </div>
                        </div>
                    </div>
            
            {/* <div className="modal fade" id="deletemodal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Are You Sure !!</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    This action cannot be undone. This will permanently delete from database
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal"  >Close</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => this.deleteButtonHandler(post.id_product)}>Delete</button>
                </div>
                </div>
            </div>
            </div>  */}

            </div>
            // Edit
            ))}
            </div>
            </div>
            </Fragment>
        )
    }
}

export default Navbar;