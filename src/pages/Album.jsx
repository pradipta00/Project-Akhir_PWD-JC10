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
    /* eslint-enable */

    const [Width, setWidth] = useState(0)
    const [LIST, setLIST] = useState({ Latest : [], Random : [], Most : [] })
    const [Show, setShow] = useState(false)
    
    useEffect(() => {
        (async _ => {
            await music.Get('latest_album_thumbnail').then( res => {
                setLIST(e => ({...e , Latest: res}))
            })
            await music.Get('most_album_thumbnail').then( res => {
                setLIST(e => ({ ...e, Most: res }))
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

    let detailShow = (id, name) => setShow([id, name])

    if ( Show ) return (
        <MusicList id={Show[0]} name={Show[1]} dismiss={_ => setShow(false)} type='Album' />
    )

    return (
    <Row>
        <Col span={20} offset={2}>
            <div>
            <h1 className='montserrat myTitle' >New Releases</h1>
                <ItemsCarousel { ...carouselProps(1) } >
                { LIST.Latest.slice(0,7).map(item => (
                        <CCard data={item} key={item.id} type='album' show={detailShow} />
                    )) }
                </ItemsCarousel>

                <h1 className='montserrat myTitle' >Our Listener Favorites</h1>
                <ItemsCarousel {...carouselProps(2)}>
                { LIST.Most.map(item => (
                        <CCard data={item} key={item.id} type='album' show={detailShow} />
                    )) }
                </ItemsCarousel> 
            </div>
        </Col>
    </Row>
    )
}

export default Album