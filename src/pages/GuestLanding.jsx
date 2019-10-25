import React, { useState } from "react";
import { Button, Icon, Row, Col } from "antd";
import ItemsCarousel from "react-items-carousel";

import Banner from "../components/Banner";
import CCard from "../components/CustomCard";

const GuestLanding = () => {

    const [activeItemIndex, setActiveItemIndex] = useState(0);
    let arr = [0,1,2,3,4,5,6,7,8,9]

    return (
        <Row>
        <Col span={22} offset={1}>
            <Banner />

            <div style={{ padding: "0 60px", maxWidth: "80%", margin: "5rem auto 0" }}>
                <ItemsCarousel
                    requestToChangeActive={setActiveItemIndex}
                    activeItemIndex={activeItemIndex}
                    infiniteLoop={true}
                    gutter={20}
                    activePosition={"center"}
                    chevronWidth={70}
                    disableSwipe={false}
                    alwaysShowChevrons={false}
                    numberOfCards={5}
                    slidesToScroll={1}
                    outsideChevron={true}
                    showSlither={false}
                    firstAndLastGutter={false}
                    rightChevron={ <Button shape="circle"><Icon type="right" /></Button> }
                    leftChevron={ <Button shape="circle"><Icon type="left" /></Button> }>
                    {
                        arr.map(_ => (
                            <div>
                                <CCard img="http://localhost:8080/thumbnail/images.jpg" />
                            </div>
                        ))
                    }
                </ItemsCarousel>
                </div>
        </Col>
        </Row>
    );
};

export default GuestLanding;
