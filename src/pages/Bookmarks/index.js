import { useEffect, useState } from 'react';
import DeleteBtn from '../../components/DeleteBtn';

const Bookmarks = () => {

  const [ bookmarks, setBookmarks ] = useState();

  const saveToLocalStorage = (data) => {
    if (localStorage.getItem('bookmarks')) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      const findId = bookmarks.find(item => item.id === data.id);
      if (findId) {
        const filteredBookmarks = bookmarks.filter(item => item.id !== data.id);
        localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
        setBookmarks(filteredBookmarks);
      } else {
        bookmarks.push(data);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    } else {
      localStorage.setItem('bookmarks', JSON.stringify([data]));
    }
  }
  
  useEffect(() => {
    const _bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    if (_bookmarks) {
      setBookmarks(_bookmarks);
    }
  }, [])

  return (
    <section className="py-5">
      <div className="container">
        <div>
          <h3 className="mb-4">Bookmarks</h3>
          <div className="row mb-4">
          {
            bookmarks?.map(article => (
              <div className="col-lg-4 py-3 d-flex" key={article?.id}>
                <div className="card" style={{flex: 1}}>
                  <img src={`https://obs.line-scdn.net/${article?.thumbnail?.hash}`} className="card-img-top thumbnail" alt={article?.title} />
                  <div className="card-body">
                    <div className="d-flex align-items-start">
                      <h5 className="card-title"><a href={article?.url?.url}>{article?.title}</a></h5>
                      <DeleteBtn 
                        saveToLocalStorage={saveToLocalStorage}
                        article={{
                          id: article.id,
                          title: article.title,
                          thumbnail: article.thumbnail,
                          url: article.url,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          }  
          </div>
        </div>
      </div>
    </section>
  )
}

export default Bookmarks;