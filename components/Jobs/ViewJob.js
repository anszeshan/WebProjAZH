import React from 'react';
import { Card, Row, Col, Divider, Tag } from 'antd';
import { Stack, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useGetJobQuery } from '../../services/nodeAPI';
import Spinner from '../Spinner';
import { useSelector } from 'react-redux';

export const ViewJob=() => {

  let { jobId }=useParams();
  const { data, error, isLoading }=useGetJobQuery( { jobId } );
  const { user }=useSelector( state => state.user );

  if ( isLoading&&!data )
    return <Spinner />
  return (
    <div>
      {console.log( 'DATA:', data )}
      <div style={{ paddingInline: '2rem' }}>
        <Card style={{ padding: '30px 30px' }}>
          <div style={{ paddingInline: '5rem', paddingBlock: '3rem' }}>
            <Row>
              <Col span={16}>
                <Typography variant='h2'>{data.data.title}</Typography>

                <Stack direction='row' alignItems='center' spacing={1}>
                  <small>by</small>
                  <Typography style={{ fontSize: '1.4rem', opacity: 0.8 }} noWrap>
                    {user.name}
                  </Typography> <span> <Tag color='cyan'>Research Engineer</Tag></span>
                </Stack>
                <Typography sx={{ marginTop: '1rem' }} variant='h6'>
                  Created At
                </Typography>
                <Typography variant='p'>{data.data.date? data.data.date:'Jan 2nd'}</Typography>

              </Col>
              <Col span={12}>

              </Col>
            </Row>
            <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
              <h3>Description:</h3>
            </Box>
            <Row>
              {data.data.description? data.data.description:"DESCRIPTION"}
            </Row>



            <Divider />
            <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
              <h3>Job Instructions</h3>
            </Box>
            <Row style={{ marginTop: '3rem' }}>
              {data.data.instructions}
            </Row>

            <Divider />
            <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
              <h3>Job Requirements</h3>
            </Box>
            <Row style={{ marginTop: '2rem' }}>
              {data.data.requirements}
            </Row>


            <Divider />
            <Box sx={{ marginTop: '4rem', marginBottom: '2rem' }}>
              <h3>Research Interests</h3>
            </Box>
            <Row style={{ marginTop: '2rem' }}>
              {data.data.domain.toString()}
            </Row>



          </div>
        </Card>
      </div>

    </div>
  );
}

