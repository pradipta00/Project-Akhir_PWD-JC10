import React, { useState, useEffect } from "react";
import { Button, Icon, Row, Col } from "antd";
import ItemsCarousel from "react-items-carousel";

import { music } from '../services'
import CCard from "../components/CustomCard";

const Home = () => {

    /* eslint-disable */
    const [activeItemIndex1, setActiveItemIndex1] = useState(0);
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    const [activeItemIndex3, setActiveItemIndex3] = useState(0);
    const [Width, setWidth] = useState(0)
    const [ListMusic, setListMusic] = useState({ Latest : [], Most : [], Least : [] })

    useEffect(() => {
        music.Get('latest_music_artist').then( res => {
            setListMusic(e => ({ ...e, Latest : res }))
        })
        music.Get('most_music_artist').then( res => {
            setListMusic(e => ({ ...e, Most : res }))
        })
        music.Get('least_music_artist').then( res => {
            setListMusic(e => ({ ...e, Least : res }))
        })
        setWidth( window.innerWidth )
    }, [])

    let carouselProps = number => ({
        requestToChangeActive : eval('setActiveItemIndex' + number),
        activeItemIndex : eval('activeItemIndex' + number),
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
                <ItemsCarousel { ...carouselProps(1)} >
                { ListMusic.Latest.map(item => (
                        <CCard data={item} key={item.id} />
                    )) }
                </ItemsCarousel>

                <h1 className='montserrat myTitle' >Most Played</h1>
                <ItemsCarousel { ...carouselProps(2)} >
                { ListMusic.Most.map(item => (
                        <CCard data={item} key={item.id} />
                    )) }
                </ItemsCarousel>

                <h1 className='montserrat myTitle' >Try This</h1>
                <ItemsCarousel { ...carouselProps(3)} >
                { ListMusic.Least.map(item => (
                        <CCard data={item} key={item.id} />
                    )) }
                </ItemsCarousel>
            </div>
        </Col>
        </Row>
    )
};

export default Home;