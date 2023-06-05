import React from 'react'
import SideBox from './../Generic/SideBox'
import { Link } from 'react-router-dom'
import { useLoginOrgMutation, useLoginUserMutation } from '../../services/nodeAPI'
import { Form, Input, Button, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import Cook from 'js-cookie';
import { useDispatch } from 'react-redux'
import { setUser } from '../../redux/user'



const LoginForm=() => {
  const Cookies=Cook.withAttributes( {
    path: '/', sameSite: 'Strict', secure: true
  } )

  const dispatch=useDispatch();
  const [ loginUser ]=useLoginUserMutation();
  const [ loginOrg ]=useLoginOrgMutation();
  const navigate=useNavigate()
  const [ messageApi, contextHolder ]=message.useMessage();

  const [ form ]=Form.useForm();

  const onFinish=async values => {
    const userRes=await loginUser( values );
    const orgRes=await loginOrg( values );
    console.log("ANS ZESHAN" , userRes);

    if ( userRes.data&&userRes.data.status==='success' ) {
      messageApi.open( {
        type: 'success',
        content: 'You have logged in successfully!',
      } );
      form.resetFields();
     Cookies.set( "jwt", userRes.data.token );
      dispatch( setUser( userRes.data.data.user ) )
      setTimeout( () => {
        navigate( '/dashboard/user/jobs' )
      }, 1000 )
    }
    else if ( orgRes.data&&orgRes.data.status==='success' ) {
      messageApi.open( {
        type: 'success',
        content: 'You have logged in successfully!',
      } );
      form.resetFields();
      Cookies.set( "jwt", orgRes.data.token );
      dispatch( setUser( orgRes.data.data.user ) )
      setTimeout( () => {
        navigate( '/dashboard/applicants' )
      }, 1000 )
    }
    else {
      messageApi.open( {
        type: 'error',
        content: 'Incorrect email or password!',
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
          <SideBox image='illustrations2.png' imageClass='w-9/12' />
        </div>

        <div className='w-full md:w-6/12 flex justify-center'>
          <div className='w-full lg:w-8/12 2xl:w-8/12'>
            <div className='px-3 mt-20'>
              <div className='form_top_content'>
                <div className='justify-center'>
                  <h1 className='text-3xl font-medium text-center'>
                    Welcome Back
                  </h1>
                  <p className='text-center'>
                    Please enter your account details to login.
                  </p>
                </div>

                <div className='mt-20'>
                  <Form
                    form={form}
                    name='basic'
                    layout='vertical'
                    initialValues={{
                      remember: true
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete='on'
                  >
                    <Form.Item
                      label='Email'
                      name='email'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your email!',
                          type: "email"
                        }
                      ]}
                    >
                      <Input />
                    </Form.Item>

                    <Form.Item
                      label='Password'
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!'
                        }
                      ]}
                    >
                      <Input.Password />
                    </Form.Item>
                    <div className='mt-3 check_input'>
                      <div className='w-100 text-end'>
                        <a href='/' className='text-blue-500 hover:text-blue-500'>
                          Forgot Password
                        </a>
                      </div>
                    </div>
                    <Form.Item
                    >
                      <Button
                        style={{ height: '2.5rem' }}
                        size='small'
                        className='btn create_account_btn w-100'
                        htmlType='submit'
                      >
                        Login
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
              </div>
            </div>

            <div className='move_signup text-center mt-5'>
              <p>
                Don't have an account?
                <Link to='/signup/user' className='ms-2 inline_link'>
                  Create Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div></>
  )
}

export default LoginForm
