import { Component } from 'react'
import '../Styles/styles.css'

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    };


    handleKeyDown = e => {
        if ( e.code === 'Escape') {
            console.log('rrr')
            this.props.onClose();
        };
    };

    handleBackDropClick = e => {
        if ( e.currentTarget === e.target) {
            this.props.onClose();
        }
    };

    render() {
        return (
            <div className="Overlay" onClick={this.handleBackDropClick}>
                <div className="Modal">
                  {this.props.children}
                </div>
            </div>
        );
    };
};