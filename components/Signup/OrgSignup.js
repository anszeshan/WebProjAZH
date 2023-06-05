import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBox from '../Generic/SideBox'
import { Col, Input, Radio, Row, Select, Upload } from 'antd'
import './../Generic/credForm.css'
import { Link } from 'react-router-dom'
import { Form, Button, message } from 'antd'
import { useGetAllCountriesQuery, useOrgSignupMutation } from '../../services/nodeAPI'
import ImgCrop from 'antd-img-crop'

const { Option }=Select

const OrgSignup=() => {
  const [ orgSignup ]=useOrgSignupMutation()
  const navigate=useNavigate()
  const [ messageApi, contextHolder ]=message.useMessage();
  const { data: countriesData }=useGetAllCountriesQuery()
  const [ form ]=Form.useForm()
  const [ fileList, setFileList ]=useState( [] )
  const [ countries, setCountries ]=useState( null )
  const interest=[ 'Engineering', 'CS', 'Biology' ];

  const validatePasswordLength=( _, value ) => {
    if ( value&&value.length<8 ) {
      return Promise.reject( 'Password must be at least 8 characters' );
    }
    return Promise.resolve();
  };
  const onImgChange=( { fileList: newFileList } ) => {
    setFileList( newFileList )
  }
  const onPreview=async file => {
    let src=file.url
    if ( !src ) {
      src=await new Promise( resolve => {
        const reader=new FileReader()
        reader.readAsDataURL( file.originFileObj )
        reader.onload=() => resolve( reader.result )
      } )
    }
    const image=new Image()
    image.src=src
    const imgWindow=window.open( src )
    imgWindow?.document.write( image.outerHTML )
  }

  useEffect( () => {
    let _Countries=[]
    countriesData&&
      countriesData.map( el => {
        return _Countries.push( {
          value: el.name.toLowerCase(),
          label: el.name
        } )
      } )
    setCountries( _Countries )
  }, [ countriesData ] )

  const onFinish=async values => {
    console.log( values )
    if ( !fileList[ 0 ] )
      return messageApi.open( {
        type: 'error',
        content: 'Please select an image'
      } )
    let formData=new FormData()
    formData.append( 'photo', fileList[ 0 ].originFileObj )
    formData.append( 'email', values.email )
    formData.append( 'name', values.name )
    formData.append( 'domain', values.domain )
    formData.append( 'website', values.website )
    formData.append( 'address', values.address )
    formData.append( 'country', values.country )
    formData.append( 'phone', values.phone )
    formData.append( 'about', values.about )
    formData.append( 'type', values.type )
    formData.append( 'role', values.role )
    formData.append( 'password', values.password )
    formData.append( 'passwordConfirm', values.passwordConfirm )
    const res=await orgSignup( formData );
    console.log( 'RESPONSE:', res );
    // if ( res.data&&res.data.status==='success' ) {
    //   messageApi.open( {
    //     type: 'success',
    //     content: 'You have signed up successfully!',
    //   } );
    //   form.resetFields();
    //   setTimeout( () => {
    //     navigate( '/login' )
    //   }, 1000 )
    // }
    // else if ( res.data&&res.data.status==='error' ) {
    //   messageApi.open( {
    //     type: 'error',
    //     content: 'Sign up failed!',
    //   } );
    // }
    // else if ( res.error.data.message.includes( 'duplicate key error' ) ) {
    //   messageApi.open( {
    //     type: 'error',
    //     content: 'Email taken!',
    //   } );
    // }
  }
  const onFinishFailed=errorInfo => {
    console.log( 'Failed:', errorInfo )
  }

  return (
    <>
      {contextHolder}
      <div className='flex flex-wrap'>
        <div className='hidden md:block md:w-6/12'>
          <SideBox
            image='Group 614.png'
            width='320px'
            imageClass={'w-5/12 mt-28 mb-12'}
          />
        </div>

        <div className='w-full md:w-6/12 flex justify-center'>
          <div className='w-full lg:w-10/12 2xl:w-8/12'>
            <div className='ps-4 pe-4 mt-10'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-3xl font-medium text-center'>
                    Create Organization/Institute Account
                  </h1>
                  <p className='text-center'>
                    Please provide all the required information.
                  </p>
                </div>

                <div className='mt-10 signup-form-fields pe-4'>
                  {countries&&
                    <Form
                      form={form}
                      name='basic'
                      initialValues={{
                        remember: true
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                      autoComplete='on'
                    >
                      <div style={{ textAlign: "center", marginBottom: '1rem' }}>
                        <ImgCrop rotate>
                          <Upload
                            listType='picture-card'
                            fileList={fileList}
                            onChange={onImgChange}
                            onPreview={onPreview}
                            beforeUpload={() => false}
                          >
                            {fileList.length<1&&'+ Logo'}
                          </Upload>
                        </ImgCrop>
                      </div>
                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='email'
                            rules={[
                              {
                                required: true,
                                type: 'email'
                              }
                            ]}
                          >
                            <Input placeholder='Enter Organization/institue email' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='name'
                            rules={[
                              {
                                required: true,
                                message: 'Please input organization/institue name!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter Organization/institue name' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='domain'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter Domain' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='country'
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Please select country!'
                              }
                            ]}
                          >
                            <Select showSearch placeholder='Select country'>
                              {countries.map( ( el, i ) => (
                                <Option key={i} value={el.value}>
                                  {el.label}
                                </Option>
                              ) )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='website'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter website' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='address'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter address' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='phone'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter phone' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='about'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter about' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item name="type"
                        rules={[
                          {
                            required: true,
                            message: 'Please select type!'
                          }
                        ]}>
                        <Radio.Group>
                          <Radio value="public"> Public </Radio>
                          <Radio value="private"> Private </Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Form.Item name="role"
                        rules={[
                          {
                            required: true,
                            message: 'Please select role!'
                          }
                        ]}>
                        <Radio.Group>
                          <Radio value="institute"> Institute </Radio>
                          <Radio value="organization"> Organization </Radio>
                        </Radio.Group>
                      </Form.Item>

                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='password'
                            rules={[
                              {
                                required: true,
                                validator: validatePasswordLength
                              }
                            ]}
                          >
                            <Input.Password placeholder='Enter Password' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='passwordConfirm'
                            dependencies={[ 'password' ]}
                            hasFeedback
                            rules={[
                              {
                                required: true,
                                message: 'Please confirm your password!'
                              },
                              ( { getFieldValue } ) => ( {
                                validator( _, value ) {
                                  if ( !value||getFieldValue( 'password' )===value ) {
                                    return Promise.resolve()
                                  }
                                  return Promise.reject(
                                    new Error(
                                      'The two passwords that you entered do not match!'
                                    )
                                  )
                                }
                              } )
                            ]}
                          >
                            <Input.Password placeholder='Enter Confirm Password' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <Form.Item>
                        <Button
                          style={{ height: '2.5rem' }}
                          size='small'
                          className='btn create_account_btn w-100'
                          type='primary'
                          htmlType='submit'
                        >
                           <Link to='/login' className='ms-2 inline_link'>
                
                          Create Account
                          
                </Link>
                        </Button>
                      </Form.Item>
                    </Form>}
                </div>
              </div>
            </div>

            <div className='move_login text-center' style={{ fontSize: '12px' }}>
              <p>
                Already have an account?
                <Link to='/login' className='ms-2 inline_link'>
                  Login
                </Link>
              </p>
              <p>
                Create User account?
                <Link to='/signup/user' className='ms-2 inline_link'>
                  Create User
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default OrgSignup;
