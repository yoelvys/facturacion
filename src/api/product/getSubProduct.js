import { getFetchGeneric } from "../getFetchGeneric";

export const getSubProduct = async (productName) => getFetchGeneric(`sub-product/${productName}`);