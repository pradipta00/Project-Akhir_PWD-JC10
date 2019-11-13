import React from 'react'
import { Typography } from 'antd'

const Contact = () => {

    const { Text, Title, Paragraph } = Typography

    return (
        <div style={{ height : '60%', width : '80%', margin : 'auto', backgroundColor : '#f7f7f7', borderRadius: '2rem', marginTop : '8%', display : 'flex' }} >
            <div style={{ backgroundImage : 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)', height : '100%', width: '30%', 
            borderRadius : '2rem', display : 'flex', alignItems : 'center', justifyContent : 'center' }} >
                <Title style={{color:'#f7f7f7'}} level={1} >
                    Contact Us
                </Title>
            </div>

            <div style={{ height : '100%', width: '70%', borderRadius : '2rem', padding : '0 1rem', display: 'flex', 
            alignItems: 'center', justifyContent : 'center' ,flexDirection : 'column'}} >
                <Title level={2} >
                    Pradipta Reynara .S
                </Title>
                <Paragraph style={{fontSize : '1.5em'}}>
                    Email  : <Text strong>Pradipta2699@gmail.com</Text> <br/>
                    Phone  : <Text strong>+628 1914 0000 48</Text> <br/>
                    Github : <Text style={{cursor:'pointer'}} onClick={_=> window.open('https://github.com/pradipta00')} strong>Pradipta00</Text> <br/>
                    StackOverflow : <Text style={{cursor:'pointer'}} onClick={_=> window.open('https://stackoverflow.com/users/12289105/pradipta-reynara')} strong>Pradipta</Text> <br/>
                </Paragraph>
            </div>
        </div>
    )
}

export default Contact 