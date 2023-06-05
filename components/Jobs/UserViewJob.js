// import React, {useState} from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Card, Row,Col, Divider,Modal, Tag, Button, Space, Input, Form, Upload} from 'antd';
// import { Stack, Typography , Box} from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { useAddJobToWishListMutation, useGetJobQuery, useSubmitApplicationMutation } from '../../services/nodeAPI';
// import Spinner from '../Spinner';
// import { useSelector } from 'react-redux';
// const {TextArea }= Input
// export const UserViewJob=() => {
//   let { jobId }=useParams();
//   const { data, error, isLoading }=useGetJobQuery( { jobId } );
//   const [ addJobToWishList ]=useAddJobToWishListMutation();
//   const [ submitApplication ]=useSubmitApplicationMutation();
//   const [ isModalOpen, setIsModalOpen ]=useState( true );
//   const { user }=useSelector( state => state.user );
//   const handleWishList=async ( id ) => {

//     const res=await addJobToWishList( { userId: user._id, data: { jobid: id } } );
//     console.log( 'Res', { userId: user.id, data: { jobid: id } }, res );

//   }
  
//   const onFinish=async ( values ) => {
//     console.log( 'Success:', values );
//     let data={ ...values };
//     console.log( data )
//     data.applicant=user._id;
//     data.date=`${new Date()}`;
//     data.job=jobId;
//     const res=await submitApplication( data );
//     console.log( "##RES:", res )
//       };
//       const onFinishFailed = (errorInfo) => {
//         console.log('Failed:', errorInfo);
//       };
//     const showModal = () => {
//       setIsModalOpen(true);
//     };
//     const handleOk = () => {
//       setIsModalOpen(false);
//     };
//     const handleCancel = () => {
//       setIsModalOpen(false);
//     };


//     const props = {
//         name: 'file',
//         // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
//         headers: {
//           authorization: 'authorization-text',
//         },
//         onChange(info) {
//         //   if (info.file.status !== 'uploading') {
//         //     console.log(info.file, info.fileList);
//         //   }
//         //   if (info.file.status === 'done') {
//         //     message.success(`${info.file.name} file uploaded successfully`);
//         //   } else if (info.file.status === 'error') {
//         //     message.error(`${info.file.name} file upload failed.`);
//         //   }
//         },
//       };

//   if ( isLoading&&!data )
//     return <Spinner />
//     return (
//       <div>
//         {console.log( 'Data----->:', data )}
//         {/* <h3>HELLO</h3> */}
//         {/* {console.log( 'Value' )} */}

//              <div>
//              <Modal title="Submit Proposal" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//              <Form
//     name="basic"
//         layout='vertical'
//     initialValues={{
//       remember: true,
//     }}
//     onFinish={onFinish}
//     onFinishFailed={onFinishFailed}
//     autoComplete="off"
//   >
//     <Form.Item
//       label="Cover Letter"
//                 name="coverLetter"
//       rules={[
//         {
//           required: true,
//           message: 'Please input cover letter!',
//         },
//       ]}
//     >
//       <TextArea  rows={5}/>
//               </Form.Item>
//     <Form.Item
   
//     >
//       <Button type="primary" htmlType="submit">
//         Submit
//       </Button>
//     </Form.Item>
//   </Form>
//       </Modal>
//         </div>
//               <div>
//             <div style={{ paddingInline: '2rem' }}>
//         <Card style={{ padding: '30px 30px' }}>
//           <div style={{ paddingInline: '5rem', paddingBlock: '3rem' }}>
//             <Row>
//               <Col span={16}>
//                     <Typography variant='h2'>{data.data.title}</Typography>

//                 <Stack direction='row' alignItems='center' spacing={1}>
//                     <small>by</small>
//                   <Typography style={{fontSize:'1.4rem', opacity:0.8}} noWrap>
//                         {data.data.employer.name}
//                       </Typography> <span>{data.data.domain.map( ( _el ) => <Tag color='cyan'>{_el}</Tag> )} </span>
//                 </Stack>
//                 <Typography sx={{ marginTop: '1rem' }} variant='h6'>
//                   Posted On
//                 </Typography>
//                     <Typography variant='p'>{data.data.date}</Typography>
               
//               </Col>
//               <Col span={12}>
              
//               </Col>
//             </Row>
//             <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
//               <h3>Job Description</h3>
//             </Box>
//             <Row>
//                   {data.data.description}
//             </Row>
            
           
           
//             <Divider />
//             <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
//               <h3>Job Instructions</h3>
//             </Box>
//             <Row style={{ marginTop: '3rem' }}>
//                   {data.data.instructions}
//             </Row>
           
