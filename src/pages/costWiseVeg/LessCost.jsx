import React from 'react'
import ContentWrapper from '../../component/ContentWrapper'
import Carousel from '../../component/Carousel'

const LessCost = () => {
  return (
    <div className='carouselSection'>
        <ContentWrapper>
            <span className="carouselTitle">
                Trending
            </span>
            {/* <SwitchTabs data={['Day','Week']} onTabChange={onTabChange}/> */}

        </ContentWrapper>
        <Carousel/>
    </div>
  )
}

export default LessCost