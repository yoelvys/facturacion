
import { getAllInvoice } from "../../api";
import { useFetchGeneric} from '../useFetchGeneric'

export const useFetchAll = () => useFetchGeneric(getAllInvoice)