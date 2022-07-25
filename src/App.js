import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getIconsApi from "./Components/services/iconAPI";

import Container from "./Components/Container/Container";
import Searchbar from "./Components/Searchbar/Searchbar";
import Loader from "./Components/Loader/Loader";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Modal from "./Components/Modal/Modal";
import Button from "./Components/Button/Button";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    if (!query) 
    return;
    
    const fetchImage = async () => {
  
      try {
        setIsLoading(true);

        const images = await getIconsApi(query,page);
        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchImage();
  }, [query, page]);

    const onSearchFormSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setLargeImageURL('');
    setIsLoading(false);
    setShowModal(false);
    setError(null);
  };


  const onToggleModal = () => {
    setShowModal(showModal=> !showModal);
  };

  const onOpenModal = e => {
    const largeImageURL = e.currentTarget.src;
    setLargeImageURL(largeImageURL);
  };

  const onLoadMore = async () => {
    setIsLoading(true);

    setPage(prevPage => prevPage + 1);
  };  

  return (
    <Container>
            {error && <div>{error}</div>}

      <Searchbar onSubmit={onSearchFormSubmit} />

      {
        <ImageGallery
          images={images}
          onToggleModal={onToggleModal}
          onOpenModal={onOpenModal}
        />
      }

      {isLoading && <Loader />}

      {showModal && <Modal onClose={onToggleModal} url={largeImageURL} />}

      {(images.length >= 12) && (
        <Button onLoadMore={onLoadMore} isLoading={isLoading} />
      )}

      <ToastContainer autoClose={3000} />
    </Container>
  );
};

export default App;
