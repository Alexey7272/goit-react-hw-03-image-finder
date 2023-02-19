import React,{Component} from "react";
import Searchbar from "./SearchBar/searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { TailSpin } from "react-loader-spinner";
import * as API from 'services/picture-api';
import Button from "./ImageGallery/LoadMore";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


class App extends Component {
  state = {
    query: '',
    page: 1,
    images: [],
    loading: false,
    status: 'idle',
    totalPages: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { query, page, totalPages } = this.state;

    if (prevState.page !== page || prevState.query !== query) {
      await API.getPics(page, query)
        .then(({ data, status }) => {
          const { hits, totalHits } = data;

          if (status !== 200) {
            this.setState({ status: 'rejected' });

            return toast.error(`Sorry, something went wrong. Try again later`);
          }

          if (totalHits === 0) {
            toast.error(`Sorry, there are no pictures with search "${query}"`);

            setTimeout(() => {
              this.setState(prevState => {
                return { status: 'rejected' };
              });
            }, 2500);
          }

          if (totalHits > 0) {
            const totalPages = Math.ceil(totalHits / 12);

            this.setState(prevState => {
              return {
                images: [...prevState.images, ...hits],
                status: 'resolved',
                totalPages: totalPages,
              };
            });
          }

          if (page >= totalPages && totalPages !== 0) {
            toast.info("You've reached the end of the search", {
              position: toast.POSITION.BOTTOM_CENTER,
            });
          }
        })
        .catch(error => {
          console.log(error.name, error.message);
        });
    }
    if (page > 1) {
      this.scrollToNextResult();
    }
  }

  handleFormSubmit = query => {
    this.setState({ 
      query,
      page: 1,
      images: [],
      loading: false,
      status: 'pending' });
  };

  onLoadMore = () => {
    this.setState( prevState => ({
      page: prevState.page + 1
    }));
  }

  render() {

    const { status } = this.state; 

      if ( status === 'idle' || status === 'rejected' ) {
        return (
          <div> 
            <Searchbar onSubmit={this.handleFormSubmit}/>
            <p className="Start_text">Введите текст поиска картинки</p>

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
      }
    
      if (status === 'resolved') {
        return (
          <div>
            <Searchbar onSubmit={this.handleFormSubmit}/>
            <ImageGallery images={this.state.images}></ImageGallery>
            <ToastContainer autoClose={3000}/>
            <Button loadMore={this.onLoadMore}/>
          </div>
        )
      }
  };
};

export default App;