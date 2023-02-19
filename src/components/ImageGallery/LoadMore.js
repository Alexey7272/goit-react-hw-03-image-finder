import '../Styles/styles.css'

const Button = ({loadMore}) => (
    <button className='Button' onClick={loadMore}>Load more</button>
);

export default Button;