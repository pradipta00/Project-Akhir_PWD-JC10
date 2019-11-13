import React from 'react'
import { List, Typography } from 'antd'

const FAQ = () => {

    const { Text, Title, Paragraph } = Typography

    let data = [
        {
            question : `I haven't make an account yet. Can i listen to a music?`,
            answer : `Unfortunately no. you need to be logged in to tune in to our services`
        },
        {
            question : `What's the difference between a free and premium account?`,
            answer : `With free account you can only listen to a maximum of 3 music a day. This limitation doesn't happen in the premium account.`
        },
        {
            question : `Okay so i already buy a premium account. Why does it say pending?`,
            answer : `This means that your transaction is being reviewed by the admin. If in 48 Hours your status hasn't changed. Please contact us`
        },
    ]

    return (
        <div style={{ height : '80%', width : '80%', margin : 'auto', backgroundColor : '#f7f7f7', borderRadius: '2rem', marginTop : '5%', display : 'flex' }} >
            <div style={{ backgroundImage : 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)', height : '100%', width: '30%', 
            borderRadius : '2rem', display : 'flex', alignItems : 'center', justifyContent : 'center' }} >
                <Title style={{color:'#f7f7f7'}} >
                    FAQ
                </Title>
            </div>

            <div style={{ height : '100%', width: '70%', borderRadius : '2rem', padding : '0 1rem', display: 'flex', alignItems: 'center'}} >
                <List
                    size="large"
                    dataSource={data}
                    renderItem={item => <><List.Item style={{ display : 'flex', flexDirection: 'column', alignItems: 'flex-start' }} >
                        <Paragraph style={{fontSize : '1.2em'}} ><Text strong> Q : </Text> {item.question}</Paragraph>
                        <Paragraph style={{fontSize : '1.2em'}} ><Text strong> A : </Text> {item.answer}</Paragraph>
                        </List.Item></>}
                    />
            </div>
        </div>
    )
}

export default FAQ
