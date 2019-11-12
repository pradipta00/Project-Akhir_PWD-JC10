import React, { useState, useEffect } from "react";
import { Button, Icon, Row, Col } from "antd";

import { music } from '../services'
import MusicList from '../components/MusicList'
import CCard from "../components/CustomCard";

const Main = () => {

    /* eslint-disable */
    const [activeItemIndex1, setActiveItemIndex1] = useState(0);
    const [activeItemIndex2, setActiveItemIndex2] = useState(0);
    const [Width, setWidth] = useState(0)
    const [ListMusic, setListMusic] = useState([])
    const [Show, setShow] = useState(false)

    useEffect(() => {
        music.Get('genre').then( res => {
            setListMusic(e => res)
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
    
    let detailShow = (id, name) => setShow([id, name])

    if ( Show ) return (
        <MusicList id={Show[0]} name={Show[1]} dismiss={_ => setShow(false)} type='Genre' />
    )

    return (
        <Row>
        <Col span={20} offset={2}>
            <div>
                <h1 className='montserrat myTitle' >Find your Taste Here</h1>
                <Row gutter={30} >
                    { ListMusic.map(item => (
                        <Col span={4} key={item.id} >
                            <CCard data={item} type='genre' show={detailShow} />
                        </Col>
                    )) }
                </Row>
            </div>
        </Col>
        </Row>
    )
};

export default Main;