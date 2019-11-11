import React, { useState, useContext } from "react";
import { Divider, Typography, Button, Select, Upload, message } from "antd";
import { files, auth } from '../services'
import { GlobalState } from '../Core.js'
import Login from '../components/Login'

const { Title, Paragraph, Text } = Typography, { Option } = Select

const Pricing = () => {

    const [Buy, setBuy] = useState('')
    const [Payment, setPayment] = useState('')
    const [Loading, setLoading] = useState(false)
    const [Modal, setModal] = useState(false)
    const { User, refreshUser } = useContext(GlobalState)

    let handleBuy = type => {
        if (!User) setModal(true)
        else if (User.roles === 'pending') message.info('Your premium membership is on process.')
        else if (User.roles !== 'rakyat') message.info('You are already a premium member')
        else setBuy(type)
    }

    let uploadData = data => {
        setLoading(true)

        let fd = new FormData();
        fd.append( 'payment', data )
    
        files.UploadPayment(fd).then(res => {
            message.success('File Uploaded')
            let list = {
                userId : User.id,
                files : res,
                type : Buy
            }
            auth.transaction(list)
            .then( ans => {
                message.success('Transaction Saved')
                setLoading(false)
            })
            .catch(err => {
                message.failed('Transaction failed to saved. Please retry or contact an admin')
                setLoading(false)
                console.log(err)
            })
            .then(_=> {
                refreshUser()
                setBuy('TransactionSuccess')
            })
        })        
    }

    let uploadProps = {
        accept : 'image/*'  ,
        multiple : false,
        showUploadList : false,
        disabled : Loading,
        beforeUpload : uploadData
    }
    

    if (!Buy) return (
        <div style={{ display : 'flex', height : '100%', alignContent : 'center' }} >
            <Login show={Modal} dismiss={_=> setModal(false)} />
            <div style={{  height : '65%', width : '76%', backgroundColor : '#fff', margin : 'auto', borderRadius : '20px', display : 'flex', alignContent: 'space-around'}} >
                <div style={{  height : '100%', width : '49%', borderRadius : '20px', display : 'flex', alignContent: 'center', justifyContent : 'center', flexDirection : 'column', padding : '0 4rem' }} >
                    <Title>
                        1 Month
                    </Title>
                    <Paragraph>
                        Get premium for 1 month. Suitable for those who's new to our service and want to try out what's here.
                    </Paragraph>
                    <Paragraph>
                        Price : <Text strong >Rp 20.000</Text>
                    </Paragraph>
                    <Button type='primary' onClick={_=> handleBuy('month')} >
                        Buy
                    </Button>
                </div>
                <Divider type='vertical' style={{ height : '60%', margin : 'auto', width : '4px' }} />
                <div style={{  height : '100%', width : '49%', borderRadius : '20px', display : 'flex', alignContent: 'center', justifyContent : 'center', flexDirection : 'column', padding : '0 4rem' }} >
                    <Title>
                        1 Year
                    </Title>
                    <Paragraph>
                        A special bundle for those who mean it. Suitable for those who check-in here daily. Get our special price now!
                    </Paragraph>
                    <Paragraph>
                        Price : <Text strong >Rp 160.000</Text>
                    </Paragraph>
                    <Button type='primary' onClick={_=> handleBuy('year')} >
                        Buy
                    </Button>
                </div>
            </div>
        </div>
    )
    else if(Buy === 'TransactionSuccess') return (
        <div style={{ display : 'flex', height : '100%', alignContent : 'center' }} >
            <div style={{  height : '65%', width : '76%', padding : '0 20%', backgroundColor : 'aliceblue', margin : 'auto', borderRadius : '20px', display : 'flex', alignItems: 'center', justifyContent : 'center', flexDirection : 'column'}} >
                <Title>
                    Thank You.
                </Title>
                <Paragraph style={{textAlign : 'center'}} >
                    Your transactioned will be reviewed by our admin in 1-2 working days. In the meantime you can go listen to our top selected music.
                </Paragraph>
            </div>
        </div>
    )
    else return (
        <div style={{ display : 'flex', height : '100%', alignContent : 'center' }} >
            <div style={{  height : '65%', width : '76%', backgroundColor : '#fff', margin : 'auto', borderRadius : '20px', display : 'flex', alignContent: 'space-around'}} >
                <div style={{  height : '100%', width : '49%', borderRadius : '20px', display : 'flex', alignItems : 'start' ,justifyContent : 'center', flexDirection : 'column', padding : '0 4rem' }} >
                    <Title level={2} >
                        Select Payment Options
                    </Title>
                    <Select onChange={val => setPayment(val)} style={{width : '50%'}} placeholder='Pay with dana or ovo' >
                        <Option value='dana' >Dana</Option>
                        <Option value='ovo' >OVO</Option>
                    </Select>

                    <Title level={3} className='mt-1'>
                        Details :
                    </Title>
                    <Paragraph>
                        <Text strong >Plan : </Text> 1 {Buy} <br/>
                        <Text strong >Total Price : </Text> {Buy === 'month' ? 'Rp 20.000' : 'Rp 160.000'}
                    </Paragraph>

                    {
                        Payment ?
                        <Title level={4} >
                            Upload transaction proof <Upload {...uploadProps} ><Button loading={Loading} icon='upload'>Upload</Button></Upload>
                        </Title>
                        :
                        <Title level={4} >
                            Or <Button type='default' onClick={_=> setBuy('')} >Change Plan</Button>
                        </Title>
                    }
                </div>
                <Divider type='vertical' style={{ height : '60%', margin : 'auto', width : '4px' }} />
                <div style={{  height : '100%', width : '49%', borderRadius : '20px', display : 'flex', alignItems: 'center', justifyContent : 'center', flexDirection : 'column', padding : '0 4rem' }} >
                    { 
                        Payment === 'dana' ?
                        <img src="http://localhost:8080/payment/dana.png" alt="" width='80%' />
                        : Payment === 'ovo' ?
                        <img src="http://localhost:8080/payment/ovo.png" alt="" width='80%' /> : ''
                    }
                </div>
            </div>
        </div>

    )
};

export default Pricing;