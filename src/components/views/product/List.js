import { useFetchAllProduct } from "../../../hooks";
import { CustomSpinner } from "../../common/CustomSpinner";

export const List = () => {
  const { data: products, loading } = useFetchAllProduct();

  console.log(products, loading);
  return ( 
    <div>
      {loading && <CustomSpinner />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Product</th>
            <th scope="col">SubProduct</th>
            <th scope="col">Unit Price</th>
          </tr>
        </thead>
        
        <tbody>
          {products.map(product => {
            return (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.name}</td>
                <td>{product.subProduct}</td>
                <td>{product.unitPrice}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
