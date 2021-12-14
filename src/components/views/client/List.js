import { useFetchAllClient } from "../../../hooks";
import { CustomSpinner } from "../../common/CustomSpinner";

export const List = () => {
  const { data: clients, loading } = useFetchAllClient();

  console.log(clients, loading);
  return ( 
    <div>
      {loading && <CustomSpinner />}
      <table className="table">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">DNI</th>
            <th scope="col">Full Name</th>
          </tr>
        </thead>
        
        <tbody>
          {clients.map(client => {
            return (
              <tr key={client.id}>
                <th scope="row">{client.id}</th>
                <td>{client.dni}</td>
                <td>{client.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
