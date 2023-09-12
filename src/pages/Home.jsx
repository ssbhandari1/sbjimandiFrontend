import React, { useEffect } from 'react'
import './style.scss'
import Banner from './homeBanner/Banner'
import LessCost from './costWiseVeg/LessCost'
import HighCost from './costWiseVeg/HighCost'




const Home = () => {




  return (
    <div className='homeContainer'>
   <Banner/>
   <LessCost/>
   <HighCost/>
    </div>
  )
}

export default Home