import React from 'react'
import './style.scss'
import Img from '../../component/Img'

import veg from '../../assets/veg1.jpg'
import ContentWrapper from '../../component/ContentWrapper'
const Banner = () => {
  return (
    <div className='homeBanner'>
        <div className="backdrop-img">
            <Img  src={veg}/>
        </div>
        <div className="opacity-layer">

</div>
<ContentWrapper>
<div className="BannerContent">
        <span className="title">Welcome.</span>
        <span className="subTitle">
Now Your Favorite Vegetables at Unbeatable Prices, Delivered to Your Doorstep!
        </span>
        <div className="searchInput">
          <input type="text"
        
          placeholder='Search your favorite vegetables....'
          />
        <button>Search</button>
        </div>
      </div>
</ContentWrapper>
    </div>
  )
}

export default Banner