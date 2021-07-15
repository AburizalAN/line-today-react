import { ExpandMore, ExpandLess, MoreVert } from '@material-ui/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';
import 'swiper/swiper.scss';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const Navbar = ({categoryLists, menuSelected}) => {

  const [ isExpand, setIsExpand ] = useState(false);
  const [ sidebarMenu, setSidebarMenu] = useState(false);
  
  const location = useLocation();

  const { pathname } = location;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light position-relative flex-column">
      <div className="topNav w-100">
        <div className="container">
          <div className="d-flex w-100 align-items-center">
            <Link to="/" className="navbar-brand" style={{flex: 1}}>LINE TODAY</Link>
            <Link to="/bookmarks" className="bookmarks-nav me-4">Bookmarks</Link>
            <button onClick={() => setSidebarMenu(!sidebarMenu)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <MoreVert />
            </button>
          </div>
        </div>
      </div>
      
      {
        pathname !== '/bookmarks' &&
        <div className="bottomNav w-100">
          <div className="container">
            <div className="collapse navbar-collapse w-100" id="navbarSupportedContent">
              <Swiper
                slidesPerView={`auto`}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                className="navbar-nav me-auto mb-2 mb-lg-0"
              >
                {
                  categoryLists?.map(category => (
                    <SwiperSlide key={category.id} className="nav-item" width={0}>
                      <Link
                        to={`/home/${category.name}`}
                        className={`nav-link ${menuSelected === category.name && 'active'}`}
                      >
                        {category.name}
                      </Link>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              <button className="menu-expand" onClick={() => setIsExpand(!isExpand)}>
                {
                  isExpand ? <ExpandLess className="icon" /> : <ExpandMore className="icon" />
                }
              </button>
            </div>
          </div>
        </div>
      }
  
      <div className={`${isExpand ? 'category-dropdown' : 'category-dropdown-close'} w-100`}>
        <div className="container m-auto d-flex flex-wrap my-4">
        {
          categoryLists?.map(category => (
              <Link
                key={category?.id}
                to={`/home/${category.name}`}
                className={`category-dropdown-link me-3 mb-3 ${menuSelected === category.name && 'active'}`}
              >
                {category.name}
              </Link>
          ))
        }
        </div>
      </div>
      <div className={sidebarMenu ? 'sidebarMenu' : 'sidebarMenu-close'}>
        {
          categoryLists?.map(category => (
              <Link
                key={category?.id}
                to={`/home/${category.name}`}
                className={`sidebarMenu-link ${menuSelected === category.name && 'active'}`}
              >
                {category.name}
              </Link>
          ))
        }
      </div>
    </nav>
  )
}

export default Navbar;