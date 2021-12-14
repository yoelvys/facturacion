import { Link, NavLink } from 'react-router-dom'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Facturacion
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink 
                        className={ ({isActive}) => "nav-item nav-link" + (isActive ? " active" : "" ) }
                        to="/invoices"
                    >
                        Invoices
                    </NavLink>
                    <NavLink 
                        className={ ({isActive}) => "nav-item nav-link" + (isActive ? " active" : "" ) }
                        to="/products"
                    >
                        Products
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => "nav-item nav-link" + (isActive ? " active" : "" ) }
                        to="/clients"
                    >
                        Clients
                    </NavLink>
                </div>
            </div>
        </nav>
    )
}