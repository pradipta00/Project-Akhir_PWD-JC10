import React, { useState, useEffect } from 'react'
import { Button, Icon, Row, Col } from 'antd'
import ItemsCarousel from "react-items-carousel";

import CCard from "../components/CustomCard";
import MusicList from '../components/MusicList'
import { music } from '../services'

const Album = () => {
    
    /* eslint-disable */
    const [activeItemIndex1, setActiveItemIndex1] = useState(0);
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    const [activeItemIndex3, setActiveItemIndex3] = useState(0);
    /* eslint-enable */

    const [Width, setWidth] = useState(0)
    const [LIST, setLIST] = useState({ AllTime : [], Today : [], Month : [] })
    const [Show, setShow] = useState(false)
    
    useEffect(() => {
        music.Get('most_music_artist').then( res => {
            setLIST(e => ({...e , AllTime: res}))
        })
        music.Get('most_music_artist_today').then( res => {
            setLIST(e => ({...e , Today: res}))
        })
        music.Get('most_music_artist_month').then( res => {
            setLIST(e => ({...e , Month: res}))
        })
        setWidth( window.innerWidth )
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

    if ( Show ) return (
        <MusicList id={Show[0]} name={Show[1]} dismiss={_ => setShow(false)} type='Album' />
    )

    return (
    <Row>
        <Col span={20} offset={2}>
            <div>
            <h1 className='montserrat myTitle' >MOST LISTENED ALL TIME</h1>
                <ItemsCarousel { ...carouselProps(1) } >
                { LIST.AllTime.map(item => (
                        <CCard data={item} key={item.id} type='music' />
                    )) }
                </ItemsCarousel>
            
            {  LIST.Today.length ? <h1 className='montserrat myTitle' >Today Hits</h1> : ''}
                <ItemsCarousel { ...carouselProps(2) } >
                { LIST.Today.map(item => (
                        <CCard data={item} key={item.id} type='music' />
                    )) }
                </ItemsCarousel>

            <h1 className='montserrat myTitle' >This Month Top Tier</h1>
                <ItemsCarousel { ...carouselProps(3) } >
                { LIST.Month.map(item => (
                        <CCard data={item} key={item.id} type='music' />
                    )) }
                </ItemsCarousel>
            </div>
        </Col>
    </Row>
    )
}

export default Album