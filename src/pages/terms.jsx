import React from 'react'
import { Typography } from 'antd'

const Terms = () => {

    const { Text, Title, Paragraph } = Typography

    return (
        <div style={{ height : '60%', width : '80%', margin : 'auto', backgroundColor : '#f7f7f7', borderRadius: '2rem', marginTop : '8%', display : 'flex' }} >
            <div style={{ backgroundImage : 'linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)', height : '100%', width: '30%', 
            borderRadius : '2rem', display : 'flex', alignItems : 'center', justifyContent : 'center' }} >
                <Title style={{color:'#f7f7f7'}} >
                    Terms of Use
                </Title>
            </div>

            <div style={{ height : '100%', width: '70%', borderRadius : '2rem', padding : '0 4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection : 'column'}} >
                <Title>
                    Just use it.
                </Title>
                <Paragraph>
                    Feel free to use this app as you pleased. We won't be doing anything to it. Wanna listen to some music? come on in. Tryin to hack us? come on in. You're a teacher that assess this web? come on in. Changin the code for debug? <Text strong>Please be kind. Thanks</Text>
                </Paragraph>
            </div>
        </div>
    )
}

export default Terms