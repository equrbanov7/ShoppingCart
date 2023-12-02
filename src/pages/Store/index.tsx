import "./index.scss"
import storeitems from "../../data/items.json"
import {Row, Col} from "react-bootstrap"
import StoreItem from "./StoreItem"

const Store = () => {
  return (
    <>
      <h1>Store</h1>
      <Row md={2} xs={1} lg={3} className="g-3">
        {storeitems.map((item)=>(
          <Col key={item.id}>
          {/* {JSON.stringify(item)} */}
          <StoreItem {...item} />
          </Col>

        ))}
      </Row>
    </>
  )
}

export default Store