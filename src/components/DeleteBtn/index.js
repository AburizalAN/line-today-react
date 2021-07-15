import { Delete } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import { useState, useEffect } from 'react';


const DeleteBtn = ({saveToLocalStorage, article}) => {

  const [ isLiked, setIsLiked ] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    saveToLocalStorage(article);
  }

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (bookmarks) {
      const findId = bookmarks.find(item => item.id === article.id);
      if (findId) {
        setIsLiked(true)
      }
    }
  }, [article])

  return (
    <Button className="ms-4 btn-bookmarks" onClick={() => handleLike()}>
      <Delete className="icon" />
    </Button>
  )
}

export default DeleteBtn;