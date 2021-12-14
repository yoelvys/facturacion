import { getFetchGeneric } from "../getFetchGeneric";

export const getByNumber = async (number) => getFetchGeneric(`invoice/number/${number}`);