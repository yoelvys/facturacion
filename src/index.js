import  ReactDOM from 'react-dom';
import {AppRouter} from './routers'
import 'bootstrap/dist/css/bootstrap.min.css';


const divRoot = document.querySelector('#root')

ReactDOM.render(<AppRouter /> , divRoot)