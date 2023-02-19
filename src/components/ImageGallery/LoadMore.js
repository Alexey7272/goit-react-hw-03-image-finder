import '../Styles/styles.css'
import PropTypes from 'prop-types'

const Button = ({loadMore}) => (
    <button className='Button' onClick={loadMore}>Load more</button>
);

Button.propTypes = {
    loadMore: PropTypes.func.isRequired,
};

export default Button;