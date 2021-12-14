import {API_SERVER_URL} from '../consts'

export const  getFetchGeneric = async (endPointPath) => {

    const url = `${API_SERVER_URL}/${endPointPath}`;
    const resp = await fetch(url);

    return resp.json();

}