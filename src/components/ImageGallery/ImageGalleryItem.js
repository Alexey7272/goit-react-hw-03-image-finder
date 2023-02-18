import { Component } from 'react';
import Modal from './Modal';
import '../Styles/styles.css'

export default class ImageGalleryItem extends Component {  
    state = {
        showModal: false,
    };

    toggleModal = () => {
        this.setState(({ showModal }) => ({
            showModal: !showModal,
        }))
    }

    render() { 
        const { pictures } = this.props;
        const { showModal } = this.state;

        return (
            <>
                {pictures.map(({ id, webformatURL, tags, largeImageURL }) => {
                    return (
                        <li className='ImageGalleryItem' key={id}>
                           <img src={webformatURL} alt={tags} className='ImageGalleryItem-image' onClick={this.toggleModal}/>
                            { showModal && 
                                <Modal> 
                                  <img src={largeImageURL} alt={tags}/>
                                </Modal> 
                            }
                        </li>
                    );
                })};
            </>
        );
    };
};