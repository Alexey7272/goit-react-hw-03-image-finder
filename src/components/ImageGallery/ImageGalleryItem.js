import { Component } from 'react';
import Modal from './Modal';
import '../Styles/styles.css'

export default class ImageGalleryItem extends Component {  
   
    render() { 
        const { item} = this.props;
        const { showModal } = this.state;

        return (
         
            <li className='ImageGalleryItem' >
                <img src={item.webformatURL} alt={item.tag} className='ImageGalleryItem-image' onClick={this.toggleModal}/>
                { showModal && 
                <Modal> 
                     <img src={item.largeImageURL} alt={item.tags}/>
                </Modal> 
                }
            </li>
        );
               
          
    };
};