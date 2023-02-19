import { Component } from 'react';
import '../Styles/styles.css'
import ImageGalleryItem from "./ImageGalleryItem";

export default class ImageGallery extends Component {
  
  render() {
    return (
    <ul className='ImageGallery'>
      {this.props.images.map(item => <ImageGalleryItem item={item}/>)}
    </ul>
    );
  };
};