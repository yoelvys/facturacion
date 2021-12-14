import { getSubProductByProductName } from "../../api";
import { useFetchGeneric} from '../useFetchGeneric'

export const useFetchSubProduct = (productName) => useFetchGeneric(()=> getSubProductByProductName(productName))