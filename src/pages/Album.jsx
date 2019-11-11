import React, { useState, useEffect } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import ItemsCarousel from "react-items-carousel";

import CCard from "../components/CustomCard";
import { music } from '../services'

const Album = () => {
    
    /* eslint-disable */
    const [activeItemIndex1, setActiveItemIndex1] = useState(0);
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    /* eslint-enable */
    const [Width, setWidth] = useState(0)
    const [Latest, setLatest] = useState([])
    const [Random, setRandom] = useState([])
    
    useEffect(() => {
        (async _ => {
            await music.Get('latest_album_thumbnail').then( res => {
                setLatest(res)
            })
            await music.Get('random_album_thumbnail').then( res => {
                setRandom(res)
            })
            setWidth( window.innerWidth )
        })()
    }, [])
    
    
    let carouselProps = number => ({
        /* eslint-disable */
        requestToChangeActive : eval('setActiveItemIndex' + number),
        activeItemIndex : eval('activeItemIndex' + number),
        /* eslint-enable */
        infiniteLoop : true,
        gutter : 20,
        activePosition : "center",
        chevronWidth : 70,
        disableSwipe : false,
        alwaysShowChevrons : false,
        numberOfCards :  Math.floor( Width / 200 ) || 6 ,
        slidesToScroll : 1,
        outsideChevron : true,
        showSlither : false,
        firstAndLastGutter : false,
        rightChevron :  <Button shape="circle"><Icon type="right" /></Button>,
        leftChevron :  <Button shape="circle"><Icon type="left" /></Button> 
    })

    return (
    <Row>
        <Col span={20} offset={2}>
            <div>
            <h1 className='montserrat myTitle' >New Releases</h1>
                <ItemsCarousel { ...carouselProps(1) } >
                { Latest.map(item => (
                        <CCard data={item} width={ Width/10 } key={item.id} />
                    )) }
                </ItemsCarousel>

                <h1 className='montserrat myTitle' >Y</h1>
                <ItemsCarousel {...carouselProps(2)}>
                { Random.map(item => (
                        <CCard data={item} width={ Width/10 } key={item.id} />
                    )) }
                </ItemsCarousel> 
            </div>
        </Col>
    </Row>
    )
}

export default Album