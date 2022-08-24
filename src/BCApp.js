import { useCallback, useEffect, useState } from "react";
import { encode } from "base-64";
import { Container, Row, Col, Table, Spinner, Button } from "reactstrap";
import MyDroDdown from "./bcdemo/MyDropDown";
import MyModal from "./bcdemo/MyModal";
import Pagination from "./bcdemo/Pagination";

const TableHead = ({ data }) => {

    let Headers = [];
    for (var key in data.value[0]) {
        if (key !== "@odata.etag") {
            Headers.push(<th key={key} >{key.replaceAll("_", " ")}</th>);
        }
    }

    return (
        <thead>
            <tr>
                {Headers}
            </tr>
        </thead>
    );
};


const TableBody = ({ data, currentPage }) => {

    const productNbr = data.value.length;
    const productsPerPage = 5;

    const pageNbr = Math.ceil(productNbr / productsPerPage);
    if (productNbr % productsPerPage < 0) pageNbr++;

    let from = (currentPage * productsPerPage) - productsPerPage;
    let to = currentPage * productsPerPage;
    if (to > productNbr) to = productNbr;

    const curentPageData = data.value.slice(from, to);

    let TBody = [];

    const rows = (rowNumer) => {
        let Cols = [];
        for (var key in curentPageData[rowNumer]) {
            if (key !== "@odata.etag") {
                Cols.push(<td>{!!curentPageData[rowNumer][key] ? curentPageData[rowNumer][key] : "-"}</td>);
            }
        }
        return <tr key={rowNumer}>{Cols}</tr>;
    }

    for (let i = 0; i < curentPageData.length; i++) {
        TBody.push(rows(i));
    }

    return <tbody>{TBody}</tbody>;
};

const BCApp = () => {

    const [data, setData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [isFetching, setIsFetching] = useState(false);
    const [table, setTable] = useState("PurchaseOrder");
    const [modal, setModal] = useState(false);
    const toggleModal = () => setModal(!modal);
    const handlePageChange = (page) => setCurrentPage(page);


    const fetchDataFromBC = useCallback(async (tableName, method) => {

        setIsFetching(true);

        const url = `https://api.businesscentral.dynamics.com/v2.0/c550c060-2906-4c8c-a522-1a14a71903b8/Production/ODataV4/Company('Modax%20Test%20-%20AP%20Integration')/${tableName}`;
        const username = "guest";
        const password = "pmQCccaMCnwAlibOvXnEhAVnbn3Z/RQ4imWNGgQBOM8=";

        try {
            const responce = await fetch(url, {
                method: method,
                headers: new Headers({
                    'Authorization': 'Basic ' + encode(username + ":" + password),
                    'Content-Type': 'application/json'
                })
            });

            const data = await responce.json();
            setIsFetching(false);
            return data;
        }
        catch (error) {
            setIsFetching(false);
            throw error;
        }
    }, []);

    const refresh = async () => {
        const data = await fetchDataFromBC(table, "GET");
        setData(data);
    };

    const handleTableChange = (table) => {
        setCurrentPage(1);
        setTable(table);
    };

    useEffect(() => {
        (async () => {
            const data = await fetchDataFromBC(table, "GET");
            setData(data);
        })();
    }, [table, fetchDataFromBC]);

    return (
        <Container className="h-100 ">
            <Row className="h-100 p-0 ">
                {!isFetching && <Col>
                    {!!data &&
                        <div>
                            <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
                                <div className="d-flex">
                                    <MyDroDdown
                                        onActiveTableChange={handleTableChange}
                                        table={table}
                                    />
                                    <Button onClick={refresh} color="info" className="ms-3" >Refresh</Button>
                                </div>
                                <div className="bg-secondary fw-bold text-white p-2 rounded">{table + " Table"}</div>
                                <Button
                                    color="primary"
                                    onClick={toggleModal}
                                >Add New Item</Button>
                            </div>
                            <Table striped responsive bordered className="rounded">
                                <TableHead data={data} />
                                <TableBody data={data} currentPage={currentPage} />
                            </Table>
                            <Pagination onPageChange={handlePageChange} currentPage={currentPage} data={data} />
                        </div>}
                </Col>}

                {isFetching && <Col className="h-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="d-flex justify-content-center">
                        <Spinner color="success" type="grow" > Loading... </Spinner>
                        <Spinner color="primary" type="grow" > Loading... </Spinner>
                        <Spinner color="warning" type="grow" > Loading... </Spinner>
                        <Spinner color="info" type="grow" > Loading... </Spinner>
                    </div>
                    <div className="fs-3 text-secondary">İstek BC'ye Gönderiliyor...</div>
                </Col>}

                <MyModal
                    modal={modal}
                    toggleModal={toggleModal}
                    data={data}
                    table={table}
                    fetchDataFromBC={fetchDataFromBC}
                />

            </Row>
        </Container>
    );
};

export default BCApp;

