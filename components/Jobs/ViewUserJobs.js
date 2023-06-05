import React, { useEffect, useState } from 'react';
import { Card, Col, Input, Row, Tag, Button } from 'antd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PageHeader } from '../Generic/PageHeader';
import { useNavigate } from 'react-router-dom';
import { useAddJobToWishListMutation, useGetAllJobsQuery } from '../../services/nodeAPI';
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';

const { Search }=Input;

export const ViewUserJobs=() => {
    const [showNoResultsModal, setShowNoResultsModal] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const navigate=useNavigate()
    const [ addJobToWishList ]=useAddJobToWishListMutation();
    // const onSearch=( value ) => {
    //     const d=DATA.filter( DATA => DATA.title.includes( value.toLowerCase() )        )
    //     setDATA( d )
    //     console.log( value.toLowerCase(), d, DATA )
    // };
  
      
    const { user }=useSelector( state => state.user );

    const handleWishList=async ( id ) => {
        const res=await addJobToWishList( { userId: user._id, data: { jobid: id } } );
        console.log( 'Res', { userId: user.id, data: { jobid: id } }, res );
        setIsModalVisible(true);

    }
    const [ DATA, setDATA ]=useState(  );

    const { data, error, isLoading }=useGetAllJobsQuery();

    useEffect( () => {

        if ( !isLoading&&data) {
            console.log( "****", data )
          setDATA( data.data );
          console.log( "Bajwaaaaa : ", data.data )
       //   console.log( "ASIM MUNIR : ", DATA )

        }

    }, [ isLoading ] , data)
    const onSearch = (value) => {
        const filteredData = data.data.filter((item) =>
          item.title.toLowerCase().includes(value.toLowerCase())
        );
        setDATA(filteredData);
        console.log(value.toLowerCase(), filteredData, data.data);
        if (filteredData.length === 0) {
            // Show the modal when no results are available
            setShowNoResultsModal(true);
          } else {
            // Hide the modal if it was previously shown
            setShowNoResultsModal(false);
          }
      };
  //  console.log( "ASIM MUNIR 2: ", DATA )
  const handleModalOk = () => {
    // Handle modal OK button click, if needed
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    // Handle modal cancel/close button click, if needed
    setIsModalVisible(false);
  };
    if ( isLoading&&!data&&!DATA )
        return <Spinner />
    return (
        
        // <div>
        //     {console.log( 'DATA:', data )}
        //     <PageHeader heading="Jobs" subHeading="You can find and apply for all jobs you like" />
        //     <div style={{ paddingRight: "1rem" }}>
        //         <Card style={{ paddingInline: "2rem", paddingBlock: '2rem' }}>
        //             <div style={{ paddingBottom: '2rem' }}>
        //                 <Search placeholder="input search text" size='large' onSearch={onSearch} enterButton />
        //             </div>
        //             <h2>Jobs you might like</h2>
        //             <div className='mt-10'>
        //                 {DATA&&DATA.map( ( el, i ) => {
        //                                 {console.log( 'GENERAL BAJWA :', DATA )}

        //                     return ( <Card key={i} className='mt-3'>
        //                         <Row>
        //                             <Col span={22}>

        //                                 {/* <h3 style={{ cursor: 'pointer' }} onClick={() => { navigate( `/dashboard/user/jobs/view/${el.id}` ) }}>{el.title}</h3> */}
        //                             </Col>
        //                             {/* <Col span={2}><Button onClick={() => handleWishList( el.id )}>Add to wishlist</Button></Col> */}
        //                         </Row>
        //                         {/* <span>{el.employer.name}</span> - <small>{el.date}</small> */}
        //                         <div style={{ paddingBlock: '1rem' }}>
        //                             <div style={{ fontSize: "1.3rem", opacity: 0.9 }}>
        //                                 {/* {el.description} */}
        //                             </div>
        //                             <div style={{ marginTop: "1.5rem" }}>
        //                                 <Row>
        //                                     <Col span={20}>
        //                                         {/* {el.domain.map( ( _el ) => <Tag>{_el}</Tag> )} */}
        //                                     </Col>
        //                                     <Col span={4}>
        //                                         {/* <span style={{ marginLeft: '7rem' }}><LocationOnIcon /> {el.country}</span> */}
        //                                     </Col>
        //                                 </Row>
        //                             </div>
        //                         </div>
        //                     </Card> )
        //                 } )}
        //             </div>

        //         </Card>
        //     </div>
        // </div>
        <div>
        <Modal
        visible={showNoResultsModal}
        onCancel={() => setShowNoResultsModal(false)}
        title="No Results Available"
        footer={null}
      >
        <p>Sorry, no results were found.</p>
      </Modal>
      <Modal
        title="Item Added to Wishlist"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <p>The Job has been added to your wishlist.</p>
        {/* Add any additional content or customization to the modal */}
      </Modal>
  <PageHeader heading="Jobs" subHeading="You can find and apply for all jobs you like" />
  <div style={{ paddingRight: "1rem" }}>
    <Card style={{ paddingInline: "2rem", paddingBlock: '2rem' }}>
      <div style={{ paddingBottom: '2rem' }}>
        <Search placeholder="input search text" size='large' onSearch={onSearch} enterButton />
      </div>
      <h2>Jobs you might like</h2>
      <div className='mt-10'>
        {DATA && DATA.map((job, index) => (
            console.log(job.title),
          <Card key={index} className='mt-3'>
            <Row>
              <Col span={22}>
                <h3 style={{ cursor: 'pointer' }} 
                onClick={() => {
                    if (job) {
                      navigate(`/dashboard/user/jobs/view/${job._id}`);
                    } else {
                      // Handle the case where the job object is null
                      console.error('Job object is null');
                    }
                  }}>
                  {job ? job.title : 'Loading...'}
                </h3>
              </Col>
              <Col span={2}>
                <Button onClick={() => handleWishList(job._id)}>
                  Add to wishlist
                  
                </Button>
                
              </Col>
            </Row>
            <span>{job.employer ? job.employer.name : 'Unknown Employer'}</span> - <small>{job.date}</small>
            <div style={{ paddingBlock: '1rem' }}>
              <div style={{ fontSize: "1.3rem", opacity: 0.9 }}>
                {job.description}
              </div>
              <div style={{ marginTop: "1.5rem" }}>
                <Row>
                  <Col span={20}>
                    {job.domain.map((_el, index) => (
                      <Tag key={index}>{_el}</Tag>
                    ))}
                  </Col>
                  <Col span={4}>
                    <span style={{ marginLeft: '7rem' }}><LocationOnIcon /> {job.country}</span>
                  </Col>
                </Row>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  </div>
</div>

    );
}

// import React, { useEffect, useState } from 'react';
// import { Card, Col, Input, Row, Tag, Button } from 'antd';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { PageHeader } from '../Generic/PageHeader';
// import { useNavigate } from 'react-router-dom';
// import { useAddJobToWishListMutation, useGetAllJobsQuery } from '../../services/nodeAPI';
// import Spinner from '../Spinner';
// import { useSelector } from 'react-redux';
// const { Search } = Input;

// export const ViewUserJobs = () => {
//   const navigate = useNavigate();
//   const [addJobToWishList] = useAddJobToWishListMutation();
//   const [DATA, setDATA] = useState(null);

//   const { user } = useSelector((state) => state.user);
//   const handleWishList = async (id) => {
//     const res = await addJobToWishList({ userId: user._id, data: { jobid: id } });
//     console.log('Res', { userId: user.id, data: { jobid: id } }, res);
//   };

//   const { data, error, isLoading } = useGetAllJobsQuery();

//   const onSearch = (value) => {
//     const filteredData = data.data.filter((el) => el.title.includes(value.toLowerCase()));
//     setDATA(filteredData);
//     console.log(value.toLowerCase(), filteredData, data.data);
//   };

//   useEffect(() => {
//     if (!isLoading && data && data.data) {
//       console.log('****', data);
//       setDATA(data.data);
//     }
//   }, [isLoading, data]);

//   if (isLoading && !data && !DATA) {
//     return <Spinner />;
//   }

//   return (
//     <div>
//       <PageHeader heading="Jobs" subHeading="You can find and apply for all jobs you like" />
//       <div style={{ paddingRight: '1rem' }}>
//         <Card style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
//           <div style={{ paddingBottom: '2rem' }}>
//             <Search placeholder="input search text" size="large" onSearch={onSearch} enterButton />
//           </div>
//           <h2>Jobs you might like</h2>
//           <div className="mt-10">
//             {DATA &&
//               DATA.map((el, i) => (
//                 <Card key={i} className="mt-3">
//                   <Row>
//                     <Col span={22}>
//                       <h3
//                         style={{ cursor: 'pointer' }}
//                         onClick={() => {
//                           navigate(`/dashboard/user/jobs/view/${el.id}`);
//                         }}
//                       >
//                         {el.title}
//                       </h3>
//                     </Col>
//                     <Col span={2}>
//                       <Button onClick={() => handleWishList(el.id)}>Add to wishlist</Button>
//                     </Col>
//                   </Row>
//                   <span>{el.employer.name}</span> - <small>{el.date}</small>
//                   <div style={{ paddingBlock: '1rem' }}>
//                     <div style={{ fontSize: '1.3rem', opacity: 0.9 }}>{el.description}</div>
//                     <div style={{ marginTop: '1.5rem' }}>
//                       <Row>
//                         <Col span={20}>{el.domain.map((_el) => <Tag>{_el}</Tag>)}</Col>
//                         <Col span={4}>
//                           <span style={{ marginLeft: '7rem' }}>
//                             <LocationOnIcon /> {el.country}
//                           </span>
//                         </Col>
//                       </Row>
//                     </div>
//                   </div>
//                 </Card>
//               ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };
