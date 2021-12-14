import { getFetchGeneric } from "../getFetchGeneric";

export const getById = async (id) => getFetchGeneric(`invoice/${id}`);