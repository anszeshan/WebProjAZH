import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SideBox from '../Generic/SideBox'
import { Col, Input, Radio, Row, Select, Upload } from 'antd'
import './../Generic/credForm.css'
import { Link } from 'react-router-dom'
import { Form, Button, message } from 'antd'
import { useGetAllCountriesQuery, useUserSignupMutation } from '../../services/nodeAPI'
import ImgCrop from 'antd-img-crop'

const { Option }=Select

const UserSignup=() => {
  const [ userSignup ]=useUserSignupMutation();
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

    if ( !fileList[ 0 ] ) {
      console.log( 'img errr' )
      return messageApi.open( {
        type: 'error',
        content: 'Please select an image'
      } )
    }
    let formData=new FormData()
    formData.append( 'photo', fileList[ 0 ].originFileObj )
    formData.append( 'email', values.email )
    formData.append( 'name', values.name )
    formData.append( 'phone', values.phone )
    formData.append( 'country', values.country )
    formData.append( 'researchInterest', values.researchInterest )
    formData.append( 'role', values.role )
    formData.append( 'degree', values.degree )
    formData.append( 'field', values.field )
    formData.append( 'institue', values.institute )
    formData.append( 'yearGrad', values.yearGrad )
    formData.append( 'skills', values.skills )
    formData.append( 'language', values.language )
    formData.append( 'password', values.password )
    formData.append( 'passwordConfirm', values.passwordConfirm )
    const res=await userSignup( formData );
    console.log( 'RESPONSE:', res );
    if ( res.data&&res.data.status==='success' ) {
      messageApi.open( {
        type: 'success',
        content: 'You have signed up successfully!',
      } );
      form.resetFields();
      setTimeout( () => {
        navigate( '/login' )
      }, 1000 )
    }
    else if ( res.data&&res.data.status==='error' ) {
      messageApi.open( {
        type: 'error',
        content: 'Sign up failed!',
      } );
    }
    else if ( res.error.data.message.includes( 'duplicate key error' ) ) {
      messageApi.open( {
        type: 'error',
        content: 'Email taken!',
      } );
    }
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
            <div className='ps-4 pe-4 mt-1'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-3xl font-medium text-center'>
                    Create User Account
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
                            {fileList.length<1&&'+ Profile'}
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
                            <Input placeholder='Enter email' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='name'
                            rules={[
                              {
                                required: true,
                                message: 'Please input your Full name!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter full name' />
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
                            <Input placeholder='Enter Phone no' />
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
                        <Col span={24}>
                          <Form.Item
                            name='researchInterest'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Select showSearch mode="multiple" placeholder='Select your interest'>
                              {interest.map( ( el, i ) => (
                                <Option key={i} value={el}>
                                  {el}
                                </Option>
                              ) )}
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                      <Form.Item name="role"
                        rules={[
                          {
                            required: true,
                            message: 'Please select role!'
                          }
                        ]}>
                        <Radio.Group>
                          <Radio value="researcher"> Researcher </Radio>
                          <Radio value="student"> Student </Radio>
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

                      <h5>Eduction:</h5>
                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='degree'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter degree' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='field'
                            rules={[
                              {
                                required: true,
                                message: 'Please input field of study!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter field of study' />
                          </Form.Item>
                        </Col>
                      </Row>
                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='institute'
                            rules={[
                              {
                                required: true,
                                message: 'Please input institute!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter institute' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='yearGrad'
                            rules={[
                              {
                                required: true,
                                message: 'Please input gradution year!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter year of gradution' />
                          </Form.Item>
                        </Col>
                      </Row>

                      <h5>Skill and Languages:</h5>
                      <Row>
                        <Col span={11}>
                          <Form.Item
                            name='skills'
                            rules={[
                              {
                                required: true,
                                type: 'text'
                              }
                            ]}
                          >
                            <Input placeholder='Enter skills e.g. Engineer, electrition..' />
                          </Form.Item>
                        </Col>
                        <Col span={2}></Col>
                        <Col span={11}>
                          <Form.Item
                            name='language'
                            rules={[
                              {
                                required: true,
                                message: 'Please languages!'
                              }
                            ]}
                          >
                            <Input placeholder='Enter languages English, Urdu...' />
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
                          Create Account
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
                Create Organization account?
                <Link to='/signup/org' className='ms-2 inline_link'>
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default UserSignup