//             <Divider/>
//             <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
//               <h3>Job Requirements</h3>
//             </Box>
//             <Row style={{ marginTop: '2rem' }}>
//                   {data.data.requirement}
//             </Row>
            
           
//                 <Divider/>

//            <div style={{marginTop:"2rem"}}>
//             <Space>
//             <Button onClick={showModal}>Send Proposal</Button>
//                     <Button onClick={() => handleWishList( jobId )}>Add to wishlist</Button>
//             </Space>
//            </div>
        
        
//           </div>
//         </Card>
//       </div>

//         </div>
//         </div>
//     );
// }




// import React, { useState, useEffect } from 'react';
// import { UploadOutlined } from '@ant-design/icons';
// import { Card, Row, Col, Divider, Modal, Tag, Button, Space, Input, Form, Upload } from 'antd';
// import { Stack, Typography, Box } from '@mui/material';
// import { useParams } from 'react-router-dom';
// import { useAddJobToWishListMutation, useGetJobQuery, useSubmitApplicationMutation } from '../../services/nodeAPI';
// import Spinner from '../Spinner';
// import { useSelector } from 'react-redux';

// const { TextArea } = Input;

// const useFetchJobData = (jobId) => {
//   const { data, error, isLoading } = useGetJobQuery({ jobId });

//   useEffect(() => {
//     // Fetch job data using useGetJobQuery
//   }, [jobId]);

//   return { data, error, isLoading };
// };

// export const UserViewJob = () => {
//   let { jobId } = useParams();
//   const [addJobToWishList] = useAddJobToWishListMutation();
//   const [submitApplication] = useSubmitApplicationMutation();
//   const [isModalOpen, setIsModalOpen] = useState(true);
//   const { user } = useSelector((state) => state.user);

//   const handleWishList = async (id) => {
//     const res = await addJobToWishList({ userId: user._id, data: { jobid: id } });
//     console.log('Res', { userId: user.id, data: { jobid: id } }, res);
//   };

//   const onFinish = async (values) => {
//     console.log('Success:', values);
//     let data = { ...values };
//     console.log(data);
//     data.applicant = user._id;
//     data.date = `${new Date()}`;
//     data.job = jobId;
//     const res = await submitApplication(data);
//     console.log('##RES:', res);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log('Failed:', errorInfo);
//   };

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   const props = {
//     name: 'file',
//     headers: {
//       authorization: 'authorization-text',
//     },
//     onChange(info) {
//       //   if (info.file.status !== 'uploading') {
//       //     console.log(info.file, info.fileList);
//       //   }
//       //   if (info.file.status === 'done') {
//       //     message.success(`${info.file.name} file uploaded successfully`);
//       //   } else if (info.file.status === 'error') {
//       //     message.error(`${info.file.name} file upload failed.`);
//       //   }
//     },
//   };

//   const { data, error, isLoading } = useFetchJobData(jobId);

//   if (isLoading && !data) {
//     return <Spinner />;
//   }

//   return (
//     <div>
//       {console.log('Data----->:', data)}
//       <div>
//         <Modal title="Submit Proposal" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
//           <Form
//             name="basic"
//             layout="vertical"
//             initialValues={{
//               remember: true,
//             }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//             autoComplete="off"
//           >
//             <Form.Item
//               label="Cover Letter"
//               name="coverLetter"
//               rules={[
//                 {
//                   required: true,
//                   message: 'Please input cover letter!',
//                 },
//               ]}
//             >
//               <TextArea rows={5} />
//             </Form.Item>
//             <Form.Item>
//               <Button type="primary" htmlType="submit">
//                 Submit
//               </Button>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//       {/* <div>
//         <div style={{ paddingInline: '2rem' }}>
//           <Card style={{ padding: '30px 30px' }}>
//             <div style={{ paddingInline: '5rem', paddingBlock: '3rem' }}>
//               <Row>
//                 <Col span={16}>
//                   <Typography variant="h2">{data.data.title}</Typography>

//                   <Stack direction="row" alignItems="center" spacing={1}>
//                     <small>by</small>
//                     <Typography style={{ fontSize: '1.4rem', opacity: 0.8 }} noWrap>
//                       {data.data.employer.name}
//                     </Typography>
//                     <span>{data.data.domain.map((_el) => <Tag color="cyan">{_el}</Tag>)}</span>
//                   </Stack>
//                   <Typography sx={{ marginTop: '1rem' }} variant="h6">
//                     Posted On
//                   </Typography>
//                   <Typography variant="p">{data.data.date}</Typography>
//                 </Col>
//                 <Col span={12}></Col>
//               </Row>
//               <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
//                 <h3>Job Description</h3>
//               </Box>
//               <Row>{data.data.description}</Row>

//               <Divider />
//               <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
//                 <h3>Job Instructions</h3>
//               </Box>
//               <Row style={{ marginTop: '3rem' }}>{data.data.instructions}</Row>

//               <Divider />
//               <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
//                 <h3>Job Requirements</h3>
//               </Box>
//               <Row style={{ marginTop: '2rem' }}>{data.data.requirement}</Row>

//               <Divider />

//               <div style={{ marginTop: '2rem' }}>
//                 <Space>
//                   <Button onClick={showModal}>Send Proposal</Button>
//                   <Button onClick={() => handleWishList(jobId)}>Add to wishlist</Button>
//                 </Space>
//               </div>
//             </div>
//           </Card>
//         </div>
//       </div> */}
//     </div>
//   );
// };









import React, { useState, useEffect } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Card, Row, Col, Divider, Modal, Tag, Button, Space, Input, Form, Upload, message } from 'antd';
import { Stack, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAddJobToWishListMutation, useGetJobQuery, useSubmitApplicationMutation } from '../../services/nodeAPI';
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';

