import React,{Component} from "react";
import Searchbar from "./SearchBar/searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import ImageGalleryItem from "./ImageGallery/ImageGalleryItem";
import { TailSpin } from "react-loader-spinner";
import pictureApi from 'services/picture-api';
// import Button from "./ImageGallery/LoadMore";
// import Modal from "./ImageGallery/Modal";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    pagesName: '',
    page: null,
    loading: false,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.pagesName;
    const nextSearch = this.props.pagesName;

    if(prevSearch !== nextSearch) {

      this.setState({status: 'pending'})
        pictureApi
         .fetchPicture(nextSearch)
         .then(page => this.setState({ page, status: 'resolved' }))
         .finally(() => this.setState({ loading: false }))
    };
  };

  
  handleFormSubmit = pagesName => {
    this.setState({ pagesName });
  };

  render() {

    const { page, status} = this.state; 

      if (status === 'idle') {
        
        return (
          <div> 
          <Searchbar onSubmit={this.handleFormSubmit}/>
          <p>Введите текст поиска картинки</p>

          <ImageGallery pagesName={this.state.pagesName}></ImageGallery>
          <ToastContainer autoClose={3000}/>
        </div>
      )
    }
    
    if (status === 'pending') {
      return (
        <div> 
          <Searchbar onSubmit={this.handleFormSubmit}/>
          <TailSpin/>
          <ImageGallery pagesName={this.state.pagesName}></ImageGallery>
          <ToastContainer autoClose={3000}/>
        </div> 
      );
    };
    
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit}/>
          <ul className='ImageGallery'><ImageGalleryItem pictures={page.hits}/></ul>
          
          <ImageGallery pagesName={this.state.pagesName}></ImageGallery>
          <ToastContainer autoClose={3000}/>
        </div>
      )
    }
  };
};

export default App;
// <div>
//   <Searchbar onSubmit={this.handleFormSubmit}/>
//   <ImageGallery pagesName={this.state.pagesName}>
//   </ImageGallery>
//   <ToastContainer autoClose={3000}/>
// </div>