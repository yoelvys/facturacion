import { getFetchGeneric } from "../getFetchGeneric";

export const getByDni = async (dni) =>
  getFetchGeneric(`client/${encodeURI(dni)}`);
