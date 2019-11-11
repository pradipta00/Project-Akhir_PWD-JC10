import React, { useState, useEffect } from "react";
import { Button, Icon, Row, Col } from "antd";
import ItemsCarousel from "react-items-carousel";

import { music } from '../services'
import CCard from "../components/CustomCard";

const Home = () => {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    const [Width, setWidth] = useState(0)
    const [ListMusic, setListMusic] = useState([])

    useEffect(() => {
        music.Get('latest_music_artist').then( res => {
            setListMusic(res.reverse())
        })
        setWidth( window.innerWidth )
    }, [])

    let carouselProps = {
        requestToChangeActive : setActiveItemIndex,
        activeItemIndex : activeItemIndex,
        infiniteLoop : true,
        gutter : 20,
        activePosition : "center",
        chevronWidth : 70,
        disableSwipe : false,
        alwaysShowChevrons : false,
        numberOfCards :  Math.floor( Width / 200 ) ,
        slidesToScroll : 1,
        outsideChevron : true,
        showSlither : false,
        firstAndLastGutter : false,
        rightChevron :  <Button shape="circle"><Icon type="right" /></Button>,
        leftChevron :  <Button shape="circle"><Icon type="left" /></Button> 
    }

    return (
        <Row>
        <Col span={20} offset={2}>
            <div>
                <h1 className='montserrat myTitle' >New Releases</h1>
                { Width ? 
                    <ItemsCarousel { ...carouselProps} >
                    { ListMusic.map(item => (
                            <CCard data={item} width={ Width/10 } key={item.id} />
                        )) }
                    </ItemsCarousel> : <></> }
            </div>
        </Col>
        </Row>
    )
};

export default Home;