import "./styles/Table.css";
import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbarQuickFilter,  } from "@mui/x-data-grid";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Collapse, Divider, IconButton, Select } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  firstName: string,
  lastName: string
}

const Table = (props : IProps) => {
  const {firstName, lastName} = props;
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [openAdd, setOpenAdd] = React.useState(false);
  const [openModify, setOpenModify] = React.useState(false);
  const [selections, setSelections] = useState([]);
  const [filter, setFilter] = useState(null);
  const [fetcher, setFetcher] = useState(0);
  const [open, setOpen] = useState(false);

useEffect(() => {
  const doFetch = async () => {
    if (filter != null && filter != 5) {
      const numFilter = filter;
        const response: any = await fetch(`http://localhost:5211/api/Order?OrderTypes=${numFilter}`)
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
        console.log(data);
        const body = await response.json();
    }
    else {
      const response: any = await fetch("http://localhost:5211/api/Order")
          .then((response) => response.json())
          .then((json) => setData(json))
          .catch((error) => console.error(error));
        console.log(data);
        const body = await response.json();
    }
    window.location.reload();
  };
  doFetch();
}, [search, filter, fetcher]);

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  const handleClickOpenModify = () => {
    setOpenModify(true);
  };

  const handleCloseModify = () => {
    setOpenModify(false);
  };

  const numToType = (num) => {
    if (num == 0) {
      return 'Standard';
    }
    else if (num == 1) {
      return 'Sale';
    }
    else if (num == 2) {
      return 'Purchase';
    }
    else if (num == 3) {
      return 'Transfer';
    }
    else if (num == 4) {
      return 'Return';
    }
    else if (num == 5) {
      return 'All';
    }
    console.log('Conversion error');
  }

  const typeToNum = (type) => {
    if (type == 'Standard') {
      return 0;
    }
    else if (type == 'Sale') {
      return 1;
    }
    else if (type == 'Purchase') {
      return 2;
    }
    else if (type == 'Transfer') {
      return 3;
    }
    else if (type == 'Return') {
      return 4;
    }
    else if (type == 'All') {
      return 5;
    }
    console.log('Conversion error');
  }

  const handleAddSubmit = async (name, type) => {
    try {
    //make post http call with name and type
    console.log(name, 'name test');
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
          "orderedBy": name,
          "customerName": `${firstName + ' ' + lastName}`
        }),
      });
      if (!response.ok) {
        throw new Error('Oops');
      }
      else {
        //window.location.reload();
        setFetcher(fetcher + 1);
      }
      console.log(response);
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleDeleteRow = () => {
    if (selections.length == 0) {
      console.log('EMPTY CANNOT DELETE');
      setOpen(true);
    }
    else {
      selections.map(id => {
        const response = fetch(`http://localhost:5211/api/Order/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        console.log('errrorrr');
      }
    });
    //window.location.reload();
    setFetcher(fetcher + 1);
    }
  };

  const handleModifyRow = (id, name, type) => {
    console.log(id, name, type);
    const orderType = parseInt(type);
    const response = fetch(`http://localhost:5211/api/Order/${id}`, {
      method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "orderType": orderType,
          "orderedBy": name,
          "customerName": `${firstName + ' ' + lastName}`
        }),
      }).then(response => {
        if (response.ok) {
          //window.location.reload();
          setFetcher(fetcher + 1);
        }
        else {
          console.log(response.status);
        }
      });
  }

  const handleFilterRow = (e) => {
    setFilter(e.target.value);
    //console.log(filter);
    console.log(e.target.value);
  };

