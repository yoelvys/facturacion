import { getAllProduct } from "../../api";
import { useFetchGeneric} from '../useFetchGeneric'

export const useFetchAll = () => useFetchGeneric(getAllProduct)