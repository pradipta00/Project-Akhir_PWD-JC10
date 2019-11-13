import React, { useContext, useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import { Icon, Avatar, Typography, Divider, Input, Button, Popconfirm, notification } from 'antd'
import moment from 'moment'

import { GlobalState } from '../Core'
import { auth } from '../services'
import { Cookies } from 'react-cookie'

const { Title, Paragraph, Text } = Typography

const Account = () => {

    const { User, setUser } = useContext(GlobalState)
    const [Username, setUsername] = useState([ true, '' ])
    const [Fullname, setFullname] = useState([ true, '' ])
    const [Email, setEmail] = useState([ true, '' ])
    const [Redir, setRedir] = useState('')

    useEffect(() => {
        if (User.username) setUsername([true, User.username])
        if (User.fullname) setFullname([true, User.fullname])
        if (User.email) setEmail([true, User.email])
    }, [User])

    let Submit = _ => {
        console.log({ Username, Fullname, Email }, 'Edit')
    }
    let DeleteAccount = _ => { 
        auth.delete({id : User.id, table : 'users'}).then(res => {
            new Cookies().remove('auth')
            setUser(false)
            setTimeout(_ => {
                setRedir('/home')
                notification['warning']({
                    message : 'Goodbye',
                    description : 'Your account has been deleted. We are so sorry to see you go like this. But keep in touch with us, ok?',
                    duration : 10
                })
            }, 200)
        }) 
    }

    if (Redir) return <Redirect to={Redir} />
    else if (User) return (
            <div style={{  height : '88%', width : '76%', backgroundColor : '#fff', margin : '40px auto', borderRadius : '20px' }} >
                <div style={{ height : '40%', width : '100%', backgroundColor : 'aliceblue', borderRadius : '20px', display : 'flex', alignItems : 'center', justifyContent : 'center' }} >
                    
                    <div style={{ marginRight : '2rem' }} >
                        <Avatar style={{ display : 'inline-block', verticalAlign: 'middle', fontSize : '4rem' }} size={100} shape='square'>
                            { User.fullname.match(/(^[^ ]|(?:\b)(\w))/g).join('') }
                        </Avatar>
                    </div>
                    
                    <div>
                        <Title style={{ marginTop : 0, marginBottom : 0 }} >{ User.fullname }</Title>
                        <Title level={3} style={{ marginTop : 0, marginBottom : 0 }} >({ User.username })</Title>
                    </div>
                    
                    <Divider type='vertical' style={{ width : '4px', height : '70%', marginLeft : '30px' }} />

                    <div style={{ display : 'flex', flexDirection : 'column', textAlign : 'center', marginLeft : '1rem', fontSize : '1rem' }}  >
                        {
                            User.roles === 'rakyat' ?
                            <><Icon type='sketch' style={{ fontSize : '4rem', color : '#4a4a4a' }} />
                            <span>Free Account</span></>
                            :
                            User.roles === 'pending' ?
                            <><Icon type='sketch' style={{ fontSize : '4rem', color : '#806b6b' }} />
                            <span>Pending Account</span></>
                            :
                            <><Icon type='sketch' style={{ fontSize : '4rem', color : '#ff6063' }} />
                            <span>Premium Account</span></>
                        }
                    </div>
                </div>
                <div style={{ height : '60%', width : '100%', display : 'flex' }} >
                    <div style={{ height : '100%', width : '60%', borderRadius : '20px', display : 'flex', flexDirection : 'column', padding: '0 5rem', alignItems : 'center', justifyContent : 'center' }} >
                        <Title level={3} >Account Details</Title>
                        
                        <Input addonBefore='Username :' defaultValue={User.username} onChange={e => setUsername([ false, e.target.value ])} disabled={Username[0]} suffix={<Icon type='edit' onClick={_=>setUsername(e => [!e[0], e[1]])} />} style={{ marginBottom : '1rem' }} />
                        <Input addonBefore='Fullname :' defaultValue={User.fullname} onChange={e => setFullname([ false, e.target.value ])} disabled={Fullname[0]} suffix={<Icon type='edit' onClick={_=>setFullname(e => [!e[0], e[1]])} />} style={{ marginBottom : '1rem' }} />
                        <Input addonBefore=' Email &nbsp; :' type='email' defaultValue={User.email} onChange={e => setEmail([ false, e.target.value ])} disabled={Email[0]} suffix={<Icon type='edit' onClick={_=>setEmail(e => [!e[0], e[1]])} />} />
                        <div style={{display : 'flex', alignItems : 'flex-start', width : '100%', marginTop : '1rem'}} >
                            <Popconfirm placement='bottomLeft' title='This cannot be undone!' onConfirm={DeleteAccount} >
                                <Button type='danger' style={{ marginRight : '0.4rem' }} >Delete Account</Button>
                            </Popconfirm>

                            { !Username[0] || !Fullname[0] || !Email[0] ? <Button type='primary' onClick={Submit}>Save</Button> : '' }
                        </div>
                    </div>
                    <div style={{ height : '100%', width : '40%', borderRadius : '20px', display : 'flex', paddingRight : '2rem', alignItems : 'center', justifyContent : 'center' }} >
                        <Divider type='vertical' style={{ width : '4px', height : '55%', marginRight : '2rem' }} />

                        { 
                            User.roles === 'rakyat' ?
                            <div>
                                <Title level={3} >Upgrade to premium</Title>
                                <Paragraph>
                                    Listen to unlimited music now by upgrading to premium account, and a lot more benefit than you could expect. 
                                    <br />
                                    <Text strong>
                                        All for Rp 20.000 / month
                                    </Text>
                                </Paragraph>
                                <Button type='primary' onClick={_=> setRedir('/pricing')} >Go Premium</Button>
                            </div>
                            : User.roles === 'presiden' ?
                            <div>
                                <Title level={3} >Account Details</Title>
                                <Paragraph>
                                    Hi, you are an admin here. Please take care of us.
                                    <br />
                                    Premium expiration date : &nbsp;
                                    <Text strong>
                                        Infinity
                                    </Text>
                                    <br /><br />
                                    Contact us for help at
                                    <br />
                                    <Text strong>
                                        +628 1914 0000 48
                                    </Text>
                                </Paragraph>
                            </div>
                            : User.roles === 'pending' ?
                            <div>
                                <Title level={3} >Premium Details</Title>
                                <Paragraph>
                                    Hi, your premium is on pending. Please wait while our admin review your payment
                                    <br />
                                    Premium expiration date : &nbsp;
                                    <Text strong> Unknown </Text>
                                    <br /><br />
                                    Contact us for help at
                                    <br />
                                    <Text strong>
                                        +628 1914 0000 48
                                    </Text>
                                </Paragraph>
                            </div>
                            :
                            <div>
                                <Title level={3} >Premium Details</Title>
                                <Paragraph>
                                    Congratulations, you are a premium member.
                                    <br />
                                    Premium expiration date : &nbsp;
                                    <Text strong>
                                        {moment(new Date(User.premiumend)).format('DD MMM YYYY')}
                                    </Text>
                                    <br /><br />
                                    Contact us for help at
                                    <br />
                                    <Text strong>
                                        +628 1914 0000 48
                                    </Text>
                                </Paragraph>
                            </div>
                        }
                    </div>
                </div>
            </div>
    )
    else return <Redirect to='/home' />
}

export default Account
