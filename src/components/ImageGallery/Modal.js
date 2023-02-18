import { Component } from 'react'
import '../Styles/styles.css'


export default class Modal extends Component {
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className="Overlay">
                <div className="Modal">
                  {this.props.children}
                </div>
            </div>
        );
    };
};