import { formatDate } from "../../../utils";
import { DATE_FORMAT } from "../../../consts";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllInvoice, getByInvoiceNumber } from "../../../api";
import { Col, Row } from "reactstrap";

export const List = () => {
  const navigate = useNavigate();

  const handleInvoiceNew = () => {
    navigate("/invoices/new");
  };

  const [invoices, setInvoices] = useState([]);

  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let invoices;
    if (search.trim().length > 0) {
      invoices = await getByInvoiceNumber(search);
    } else {
      invoices = await getAllInvoice();
    }
    setInvoices(invoices);
  };

  useEffect(() => {
    getAllInvoice().then((inv) => setInvoices(inv));
  }, []);

  return (
    <Row style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={search}
              size="60"
              onChange={handleChange}
              placeholder="Find invoice by number"
            />
          </form>
        </Col>
        <Col md={2}>
          <button className="btn btn-primary" onClick={handleInvoiceNew}>
            New Invoice
          </button>
        </Col>
      </Row>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Number</th>
            <th scope="col">Client</th>
            <th scope="col">DNI</th>
            <th scope="col">Date</th>
            <th scope="col">SubTotal</th>
            <th scope="col">IVA</th>
            <th scope="col">Total</th>
            <th scope="col">Action</th>
          </tr>
        </thead>

        <tbody>
          {invoices.map((invoice) => {
            return (
              <tr key={invoice.id}>
                <th scope="row">{invoice.id}</th>
                <td>{invoice.number}</td>
                <td>{invoice.clientResponseDto.name}</td>
                <td>{invoice.clientResponseDto.dni}</td>
                <td>{formatDate(invoice.invoiceDate, DATE_FORMAT)}</td>
                <td>{invoice.subTotal}</td>
                <td>{invoice.iva}</td>
                <td>{invoice.total}</td>
                <td>
                  <Link to={`/invoices/${invoice.id}`}>
                    <button className="btn btn-primary">Detail</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Row>
  );
};
