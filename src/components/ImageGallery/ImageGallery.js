import { Component } from 'react';
import '../Styles/styles.css'
// import { TailSpin } from "react-loader-spinner";
import ImageGalleryItem from "./ImageGalleryItem";
// import pictureApi from 'services/picture-api';

export default class ImageGallery extends Component {
  state = {
    page: null,
    loading: false,
    status: 'idle',
  };

  // componentDidUpdate(prevProps, prevState) {
  //   const prevSearch = prevProps.pagesName;
  //   const nextSearch = this.props.pagesName;

  //   if(prevSearch !== nextSearch) {

  //     this.setState({status: 'pending'})
  //       pictureApi
  //        .fetchPicture(nextSearch)
  //        .then(page => this.setState({ page, status: 'resolved' }))
  //        .finally(() => this.setState({ loading: false }))
  //   };
  // };

  render() {
    return (
    <ul className='gallery'>
      <ImageGalleryItem/>
    </ul>
    );
  //   const { page, status} = this.state; 

  //   if (status === 'idle') {
  //     return <p>Введите текст поиска картинки</p>
  //   }

  //   if (status === 'pending') {
  //     return <div> <TailSpin/> </div>
  //   }

  //   if (status === 'resolved') {
  //     return <ul className='ImageGallery'><ImageGalleryItem pictures={page.hits}/></ul>
  //   }
  };
};