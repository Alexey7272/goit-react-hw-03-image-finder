export function fetchPicture (search) {
    return (
        fetch(`https://pixabay.com/api/?q=${search}&page=1&key=31469555-49a38a455635c0ee6ed404ff1&image_type=photo&orientation=horizontal&per_page=12`)
            .then(res => res.json())
    );
};

const api = {
    fetchPicture,
};

export default api;