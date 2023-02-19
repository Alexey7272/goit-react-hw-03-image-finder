import { Component } from 'react';
import '../Styles/styles.css'
import { ReactComponent as SearchIcon } from '../Icons/search.svg';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types'


export default class Searchbar extends Component {
    state = {
        pagesName: '',
    };

    handleNameChange = event => {
        this.setState({ pagesName: event.currentTarget.value.toLowerCase() })
    };

    handleSubmit = event => {
        event.preventDefault();

        if( this.state.pagesName.trim() === '') {
           toast.error("Введите название картинки");
           return;
        };

        this.props.onSubmit(this.state.pagesName)
        this.setState({ pagesName: '' })
    };

    render() {
        return(
            <header className='Searchbar'>

                <form className='SearchForm' onSubmit={this.handleSubmit}>
                    <button type="submit" className='SearchForm_button'>
                        <span> <SearchIcon width={30} height={18}/> </span>
                    </button>
        
                    <input
                       className='SearchForm-input'
                       type="text"
                       autoComplete="off"
                       autoFocus
                       placeholder="Search images and photos"
                       value={this.state.pagesName}
                       onChange={this.handleNameChange}
                    />
                </form>
            </header>
        );
    };
};

Searchbar.propTypes = {
   onSubmit: PropTypes.func.isRequired,
};