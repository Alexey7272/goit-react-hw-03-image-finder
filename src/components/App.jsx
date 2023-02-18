import React,{Component} from "react";
import Searchbar from "./SearchBar/searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
// import ImageGalleryItem from "./ImageGallery/ImageGalleryItem";
import { TailSpin } from "react-loader-spinner";
import pictureApi from 'services/picture-api';
// import Button from "./ImageGallery/LoadMore";
// import Modal from "./ImageGallery/Modal";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    status: 'idle',
  };

  componentDidUpdate(prevState, prevProps) {
    const prevSearch = prevState.query;
    const nextSearch = this.state.query;

    if(prevSearch !== nextSearch || prevState.page !== this.state.page)  {

      this.setState({status: 'pending'})
        pictureApi
         .fetchPicture(nextSearch)
         .then(data => this.setState(prevState => ({ images : [...prevState.images, ...data.hits], status: 'resolved', showBtn: this.state.page < Math.ceil(data.totalHits / 12) })))
         .finally(() => this.setState({ loading: false }))
    };
  };

  
  handleFormSubmit = query => {
    this.setState({ 
      query,
      page: 1,
      images: [],
      loading: false,
      status: 'idle' });
  };

  render() {

    const { status, page} = this.state; 

      if (status === 'idle') {
        
        return (
          <div> 
            <Searchbar onSubmit={this.handleFormSubmit}/>
            <p>Введите текст поиска картинки</p>

            <ImageGallery images={this.state.images}></ImageGallery>
            <ToastContainer autoClose={3000}/>
          </div>
        )
      }
    
    if (status === 'pending') {
      return (
        <div> 
          <Searchbar onSubmit={this.handleFormSubmit}/>
          <TailSpin/>
          <ImageGallery images={this.state.images}></ImageGallery>
          <ToastContainer autoClose={3000}/>
        </div> 
      );
    };
    
    if (status === 'resolved') {
      return (
        <div>
          <Searchbar onSubmit={this.handleFormSubmit}/>
          <ImageGallery images={this.state.images}></ImageGallery>
          <ToastContainer autoClose={3000}/>
        </div>
      )
    }
  };
};

export default App;