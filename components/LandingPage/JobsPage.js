import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col, Input, Row, Tag } from 'antd';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useGetAllJobsEmpQuery } from '../../services/nodeAPI';
const { Search } = Input;


const JobsPage = () => {
    const { user }=useSelector( state => state.user );
    const { data: jobsData, error, isLoading }=useGetAllJobsEmpQuery( user.id );
    console.log(jobsData);
    const onSearch = (value) => console.log(value);

    return (
        <div style={{marginTop:"8rem" , paddingInline:"2rem", paddingBlock:'2rem'}}>
            <Card style={{ paddingInline:"2rem", paddingBlock:'2rem'}}>
                <div style={{ paddingBottom:'2rem'}}>
            <Search placeholder="input search text" size='large' onSearch={onSearch} enterButton />
                </div>
                <h2>Jobs you might like</h2>
                <div className='mt-10'>
                <Card>
                    <h3>Full Stack Developer</h3>
                     <span>Research Engineer</span> - <small>Posted 6h ago</small>
                    <div style={{paddingBlock:'1rem'}}>
                        <div style={{fontSize:"1.3rem", opacity:0.9}}>
                        this cjakldjasld asdjslajasldjlasd dfljadljasldd fljdasljthis cjakldjasld asdjslajasldjlasd dfljadljasldd fljdasljthis cjakldjasld asdjslajasldjlasd dfljadljasldd fljdasljthis cjakldjasld asdjslajasldjlasd dfljadljasldd fljdasljthis cjakldjasld asdjslajasldjlasd dfljadljasldd fljdaslj
                        </div>
                    <div style={{marginTop:"1.5rem"}}>
                        <Row>
                            <Col span={20}>
                                <Tag>Web</Tag>
                                <Tag>App</Tag>
                                <Tag>ML</Tag>
                            </Col>
                            <Col span={4}>
                                <span style={{marginLeft:'7rem'}}><LocationOnIcon/> Pakistan</span>
                            </Col>
                        </Row>
                    </div>
                    </div>
                </Card>
                </div>

            </Card>
        </div>
    );
}

export default JobsPage;
