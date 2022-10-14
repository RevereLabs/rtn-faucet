import {ethers} from "ethers";
import {useContext, useState} from "react";
import {Button, Form, Row,} from "react-bootstrap";
import {BlockchainContext, } from "./BlockchainContext";
import {CONTRACT_ABI, CONTRACT_ADDRESS} from "./constants";


async function useGetNecessities(getProvider) {
  const provider = await getProvider();
  const signer = provider?.getSigner();
  console.log(signer, "signer", provider, "provider");

  let RTNContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  );

  // return [provider, signer, RTNContract];
  return RTNContract;
}

async function GetRTN(getProvider, quantity, ) {
  const RTNContract = await useGetNecessities(getProvider);
  console.log(RTNContract);

  try {
    await RTNContract.mintToken(quantity);
  } catch (err) {
    console.log(err, "error");
    alert(err.message);
  }
}

export default function App() {
  const { getProvider, } = useContext(BlockchainContext);
  const [count, setCount] = useState("0");
  const handleSubmit = (e) => {
    e.preventDefault();
    // count to int
    const quantity = parseInt(count);
    if (quantity > 0)
      GetRTN(getProvider, quantity);

  }
  return (
    <div className="App my-auto">
      <Row>
        <Form onSubmit={handleSubmit}>
          <div className="col-7 mx-auto mt-5">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Count</Form.Label>
              <Form.Control type="number" placeholder="Enter RTN count" value={count} onChange={(e) => setCount(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
          </div>
        </Form>
      </Row>
    </div>
  );
}
