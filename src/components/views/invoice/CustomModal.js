import { useState } from "react";
import { useFetchDistinctProductName } from "../../../hooks";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Input,
} from "reactstrap";
import "./CustomModalStyles.css";
import { getSubProductByProductName } from "../../../api";

export const CustomModal = ({ isOpen, setIsOpen, newDetail, addDetail }) => {
  const defaultDetail = {
    productId: null,
    productName: "",
    subProductName: "",
    amount: 1,
    unitPrice: 0.0,
    subTotal: 0.0,
  };

  if (newDetail == null) {
    newDetail = defaultDetail;
  }

  const [detail, setDetail] = useState(newDetail);
  const [subProduct, setSubProduct] = useState([]);

  const addDetailAndClear = () => {
    const detailToAdd = detail;
    setDetail(defaultDetail);
    addDetail(detailToAdd);
  };
  const changeDetail = (e) => {
    const { name, value } = e.target;
    setDetail((prevState) => ({ ...prevState, [name]: value }));
  };

  const { data: productNames } = useFetchDistinctProductName();

  const selectProduct = async (e) => {
    changeDetail(e);
    const { value } = e.target;
    let subProduct = [];
    if (value !== "") {
      subProduct = await getSubProductByProductName(value);
    }
    setSubProduct(subProduct);
  };

  const changeAmount = (e)=> {
    const { value } = e.target;
    const subTotal = detail.unitPrice * value;
    detail.subTotal = subTotal;
    detail.amount = value;
    setDetail({ ...detail });
  }
  const selectSubProduct = async (e) => {
    const { value } = e.target;
    let subTotal = 0.0;
    let subProductName = "";
    let productId = null;
    let unitPrice = 0.0;
    if (value !== "") {
      const product = subProduct.filter((p) => p.id === parseInt(value))[0];
      if (product) {
        unitPrice = product.unitPrice;
        subTotal = unitPrice * detail.amount;
        subProductName = product.subProduct;
        productId = product.id;
      }
    }

    detail.subTotal = subTotal;
    detail.productId = productId;
    detail.subProductName = subProductName;
    detail.unitPrice = unitPrice;
    setDetail({ ...detail });
  };

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      className="modal-dialog-centered  modal-lg"
    >
      <ModalHeader toggle={toggle}>Invoice Detail</ModalHeader>
      <ModalBody>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">Amount</th>
              <th scope="col">Product</th>
              <th scope="col">SubProduct</th>
              <th scope="col">Unit Price</th>
              <th scope="col">SubTotal</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td className="td-amount">
                <Input
                  type="text"
                  name="amount"
                  id="amount"
                  value={detail.amount}
                  onChange={changeAmount}
                />
              </td>
              <td>
                <Input
                  type="select"
                  name="productName"
                  id="productName"
                  value={detail.productName}
                  onChange={selectProduct}
                >
                  <option value="">Select Product</option>
                  {productNames.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </Input>
              </td>
              <td>
                <Input
                  type="select"
                  name="subProductName"
                  id="subProductName"
                  value={detail.productId ? detail.productId : ""}
                  onChange={selectSubProduct}
                >
                  <option value="">Select SubProduct</option>
                  {subProduct.map((sp) => (
                    <option key={sp.id} value={sp.id}>
                      {sp.subProduct}
                    </option>
                  ))}
                </Input>
              </td>
              <td className="text-center">{detail.unitPrice}</td>
              <td className="text-center">{detail.subTotal}</td>
            </tr>
          </tbody>
        </table>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={toggle}>
          Cancel
        </Button>
        <Button color="success" onClick={addDetailAndClear}>
          Add Detail
        </Button>
      </ModalFooter>
    </Modal>
  );
};
