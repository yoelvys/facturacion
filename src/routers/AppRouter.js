import { Routes, Route, BrowserRouter} from "react-router-dom";
import { NavBar } from "../components/layouts";
import {InvoiceView, ClientView, ProductView, InvoiceNewView, InvoiceShowView} from '../components/views'

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<InvoiceView />} />
                    <Route path="/invoices" element={<InvoiceView />} />
                    <Route path="/invoices/new" element={<InvoiceNewView />} />
                    <Route path="/invoices/:id" element={<InvoiceShowView />} />
                    <Route path="/products" element={<ProductView />} />
                    <Route path="/clients" element={<ClientView />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}