function QuickSearchToolbar() {
  return (
    <>
      <Collapse in={open}>
          <Alert variant="outlined" severity="error" 
              action={
                  <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                          setOpen(false);
                      }}
                  >
                      <CloseIcon fontSize="inherit" />
                  </IconButton>
              }
              sx={{ mb: 2 }}
          >
              Select orders to delete!
          </Alert>
      </Collapse>
      <Box
        sx={{
          p: 0.5,
          pb: 0
        }}
      >
        <Stack direction="row" spacing={2} sx={{ mb: 1 }}>
          <Box sx={{
            width: 575,
            height: 56.25,
            borderRadius: 1,
            border: '1px solid #E28B95'
          }}>
            <Divider orientation="horizontal" component="li" flexItem={true} sx={{display: "flex", justifyContent: "left"}}>
              <GridToolbarQuickFilter id="searchTool"
                sx={{
                  "& .MuiInputBase-root": {
                    height: 58.25,
                    placeholder: "SEARCH..."
                  },
                  "& .MuiInput-underline:before": {
                    content: 'none'
                  },
                  "& .css-1eed5fa-MuiInputBase-root-MuiInput-root::after": {
                    content: 'none'
                  }
                }}
                quickFilterParser={(searchInput: string) =>
                  searchInput
                    .split(',')
                    .map((value) => value.trim())
                    .filter((value) => value !== '')
                }
              />
            </Divider>
          </Box>
          <React.Fragment>
            <Button id="addTool" variant="outlined" onClick={handleClickOpenAdd} color="error">
              Add Order
            </Button>
            <Dialog
              open={openAdd}
              onClose={handleCloseAdd}
              PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const formData = new FormData(event.currentTarget);
                  const formJson = Object.fromEntries((formData as any).entries());
                  const name = formJson.orderName;
                  const type = typeToNum(formJson.orderType);
                  handleAddSubmit(name, type);
                  handleCloseAdd();
                },
              }}
              sx={{
                "& .css-953pxc-MuiInputBase-root-MuiInput-root::before": {

                },
                "& .css-953pxc-MuiInputBase-root-MuiInput-root::after": {

                }
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
                  <Button onClick={handleCloseAdd} color="error">Cancel</Button>
                  <Button type="submit" onSubmit={handleAddSubmit} color="error">Submit</Button>
                </DialogActions>
            </Dialog>
            </React.Fragment>
              <Button id="deleteTool" variant="outlined" onClick={handleDeleteRow} color="error">
                Delete Order
              </Button>
            <React.Fragment>
              <Button id="modifyTool" variant="outlined" onClick={handleClickOpenModify} color="error">
                Modify Order
              </Button>
              <Dialog
                open={openModify}
                onClose={handleCloseModify}
                PaperProps={{
                  component: 'form',
                  onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    const formData = new FormData(event.currentTarget);
                    const formJson = Object.fromEntries((formData as any).entries());
                    const id = formJson.orderId;
                    const name = formJson.orderName;
                    const type = typeToNum(formJson.orderType);
                    handleModifyRow(id, name, type);
                    handleCloseModify();
                  },
                }}
              >
                <DialogTitle>Enter Order Details</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Please enter an ID, followed by the modified type and name for the order.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="orderId"
                      label="Order ID"
                      type="text"
                      fullWidth
                      variant="standard"
                    />
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
                    <Button onClick={handleCloseModify} color="error">Cancel</Button>
                    <Button type="submit" onSubmit={handleAddSubmit} color="error">Submit</Button>
                  </DialogActions>
            </Dialog>
            </React.Fragment>
            <FormControl fullWidth color="error">
              <InputLabel id="demo-simple-select-label">Order Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={filter}
                label="Order Type"
                onChange={handleFilterRow}
              >
                <MenuItem value={0}>Standard</MenuItem>
                <MenuItem value={1}>Sale</MenuItem>
                <MenuItem value={2}>Purchase</MenuItem>
                <MenuItem value={3}>Transfer</MenuItem>
                <MenuItem value={4}>Return</MenuItem>
                <MenuItem value={5}>All</MenuItem>
              </Select>
            </FormControl>
        </Stack>
      </Box>
    </>
  );
}

  const cols = [
    { field: "id", headerName: "Order Id", width: 400 },
    { field: "orderType", headerName: "Order Type", width: 300 },
    { field: "orderedBy", headerName: "Customer Name", width: 300 },
    { field: "customerName", headerName: "Ordered By", width: 300 },
    { field: "createdDate", headerName: "Date Created", width: 250 },
  ];

  var convertedData = null;
  if (!(data == null || data.length == 0)) {
    convertedData = data.map(obj => {
      return { ...obj, orderType: numToType(parseInt(obj.orderType)) };
    });
  }

  return (
    <div className="center">
        <Box className="center" component="section" sx={{ p: 2 }}>
            <DataGrid
              rows={ convertedData || [] }
              rowHeight={68}
              columns={cols}
              slots={{ toolbar: QuickSearchToolbar}}
              initialState={{
                  pagination: {
                  paginationModel: {
                      pageSize: 10,
                  },
                  },
                  filter: {
                    filterModel: {
                      items: [],
                      quickFilterValues: [],
                    },
                  },
              }}
              pageSizeOptions={[10]}
              checkboxSelection
              disableRowSelectionOnClick
              onRowSelectionModelChange={(ids) => {
                //console.log(ids);
                setSelections(ids);
              }}
            ></DataGrid>
        </Box>
    </div>
  );
}

export default Table;
