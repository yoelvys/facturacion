import { useState } from "react";
import { Button, Form, Label, Input, Row, Col } from "reactstrap";
import { saveInvoice } from "../../../api";
import { CustomModal } from "./CustomModal";
import "./NewStyles.css";

export const New = () => {
  const [details, setDetails] = useState([]);

  const defaultInvoice = {
    number: "",
    invoiceDate: new Date(),
    clientDNI: "",
    clientName: "",
  };

  const [invoice, setInvoice] = useState(defaultInvoice);

  const changeInvoice = (e) => {
    const { name, value } = e.target;
    setInvoice((prevState) => ({ ...prevState, [name]: value }));
  };

  const defaultTotals = {
    subTotal: 0.0,
    iva12: 0.0,
    total: 0.0,
  };
  const [totals, setTotals] = useState(defaultTotals);

  const [isOpen, setIsOpen] = useState(false);

  const newDatil = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const addDetail = (detail) => {
    let subTotal = 0.0;
    details.forEach((d) => (subTotal += d.subTotal));

    subTotal += detail.subTotal;
    const iva12 = subTotal * 0.12;
    const total = subTotal + iva12;

    setTotals({
      subTotal,
      iva12,
      total,
    });
    setIsOpen(!isOpen);
    setDetails((det) => [...det, detail]);
  };

  const save = async(e) => {
    e.preventDefault();
    const detailsToSave = details.map((d) => ({
      productId: d.productId,
      amount: parseFloat(d.amount),
    }));

    const invoiceToSave = {
      number: invoice.number,
      invoiceDate: invoice.invoiceDate,
      clientRequest: {
        name: invoice.clientName,
        dni: invoice.clientDNI,
      },
      details: detailsToSave,
    };

    const newInvoice = await saveInvoice(invoiceToSave);
    console.log(newInvoice);

  };

  return (
    <Form className="invoice-form">
      <Row className="row data">
        <Col md={4}>
          <Label for="number">Number</Label>
          <Input
            type="text"
            name="number"
            id="number"
            placeholder="Invoice Number"
            value={invoice.number}
            onChange={changeInvoice}
          />
        </Col>
        <Col md={2}>
          <Label for="invoiceDate">Date</Label>
          <Input
            type="date"
            name="invoiceDate"
            id="invoiceDate"
            value={invoice.invoiceDate}
            onChange={changeInvoice}
          />
        </Col>
      </Row>

      <Row className="row data">
        <Col md={4}>
          <Label for="clientDNI">Client DNI</Label>
          <Input
            type="text"
            name="clientDNI"
            id="clientDNI"
            placeholder="Search client by dni"
            value={invoice.clientDNI}
            onChange={changeInvoice}
          />
        </Col>
        <Col md={6}>
          <Label for="clientName">Client Name</Label>
          <Input
            type="text"
            name="clientName"
            id="clientName"
            placeholder="Client Name"
            value={invoice.clientName}
            onChange={changeInvoice}
          />
        </Col>
      </Row>
      <Row className="row">
        <Col md={1} className="offset-md-11">
          <Button color="primary" className="new-detail" onClick={newDatil}>
            +
          </Button>
        </Col>
      </Row>
      <Row className="row">
        <table className="table product-table">
          <thead>
            <tr>
              <th scope="col">Amount</th>
              <th scope="col">Product</th>
              <th scope="col">SubProduct</th>
              <th scope="col">Unit Price</th>
              <th scope="col">SubTotal</th>
            </tr>
          </thead>

          <tbody>
            {details.map((d, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{d.amount}</th>
                  <td>{d.productName}</td>
                  <td>{d.subProductName}</td>
                  <td>{d.unitPrice}</td>
                  <td>{d.subTotal}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Row>
      <Row className="row">
        <Col md={4} className="offset-md-3">
          <Button color="success" className="save-button" onClick={save}>
            Save
          </Button>
        </Col>
        <Col md={4} className="offset-md-1">
          <Row>
            <Col md={8} className="text-right">
              <strong>Subtotal:</strong>
            </Col>
            <Col md={2} className="text-left">
              {totals.subTotal}
            </Col>
          </Row>
          <Row>
            <Col md={8} className="text-right">
              <strong>Iva 12%:</strong>
            </Col>
            <Col md={2} className="text-left">
              {totals.iva12}
            </Col>
          </Row>
          <Row>
            <Col md={8} className="text-right total">
              <strong>Total:</strong>
            </Col>
            <Col md={2} className="text-left total">
              {totals.total}
            </Col>
          </Row>
        </Col>
      </Row>
      <CustomModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        addDetail={addDetail}
      />
    </Form>
  );
};
