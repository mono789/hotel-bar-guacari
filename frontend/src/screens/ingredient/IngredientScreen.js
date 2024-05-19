import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

/* Components */
import HeaderContent from "../../components/HeaderContent";
import Modal from "react-modal";
import Input from "../../components/form/Input";
import ModalButton from "../../components/ModalButton";
import DataTableLoader from "../../components/loader/DataTableLoader";
import Select from "../../components/Select";

/* Actions */
import { listIngredients, createIngredient } from "../../actions/ingredientActions";
import { listCategories } from "../../actions/categoryActions";

/* Styles */
import { modalStyles } from "../../utils/styles";
import Search from "../../components/Search";
import LoaderHandler from "../../components/loader/LoaderHandler";
import Pagination from "../../components/Pagination";
import Message from "../../components/Message";

Modal.setAppElement("#root");

const IngredientScreen = ({ history }) => {
    const [name, setName] = useState("");
    const [cost, setCost] = useState(0);
    const [stock, setStock] = useState(0);
    const [category, setCategory] = useState(null);

    const [errors, setErrors] = useState({});

    const [keyword, setKeyword] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const dispatch = useDispatch();

    const categoryList = useSelector((state) => state.categoryList);
    const { categories } = categoryList;

    const ingredientList = useSelector((state) => state.ingredientList);
    const { loading, error, ingredients, page, pages } = ingredientList;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const ingredientCreate = useSelector((state) => state.ingredientCreate);
    const {
        loading: createLoading,
        success: createSuccess,
        error: createError,
    } = ingredientCreate;

    useEffect(() => {
        if (createSuccess) {
            setName("");
            setCost(0);
            setStock(0);
            setCategory(null);

            setModalIsOpen(false);
        }
        dispatch(listIngredients(keyword, pageNumber));
    }, [dispatch, history, userInfo, pageNumber, keyword, createSuccess]);

    const handleSubmit = (e) => {
        e.preventDefault();

        let errorsCheck = {};

        if (!name) {
            errorsCheck.name = "Nombre es requerido";
        }
        if (!cost) {
            errorsCheck.cost = "Costo es requerido";
        }

        if (!stock) {
            errorsCheck.stock = "Inventario es requerido";
        }
        if (!category) {
            errorsCheck.category = "Categoría es requerida";
        }

        if (Object.keys(errorsCheck).length > 0) {
            setErrors(errorsCheck);
        } else {
            setErrors({});
        }

        if (Object.keys(errorsCheck).length === 0) {
            const ingredient = {
                name: name,
                cost: cost,
                stock: stock,
                categoryId: category,
            };

            dispatch(createIngredient(ingredient));
        }
    };

    const searchCategories = (e) => {
        dispatch(listCategories(e.target.value));
    };

    const renderCategoriesSelect = () => (
        <Select
            data={category}
            setData={setCategory}
            items={categories}
            search={searchCategories}
        />
    );

    const renderModalCreateIngredient = () => (
        <>
            <ModalButton
                modal={modalIsOpen}
                setModal={setModalIsOpen}
                classes={"btn-success btn-lg mb-2"}
            />
            <Modal
                style={modalStyles}
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
            >
                <LoaderHandler loading={createLoading} error={createError} />
                <h2>Formulario Creación</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        name={"Ingrediente"}
                        type={"text"}
                        data={name}
                        setData={setName}
                        errors={errors}
                    />
                    <Input
                        name={"Costo"}
                        type={"number"}
                        data={cost}
                        setData={setCost}
                        errors={errors}
                    />
                    <Input
                        name={"Cantidad"}
                        type={"number"}
                        data={stock}
                        setData={setStock}
                        errors={errors}
                    />
                    {renderCategoriesSelect()}
                    {errors.category && (
                        <Message message={errors.category} color={"warning"} />
                    )}
                    <hr />
                    <button type="submit" className="btn btn-primary">
                        Confirmar
                    </button>
                    <ModalButton
                        modal={modalIsOpen}
                        setModal={setModalIsOpen}
                        classes={"btn-danger float-right"}
                    />
                </form>
            </Modal>
        </>
    );

    const renderIngredientsTable = () => (
        <table className="table table-hover text-nowrap">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Costo</th>
                    <th>Inventario</th>
                    <th className="d-none d-sm-table-cell">Creado en</th>
                    <th className="d-none d-sm-table-cell">Categoría</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                        <td>{ingredient.id}</td>
                        <td>{ingredient.name}</td>
                        <td>{ingredient.cost}</td>
                        <td>{ingredient.stock}</td>
                        <td className="d-none d-sm-table-cell">
                            {ingredient.createdAt.slice(0, 10)}
                        </td>
                        <td className="d-none d-sm-table-cell">
                            {ingredient.category.name}
                        </td>
                        <td>
                            <Link
                                to={`/ingredient/${ingredient.id}/edit`}
                                className="btn btn-warning btn-lg"
                            >
                                Editar
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <>
            <HeaderContent name={"Ingredientes"} />
            {/* Main content */}

            <section className="content">
                <div className="container-fluid">
                    {renderModalCreateIngredient()}

                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">
                                        Ingredientes
                                    </h3>
                                    <div className="card-tools">
                                        <Search
                                            keyword={keyword}
                                            setKeyword={setKeyword}
                                            setPage={setPageNumber}
                                        />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <LoaderHandler
                                        loading={loading}
                                        error={error}
                                        loader={<DataTableLoader />}
                                        render={renderIngredientsTable}
                                    />
                                </div>
                                {/* /.card-body */}
                            </div>
                            <Pagination
                                page={page}
                                pages={pages}
                                setPage={setPageNumber}
                            />
                        </div>
                        {/* /.col */}
                    </div>
                    {/* /.row */}
                </div>
                {/* /.container-fluid */}
            </section>
        </>
    );
};

export default IngredientScreen;
