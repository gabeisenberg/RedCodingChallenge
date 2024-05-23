import './Table.css';
import React, { useEffect, useState } from "react"
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Table = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const doFetch = async () => {
            const response = await fetch("http://localhost:5211/api/Order").then(response => response.json())
                .then(json => setData(json))
                .catch(error => console.error(error));
            const body = await response.json();
            console.log(body);
        }
        doFetch();
    }, []);

const cols = [
    {field: 'id', headerName: 'id'},
    {field: 'orderName', headerName: 'order type'},
    {field: 'customerName', headerName: 'customer name'},
    {field: 'createUserId', headerName: 'user id'},
    {field: 'createdDate', headerName: 'date'}
];

    return (
        <DataGrid
            rows={data}
            columns={cols}
            initialState={{
            pagination: {
                paginationModel: {
                    pageSize: 5,
                    },
                },
            }}
            pageSizeOptions={[5]}
            checkboxSelection
            disableRowSelectionOnClick
        >
        </DataGrid>
    )
}

export default Table;