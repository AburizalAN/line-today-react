import { useEffect, useState } from 'react';
import LikeBtn from '../../components/LikeBtn';

const Home = ({match, data, setMenuSelected}) => {

  const { category } = match.params;
  
  const [ filteredData, setFilteredData ] = useState();

  const saveToLocalStorage = (data) => {
    if (localStorage.getItem('bookmarks')) {
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
      const findId = bookmarks.find(item => item.id === data.id);
      if (findId) {
        const filteredBookmarks = bookmarks.filter(item => item.id !== data.id);
        localStorage.setItem('bookmarks', JSON.stringify(filteredBookmarks));
      } else {
        bookmarks.push(data);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
      }
    } else {
      localStorage.setItem('bookmarks', JSON.stringify([data]));
    }
  }

  useEffect(() => {
    if (category) setMenuSelected(category);
  }, [category, setMenuSelected]);
  
  useEffect(() => {
    const filter = data?.templates?.filter(item => item?.title && item?.sections[0]?.articles.length !== 0);
    if (filter) {
      setFilteredData(filter);
    }
    console.log(data);
  }, [data])

  useEffect(() => {
    console.log(filteredData);
  }, [filteredData])

  return (
    <section className="py-5">
      <div className="container">
        {
          filteredData?.map(itemData => (
            <div>
              <h3 className="mb-4">{itemData?.title}</h3>
              <div className="row mb-4">
                {
                  itemData?.sections[0]?.articles?.map(article => (
                    <div className="col-lg-4 py-3 d-flex" key={article?.id}>
                      <div className="card" style={{flex: 1}}>
                        <img src={`https://obs.line-scdn.net/${article?.thumbnail?.hash}/w580`} className="card-img-top thumbnail" alt={article?.title} />
                        <div className="card-body">
                          <div className="d-flex align-items-start">
                            <h5 className="card-title"><a href={article?.url?.url}>{article?.title}</a></h5>
                            <LikeBtn 
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
          ))
        }
      </div>
    </section>
  )
}

export default Home;