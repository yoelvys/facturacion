import { useFetchAllInvoice } from "../../../hooks";
import { CustomSpinner } from "../../common/CustomSpinner";
import { formatDate } from "../../../utils";
import { DATE_FORMAT } from "../../../consts";
import { useNavigate, Link } from "react-router-dom";

export const List = () => {
  const { data: invoices, loading } = useFetchAllInvoice();

  const navigate = useNavigate();

  const handleInvoiceNew = () => {
    navigate("/invoices/new");
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleInvoiceNew}>
        New Invoice
      </button>

      {loading && <CustomSpinner />}

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
                    <button
                      className="btn btn-primary"
                    >
                      Detail
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