const { TextArea } = Input;

const useFetchJobData = (jobId) => {
  const { data, error, isLoading } = useGetJobQuery({ jobId });

  useEffect(() => {
    // Fetch job data using useGetJobQuery
  }, [jobId]);

  return { data, error, isLoading };
};

export const UserViewJob = () => {
  let { jobId } = useParams();
  const [addJobToWishList] = useAddJobToWishListMutation();
  const [submitApplication] = useSubmitApplicationMutation();
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useSelector((state) => state.user);

  const handleWishList = async (id) => {
    const res = await addJobToWishList({ userId: user._id, data: { jobid: id } });
    console.log('Res', { userId: user.id, data: { jobid: id } }, res);
  };

  const onFinish = async (values) => {
    console.log('Success:', values);
    let data = { ...values };
    console.log(data);
    data.applicant = user._id;
    data.date = `${new Date()}`;
    data.job = jobId;
    const res = await submitApplication(data);
    console.log('##RES:', res);
    setIsSubmitted(true);
    message.success('Cover letter submitted successfully!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const props = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      //   if (info.file.status !== 'uploading') {
      //     console.log(info.file, info.fileList);
      //   }
      //   if (info.file.status === 'done') {
      //     message.success(`${info.file.name} file uploaded successfully`);
      //   } else if (info.file.status === 'error') {
      //     message.error(`${info.file.name} file upload failed.`);
      //   }
    },
  };

  const { data, error, isLoading } = useFetchJobData(jobId);

  if (isLoading && !data) {
    return <Spinner />;
  }
 

  // if (data) {
  //   console.log("Value")
  //   return <div>Error: Failed to fetch job data.</div>;
  // }
  return (
    <div>
      {console.log('Data----->:', data)}
      <div>
        <Modal title="Submit Proposal" footer={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <Form
            name="basic"
            layout="vertical"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Cover Letter"
              name="coverLetter"
              rules={[
                {
                  required: true,
                  message: 'Please input cover letter!',
                },
              ]}
            >
              <TextArea rows={5} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
      <div>
        <div style={{ paddingInline: '2rem' }}>
          <Card style={{ padding: '30px 30px' }}>
            <div style={{ paddingInline: '5rem', paddingBlock: '3rem' }}>
              <Row>
                <Col span={16}>
                  <Typography variant="h2">{data.data.title}</Typography>

                  <Stack direction="row" alignItems="center" spacing={1}>
                    <small>by</small>
                    {/* <Typography style={{ fontSize: '1.4rem', opacity: 0.8 }} noWrap>
                      {data.data.employer.name}
                    </Typography> */}
                    <span>{data.data.domain.map((_el) => <Tag color="cyan">{_el}</Tag>)}</span>
                  </Stack>
                  <Typography sx={{ marginTop: '1rem' }} variant="h6">
                    Posted On
                  </Typography>
                  <Typography variant="p">{data.data.date}</Typography>
                </Col>
                <Col span={12}></Col>
              </Row>
              <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
                <h3>Job Description</h3>
              </Box>
              <Row>{data.data.description}</Row>

              <Divider />
              <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
                <h3>Job Instructions</h3>
              </Box>
              <Row style={{ marginTop: '3rem' }}>{data.data.instructions}</Row>

              <Divider />
              <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
                <h3>Job Requirements</h3>
              </Box>
              <Row style={{ marginTop: '2rem' }}>{data.data.requirement}</Row>

              <Divider />

              <div style={{ marginTop: '2rem' }}>
                <Space>
                  {isSubmitted ? (
                    <p>Cover letter submitted successfully! Next step...</p>
                  ) : (
                    <>
                      <Button onClick={showModal}>Send Proposal</Button>
                      <Button onClick={() => handleWishList(jobId)}>Add to wishlist</Button>
                    </>
                  )}
                </Space>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
