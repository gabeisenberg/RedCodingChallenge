import "./Table.css";
import React, { SetStateAction, useEffect, useState } from "react";
import { DataGrid, GridToolbar, GridColDef, GridToolbarQuickFilter, GridLogicOperator, } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Table = () => {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [open, setOpen] = React.useState(false);

useEffect(() => {
  const doFetch = async () => {
    const response: any = await fetch("http://localhost:5211/api/Order")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
    console.log(data);
    const body = await response.json();
  };
  doFetch();
}, [search]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddSubmit = async (name, type) => {
    try {
    //make post http call with name and type
    console.log(name);
    console.log(type);
    //make call
    const orderType = parseInt(type);
    const response: any = await fetch('http://localhost:5211/api/Order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "orderType": orderType,
          "customerName": name
        }),
      });
      if (!response.ok) {
        throw new Error('Oops');
      }
      else {
        window.location.reload();
      }
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
        <GridToolbarQuickFilter
          quickFilterParser={(searchInput: string) =>
            searchInput
              .split(',')
              .map((value) => value.trim())
              .filter((value) => value !== '')
          }
        />
        <React.Fragment>
          <Button variant="outlined" onClick={handleClickOpen}>
            Add Order
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
              component: 'form',
              onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                const formData = new FormData(event.currentTarget);
                const formJson = Object.fromEntries((formData as any).entries());
                const name = formJson.orderName;
                const type = formJson.orderType;
                handleAddSubmit(name, type);
                handleClose();
              },
            }}
          >
            <DialogTitle>Enter Order Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter a type and name for the order.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="orderType"
            label="Order Type"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="orderName"
            label="Order Name"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onSubmit={handleAddSubmit}>Submit</Button>
        </DialogActions>
          </Dialog>
          </React.Fragment>
          <Button size="small" onClick={handleAddRow}>
            Delete Order
          </Button>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data}
              label="Order Type"
              onChange={handleAddRow}
            >
              <MenuItem value={0}>Standard</MenuItem>
              <MenuItem value={1}>Sale</MenuItem>
              <MenuItem value={2}>Purchase</MenuItem>
              <MenuItem value={3}>Transfer</MenuItem>
              <MenuItem value={4}>Return</MenuItem>
            </Select>
          </FormControl>
      </Stack>
    </Box>
  );
}

const handleAddRow = () => {
  
};


  const cols = [
    { field: "id", headerName: "Order Id", width: 300 },
    { field: "orderType", headerName: "Order Type", width: 150 },
    { field: "customerName", headerName: "Created By", width: 150 },
    { field: "createUserId", headerName: "User Id", width: 150 },
    { field: "createdDate", headerName: "Date Created", width: 150 },
  ];

  return (
    <div className="center">
        <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
            <DataGrid
              rows={ data || [] }
              columns={cols}
              slots={{ toolbar: QuickSearchToolbar}}
              initialState={{
                  pagination: {
                  paginationModel: {
                      pageSize: 5,
                  },
                  },
                  filter: {
                    filterModel: {
                      items: [],
                      quickFilterValues: [],
                    },
                  },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
            ></DataGrid>
        </Box>
    </div>
  );
}

export default Table;
