import React, { useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const Menu = ({ history }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if (!userInfo) {
            redirectTo();
        }
    }, [dispatch, userInfo]);

    const redirectTo = () => {
        return (
            <Redirect
                to={{
                    pathname: "/login",
                    state: { referrer: "/" },
                }}
            />
        );
    };

    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* Brand Logo */}
            <Link to={"/dashboard"} className="brand-link">
                <img
                    src="/guacari.png"
                    alt="Guacarí Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: ".9" }}
                />
                <span className="brand-text font-weight-light">GUACARI</span>
            </Link>
            {/* Sidebar */}
            <div className="sidebar">
                {/* Sidebar user panel (optional) */}
                <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img
                            src={userInfo ? userInfo.image : "/avatar.png"}
                            className="img-circle elevation-2"
                            alt="User"
                        />
                    </div>
                    <div className="info">
                        <Link to="/profile" className="d-block">
                            {userInfo ? userInfo.name : ""}
                        </Link>
                    </div>
                </div>
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul
                        className="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false"
                    >
                        <li className="nav-item">
                            <Link to="/dashboard" className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt" />{" "}
                                <p> Panel General</p>
                            </Link>
                        </li>

                        {!userInfo ? (
                            ""
                        ) : userInfo.isAdmin === true ? (
                            <>
                                <li className="nav-header">ADMINISTRADOR</li>
                                <li className="nav-item">
                                    <Link to="/user" className="nav-link">
                                        <i className="nav-icon fas fa-users" />{" "}
                                        <p> Usuarios</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            ""
                        )}

                        <li className="nav-header">RESTOBAR</li>
                        <li className="nav-item">
                            <Link to="/active" className="nav-link">
                                <i className="nav-icon fas fa-bell" />{" "}
                                <p> Órdenes Activas</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/delivery" className="nav-link">
                                <i className="nav-icon fas fa-truck" />{" "}
                                <p> Delivery</p>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/order" className="nav-link">
                                <i className="nav-icon far fa-clipboard" />{" "}
                                <p> Historial</p>
                            </Link>
                        </li>

                        <li className="nav-header">GESTIÓN</li>

                        <li className="nav-item">
                            <Link to="/category" className="nav-link">
                                <i className="nav-icon fas fa-list-alt" />{" "}
                                <p> Categorías</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/product" className="nav-link">
                                <i className="nav-icon fas fa-hamburger" />{" "}
                                <p> Productos</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/ingredient" className="nav-link">
                            <i className="nav-icon fas fa-seedling" />{" "}
                                <p> Ingredientes</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/client" className="nav-link">
                                <i className="nav-icon fas fa-user" />{" "}
                                <p> Clientes</p>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/table" className="nav-link">
                                <i className="nav-icon fas fa-border-all" />{" "}
                                <p> Mesas</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
                {/* /.sidebar-menu */}
            </div>
            {/* /.sidebar */}
        </aside>
    );
};

export default Menu;
