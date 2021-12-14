import { getDistincName } from "../../api";
import { useFetchGeneric} from '../useFetchGeneric'

export const useFetchDistinctName = () => useFetchGeneric(getDistincName)