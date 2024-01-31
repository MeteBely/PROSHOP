import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={(e) => submitHandler(e)}>
      <div className="flex flex-col my-2">
        <label htmlFor="keyword">Search products...</label>
        <input type="text" value={keyword} placeholder="Enter product name" id="keyword" onChange={(e) => setKeyword(e.target.value)} />
      </div>
      <div className="flex flex-col my-2">
        <button type="submit">search</button>
      </div>
    </form>
  );
};

export default SearchBox;
