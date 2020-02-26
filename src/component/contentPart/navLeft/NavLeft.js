import React,{Component} from 'react'
import './NavLeft.css';
import fork from './fork.png'
import list from './list.png'
import axios from 'axios'

class NavLeft extends Component{
    constructor(props) {
        super(props)
        this.state = {
          post: [],
          id_category: 0,
          name: '',
          price: 0,
          stock: 0,
          description: '',
          image: ''
        }
      }
        onChangeHandler = event => {
            this.setState({ [event.target.name]: event.target.value })
        }

        handleFileChange = e => {
            this.setState({ [e.target.name]: e.target.files[0] })
        }

        onSubmitHandler = event => {
            event.preventDefault()
            let formData = new FormData()
            
            formData.append("id_category", this.state.id_category)
            formData.append("name", this.state.name)
            formData.append("price", this.state.price)
            formData.append("stock", this.state.stock)
            formData.append("description", this.state.description)
            formData.append("image", this.state.image)
            
            axios.post('http://localhost:4040/product', formData)
            .then(response=>{
                console.log(response.data.result)
                // console.log(this.props.history)
                window.location.href="/"
                // this.setState({
                //     post : response.data.result
                // })
            })
            
        }

        

    render(){
        return(
            <div className="navLeft">
                <center>
                    <img src={fork} style={{width:"50px",height:"50px", marginTop:"15px"}}/>
                    <img src={list} style={{width:"50px",height:"50px", marginTop:"40px"}}/>
                    <span className="plus-icon"><b data-toggle="modal" data-target="#addData" style={{cursor: "cell"}}>+</b></span>
    
                        {/* <!-- Modal --> */}
                        
                </center>
                <div class="modal fade" id="addData" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Add Product</h5>
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
                            <input name="image" onChange={this.handleFileChange} type="file" class="form-control-file" id="exampleFormControlFile1"/>
                        </div>
                        </div>
                        <button type="submit" class="btn btn-primary" >Save changes</button>
                        </form>
                            </div>
                            </div>
                        </div>
                    </div>
    
            </div>
        )
    }
}

export default NavLeft;