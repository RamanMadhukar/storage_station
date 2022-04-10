import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import ReactPaginate from 'react-paginate';


const Home = () => {

    const initialvalues = {
        shipProvider: '',
        status: '',
        startDate: '',
        endDate: ''

    }


    const shipProvider = [];
    const statusDrop = [];
    const [search, setSearch] = useState(initialvalues);
    const [data, setData] = useState([]);
    const [allData, setAllData] = useState([]);
    const [allData2, setAllData2] = useState([]);
    const [pagenumber, setPagenumber] = useState(0);
    const [totalRecords, setTotalRecords] = useState(1);




    useEffect(() => {
        getAllData();

    }, []);

 

    useEffect(() => {
        changePage(0);
    }, [])





    const handleChange = name => event => {
        setSearch({ ...search, [name]: event.target.value });
    };

    // all data fetch 

    const getAllData = () => {
        axios({
            method: 'GET',
            url: "http://localhost:5000/"

        })
            .then(response => {
                setAllData(response.data.filter1);
                setAllData2(response.data.filter2);
                setTotalRecords(response.data.totalCount);




            })
            .catch(error => {
                console.log(error);
            });
    }



    // search filter get







    const changePage = ({ selected }) => {



        axios({
            method: 'POST',
            url: "http://localhost:5000/",
            data: { pagenumber, search }
        })
            .then(response => {
                setData(response.data);
                setTotalRecords(response.data.totalCount);


                console.log(response);


            })
            .catch(error => {
                console.log('Data not found');
            });

        setPagenumber(selected);
        console.log(pagenumber);



    };


    // dropdown fetch 

    allData.map((c) => {
        let a = 0;
        shipProvider.map((d) => {
            if (c._id.shipping_method === d) {
                a++;
            }
        });
        if (a === 0) {
            shipProvider.push(c._id.shipping_method);
        }
    });

    allData2.map((c) => {
        let a = 0;
        statusDrop.map((d) => {
            if (c._id.fulfillment_status === d) {
                a++;
            }
        });
        if (a === 0) {
            statusDrop.push(c._id.fulfillment_status);
        }
    });


    shipProvider.sort();
    statusDrop.sort();





    const diaplayUsers = data
        .map((c) => {
            return (
                <tr>
                    <td>{c.order_id}</td>
                    <td>{c.shipping_method}</td>
                    <td>{c.order_amount}</td>
                    <td>{c.tracking_number}</td>
                    <td>{c.from_address.name}</td>
                    <td>{c.createdAt}</td>
                    <td>{c.fulfillment_status}</td>
                </tr>
            )

        });

    // page count 

    const pageCount = Math.ceil(totalRecords / 20);


    return (
        <>

            <form >
                <label for="shipProvider">Shipment Provider</label>
                <select name="shipProvider" onChange={handleChange} >
                    <option value=""></option>

                    {shipProvider.map((c) => (

                        <option value={c}>{c}</option>

                    ))}

                </select>

                <label for="status">Status</label>
                <select name="status" onChange={handleChange}>
                    <option value=""></option>


                    {statusDrop.map((c) => (

                        <option value={c}>{c}</option>

                    ))}

                </select>

                <label for="startDate">Start Date</label>
                <input type="date" name="startDate" value="" onChange={handleChange} />

                <label for="endDate">End Date</label>
                <input type="date" name="endDate" value="" onChange={handleChange} />


                <button type="submit" onClick={changePage}>Search</button>


            </form><br />
            <p>Total Recordes:{totalRecords} </p>

            <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="download-table-xls-button btn btn-success mb-3"
                table="table-to-xls"
                filename="tablexls"
                sheet="tablexls"
                buttonText="Export Data to Excel Sheet" />
            <br />


            <div>


                <table className="table" id="table-to-xls">
                    <thead>

                        <tr>
                            <th>Order No</th>
                            <th>Shipment Provider</th>
                            <th>Amount(SAR)</th>
                            <th>Traking Number</th>
                            <th>Name</th>
                            <th>Creation Date</th>
                            <th>Status</th>
                        </tr>

                    </thead>


                    {diaplayUsers}

                </table>


                <ReactPaginate previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"paginationBttns"}
                    previousLinkClassName={"previousBttn"}
                    nextLinkClassName={"nextBttn"}
                    disabledClassName={"paginationDisabled"}
                    activeClassName={"paginationActive"}
                />





            </div>

        </>
    )
}

export default Home
