
import { getAllClient } from "../../api";
import { useFetchGeneric} from '../useFetchGeneric'

export const useFetchAll = () => useFetchGeneric(getAllClient)