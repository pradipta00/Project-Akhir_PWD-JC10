import React from 'react'
import { Typography } from 'antd'

const Policy = () => {

    const { Text, Title, Paragraph } = Typography

    return (
        <div style={{ height : '60%', width : '80%', margin : 'auto', backgroundColor : '#f7f7f7', borderRadius: '2rem', marginTop : '8%', display : 'flex' }} >
            <div style={{ backgroundImage : 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)', height : '100%', width: '30%', 
            borderRadius : '2rem', display : 'flex', alignItems : 'center', justifyContent : 'center' }} >
                <Title style={{color:'#f7f7f7'}} >
                    Privacy Policy
                </Title>
            </div>

            <div style={{ height : '100%', width: '70%', borderRadius : '2rem', padding : '0 4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection : 'column'}} >
                <Title>
                    We. Don't. Sell. Your. Data.
                </Title>
                <Paragraph>
                    Worry not. We are just a simple website aiming to be a next-generation web apllication. This app is created for the sole purpose of graduating. That's right, if you read this : <Text strong>Please be kind to my score. thanks</Text>
                </Paragraph>
            </div>
        </div>
    )
}

export default Policy
