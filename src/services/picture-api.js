import axios from "axios";
const baseURL = `https://pixabay.com/api/?page=1&image_type=photo&orientation=horizontal&per_page=12`;

  export const getPics = async (page, query) => {
    const options = {
      params: {
        page: page,
        q: query,
        key: '31469555-49a38a455635c0ee6ed404ff1',
      },
    };
    
    return await axios.get(baseURL, options);
  }; 