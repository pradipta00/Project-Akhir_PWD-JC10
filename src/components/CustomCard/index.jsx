import React from 'react'

import { Card, Icon } from 'antd'

const CCard = (props) => (
    <div className="parent">
        <Card hoverable cover={<img alt="" src={props.img} />} bordered={false} bodyStyle={{display : 'none '}} >
            
        </Card>
        <div className='overlay' >
            <Icon type="play-circle" className='button-foot' onClick={_ => alert("ASHIAP1")} style={{fontSize : "3rem"}} />
        </div>
    </div>
)

export default CCard
