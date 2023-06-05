import React, { useEffect, useState } from 'react'
import { PageHeader } from '../Generic/PageHeader'
import { Form, Button, Input, Row, Col, Select, message } from 'antd'
import { useCreateJobMutation, useGetAllCountriesQuery } from '../../services/nodeAPI'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const { TextArea } = Input
const { Option }=Select

export const AddJob=() => {
  const [ createJob ]=useCreateJobMutation();
  const [ form ]=Form.useForm()
  const [ messageApi, contextHolder ]=message.useMessage();
  const { data: countriesData }=useGetAllCountriesQuery()
  const [ countries, setCountries ]=useState( null )
  const { user }=useSelector( state => state.user );
  const navigate=useNavigate();
  const onChange=value => {
    console.log( `selected ${value}` )
  }
  const onSearch = value => {
    console.log('search:', value)
  }
  const onFinish=async ( values ) => {
    let data={ ...values }
    data.employer=user._id;
    data.oppType=values.jobType;
    console.log( 'SUCCESS:', data )
    const res=await createJob( data );
    console.log( 'RESPONSE:', res );
    if ( res.data&&res.data.status==='success' ) {
      messageApi.open( {
        type: 'success',
        content: 'Job added successfully!',
      } );
      form.resetFields();
      setTimeout( () => {
        navigate( '/dashboard/jobs' )
      }, 1000 )
    }
    else {
      messageApi.open( {
        type: 'error',
        content: 'SOmething went wrong!',
      } );
    }
  }
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo)
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
  return (
    <>
      {contextHolder}
    <div>
      <PageHeader heading='Add Job' subHeading='You can add job here' />
      <div>
          {countries&&<Form
          name='basic'
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete='off'
          layout='vertical'
        >
          <Row>
            <Col span={10}>
              <Form.Item
                label='Job Title'
                  name='title'
                rules={[
                  {
                    required: true,
                    message: 'Please input job title!'
                  }
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={10}>
              <Form.Item
                label='Research Interests'
                  name='domain'
                rules={[
                  {
                    required: true,
                    message: 'Please input job research interests!'
                  }
                ]}
              >
                <Select
                mode='multiple'
                  showSearch
                  placeholder='Select research interests'
                  optionFilterProp='children'
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 'web',
                      label: 'PHD position'
                    },
                    {
                      value: 'app',
                      label: 'Research grant'
                    },
                    {
                      value: '',
                      label: 'Research Engineer'
                    }
                  ]}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={21}>
              <Form.Item
                label='Job Description'
                  name='description'
                rules={[
                  {
                    required: true,
                    message: 'Please input job description!'
                  }
                ]}
              >
                <TextArea maxLength={12} rows={5} />
              </Form.Item>
            </Col>
          </Row>


          <Row>
            <Col span={10}>
              <Form.Item
                label='Job Requirements'
                  name='requirements'
                rules={[
                  {
                    required: true,
                    message: 'Please input job requirements!'
                  }
                ]}
              >
                <TextArea maxLength={10} rows={3} />
              </Form.Item>
            </Col> 
            <Col span={1}></Col>
            <Col span={10}>
              <Form.Item
                label='Job Instructions'
                  name='instructions'
                rules={[
                  {
                    required: true,
                    message: 'Please input job instructions!'
                  }
                ]}
              >
                <TextArea maxLength={10} rows={3} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <Form.Item
                label='Job Type'
                name='jobType'
                rules={[
                  {
                    required: true,
                    message: 'Please input job type!'
                  }
                ]}
              >
                <Select
                  showSearch
                  placeholder='Select a job type'
                  optionFilterProp='children'
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    (option?.label ?? '')
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={[
                    {
                      value: 'contract',
                      label: 'Contract'
                    },
                    {
                      value: 'fullTime',
                      label: 'Full-Time'
                    },
                    {
                      value: 'partTime',
                      label: 'Part-Time'
                    }
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={1}></Col>
            <Col span={10}>
              <Form.Item
                label='Country'
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

          

          <Form.Item style={{marginTop:'2rem'}}>
            <Button type='primary' htmlType='submit' size='large'>
              Submit
            </Button>
          </Form.Item>
          </Form>}
      </div>
      </div>
    </>

  )
}
