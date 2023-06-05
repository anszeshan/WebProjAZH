import React, { useState, useEffect } from 'react';
import { Card, Col, Row, Tag, Button } from 'antd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { PageHeader } from '../Generic/PageHeader';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner';
import { useGetAllWishJobsQuery } from '../../services/nodeAPI';
import { useSelector } from 'react-redux';
import { useDeleteJobToWishListMutation, useGetAllJobsQuery } from '../../services/nodeAPI';
import { Input } from 'antd';
import { Modal } from 'antd';
const { Search }=Input;

export const WishlistJobs = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { data, error, isLoading } = useGetAllWishJobsQuery(user._id);
  const [wishlist, setWishlist] = useState([]);
  const [ DeleteJobToWishList ]=useDeleteJobToWishListMutation();
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    if (data) {
      setWishlist(data.data.wishlist);
    }
  }, [data]);
  //useDeleteJobToWishList
  const handleRemoveFromWishlist = async (id) => {
    // const res=await DeleteJobToWishList( { userId: user._id, data: { jobid: id } } );
      //  console.log( 'Res', { userId: user.id, data: { jobid: id } }, res );
      
        // Update the frontend state by removing the job from the wishlist
      const updatedWishlist = wishlist.filter((job) => job.id !== id);
      setWishlist(updatedWishlist);
      setIsModalVisible(true);

  };
  const handleModalOk = () => {
    // Handle modal OK button click, if needed
    setIsModalVisible(false);
  };

  const handleModalCancel = () => {
    // Handle modal cancel/close button click, if needed
    setIsModalVisible(false);
  };
  const onSearch = (value) => {
    const filteredData = data.data.wishlist.filter((item) =>
      item.title.toLowerCase().includes(value.toLowerCase())
    );
    setWishlist(filteredData);
    console.log(value.toLowerCase(), filteredData, data.data.wishlist);
    if (filteredData.length === 0) {
        // Show the modal when no results are available
        setShowNoResultsModal(true);
      } else {
        // Hide the modal if it was previously shown
        setShowNoResultsModal(false);
      }
  };
//   const handleRemoveFromWishlist = (jobId) => {
//     // Logic to remove the job from the wishlist using the jobId
//     const updatedWishlist = wishlist.filter((job) => job.id !== jobId);
//     setWishlist(updatedWishlist); // Update the wishlist state
//   };

  if (isLoading && !data) {
    return <Spinner />;
  }

  return (
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
        <p>The Job has been removed from your wishlist.</p>
        {/* Add any additional content or customization to the modal */}
      </Modal>
      <PageHeader heading="Jobs" subHeading="You can find and apply for all jobs you like" />
      <div style={{ paddingRight: '1rem' }}>
        <Card style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
          <h2>Jobs that you added to your wishlist</h2>
          <div className="mt-10">
          <Search placeholder="input search text" size='large' onSearch={onSearch} enterButton />
          <br/><br/>
            {wishlist.map((job, index) => (
                
              <Card key={index}>
                <Row>
                  <Col span={21}>
                    <h3 onClick={() => navigate(`/dashboard/user/jobs/view/${job.id}`)}>
                      {job.title}
                    </h3>
                  </Col>
                  
                  <Col span={3}>
                    <Button onClick={() => handleRemoveFromWishlist(job.id)}>
                      Remove from wishlist
                    </Button>
                  </Col>
                </Row>
                <span>{job.employer}</span> - <small>{job.date}</small>
                <div style={{ paddingBlock: '1rem' }}>
                  <div style={{ fontSize: '1.3rem', opacity: 0.9 }}>{job.description}</div>
                  <div style={{ marginTop: '1.5rem' }}>
                    <Row>
                      <Col span={20}>
                        {job.domain.map((_el, i) => (
                          <Tag key={i}>{_el}</Tag>
                        ))}
                      </Col>
                      <Col span={4}>
                        <span style={{ marginLeft: '7rem' }}>
                          <LocationOnIcon /> {job.country}
                        </span>
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
};





// import React, { useState, useEffect } from 'react';
// import { Card, Col, Row, Tag, Button } from 'antd';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import { PageHeader } from '../Generic/PageHeader';
// import { useNavigate } from 'react-router-dom';
// import Spinner from '../Spinner';
// import { useGetAllWishJobsQuery, useDeleteJobToWishListMutation } from '../../services/nodeAPI';
// import { useSelector } from 'react-redux';
// import axios from 'axios';

// export const WishlistJobs = () => {
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.user);
//   const { data, error, isLoading } = useGetAllWishJobsQuery(user._id);
//   const [wishlist, setWishlist] = useState([]);
//   const [deleteJobToWishList] = useDeleteJobToWishListMutation();

//   useEffect(() => {
//     if (data) {
//       setWishlist(data.data.wishlist);
//     }
//   }, [data]);

// //   const handleRemoveFromWishlist = async (jobId) => {
// //     try {
// //       // Send the DELETE request to the backend API
// //       const response = await axios.delete(`http://localhost:3001/api/v1/user/wishlist/delete/${jobId}`);
// //       console.log(response.data); // Optional: Log the response data
// //       const updatedWishlist = wishlist.filter((job) => job.id !== jobId);
// //       setWishlist(updatedWishlist);
// //     } catch (error) {
// //       console.log(error);
// //     }
// //   };
  
//   const handleRemoveFromWishlist = async (id) => {
//     try {
//       const res = await deleteJobToWishList({ userId: user._id, data: { jobid: id } });
//       console.log('Res', { userId: user.id, data: { jobid: id } }, res);

//       // Update the frontend state by removing the job from the wishlist
//       const updatedWishlist = wishlist.filter((job) => job.id !== id);
//       setWishlist(updatedWishlist);
//     } catch (error) {
//       console.error('Error removing job from wishlist:', error);
//     }
//   };

//   if (isLoading && !data) {
//     return <Spinner />;
//   }

//   return (
//     <div>
//       <PageHeader heading="Jobs" subHeading="You can find and apply for all jobs you like" />
//       <div style={{ paddingRight: '1rem' }}>
//         <Card style={{ paddingInline: '2rem', paddingBlock: '2rem' }}>
//           <h2>Jobs that you added to your wishlist</h2>
//           <div className="mt-10">
//             {wishlist.map((job, index) => (
//               <Card key={index}>
//                 <Row>
//                   <Col span={21}>
//                     <h3 onClick={() => navigate(`/dashboard/user/jobs/view/${job.id}`)}>
//                       {job.title}
//                     </h3>
//                   </Col>
//                   <Col span={3}>
//                     <Button onClick={() => handleRemoveFromWishlist(job.id)}>
//                       Remove from wishlist
//                     </Button>
//                   </Col>
//                 </Row>
//                 <span>{job.employer}</span> - <small>{job.date}</small>
//                 <div style={{ paddingBlock: '1rem' }}>
//                   <div style={{ fontSize: '1.3rem', opacity: 0.9 }}>{job.description}</div>
//                   <div style={{ marginTop: '1.5rem' }}>
//                     <Row>
//                       <Col span={20}>
//                         {job.domain.map((_el, i) => (
//                           <Tag key={i}>{_el}</Tag>
//                         ))}
//                       </Col>
//                       <Col span={4}>
//                         <span style={{ marginLeft: '7rem' }}>
//                           <LocationOnIcon /> {job.country}
//                         </span>
//                       </Col>
//                     </Row>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// };
