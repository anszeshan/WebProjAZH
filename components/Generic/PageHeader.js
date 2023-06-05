import { Col, Row ,Button} from 'antd'
import { Link } from 'react-router-dom'

export const PageHeader = props => {
  const toLink = props.toLink || '/'
  return (
    <div style={{paddingTop:'1rem', paddingLeft:"", paddingBottom:"2rem"}}>
    <Row>
      <Col span={22}>
        <div style={{fontSize:'2rem'}}>{props.heading}</div>
        <small>{props.subHeading}</small>
      </Col>
      <Col span={2}>
        {
          props.btnText &&
          <Link to={toLink}>
          <Button>
            {props.btnText}
          </Button>
        </Link>
        }
      </Col>
    </Row>
    </div>
  )
}
