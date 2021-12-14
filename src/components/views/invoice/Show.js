import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label, Row, Col, Form } from "reactstrap";
import { getInvoiceById } from "../../../api";
import { formatDate } from "../../../utils";
import "./NewStyles.css";

export const Show = () => {
  const param = useParams();
  const defaultInvoice = {
    clientResponseDto: {
      name: "",
      dni: "",
    },
    details: [],
    number: "",
    invoiceDate: new Date(),
    subTotal: 0.0,
    iva: 0.0,
    total: 0.0,
  };

  const [invoice, setInvoice] = useState(defaultInvoice);

  useEffect(() => {
    if (param.id) {
      getInvoiceById(param.id).then((invoice) => {
        if (invoice) {
          setInvoice(invoice);
        }
      });
    }
  }, [param.id]);

  return (
    <Form className="invoice-form">
      <Row className="row data">
        <Col md={4}>
          <Label for="number">Number</Label>
          <p>{invoice.number}</p>
        </Col>
        <Col md={2}>
          <Label for="invoiceDate">Date</Label>
          <p>{formatDate(invoice.invoiceDate, "yyyy-MM-DD")}</p>

        </Col>
      </Row>

      <Row className="row data">
        <Col md={4}>
          
          <Label for="clientDNI">Client DNI</Label>
          <p>{invoice.clientResponseDto.dni}</p>
          
        </Col>
        <Col md={6}>
          <Label for="clientName">Client Name</Label>
          <p>{invoice.clientResponseDto.name}</p>
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
            {invoice.details.map((d, index) => {
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
        <Col md={4} className="offset-md-3"></Col>
        <Col md={4} className="offset-md-1">
          <Row>
            <Col md={8} className="text-right">
              <strong>Subtotal:</strong>
            </Col>
            <Col md={2} className="text-left">
              {invoice.subTotal}
            </Col>
          </Row>
          <Row>
            <Col md={8} className="text-right">
              <strong>Iva 12%:</strong>
            </Col>
            <Col md={2} className="text-left">
              {invoice.iva}
            </Col>
          </Row>
          <Row>
            <Col md={8} className="text-right total">
              <strong>Total:</strong>
            </Col>
            <Col md={2} className="text-left total">
              {invoice.total}
            </Col>
          </Row>
        </Col>
      </Row>
    </Form>
  );
};
