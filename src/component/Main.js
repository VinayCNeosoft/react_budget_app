import React,{useState,useEffect} from 'react';
import { Container,Typography , Button, Menu,MenuItem, Grid, Box, TextField, Table} from '@mui/material';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MoneyIcon from '@mui/icons-material/Money';
import PaymentIcon from '@mui/icons-material/Payment';
import { pink } from '@mui/material/colors';
import {useNavigate} from "react-router-dom";

const styles = {
    boxContainer: {
        // backgroundImage: `url(${bggg})`
        backgroundColor:`#6DD5FA`
    },
};


function Main() {
    const [budget, setBudget] = useState(0)
    const [totalbudget, setTotalBudget] = useState(0)
    const [expense, setExpense] = useState()
    const [totalexpense, setTotalExpense] = useState(0)
    const [expensetitle, setExpensetitle] = useState("")
    const [table, setTable] = useState([])

    useEffect(() => {
        const getTable = JSON.parse(localStorage.getItem("table"));
        const getTotalBudget = JSON.parse(localStorage.getItem("totalbudget"));
        const getTotalExpense = JSON.parse(localStorage.getItem("totalexpense"));

        if (getTable) {
          setTable(getTable);
          setTotalBudget(getTotalBudget)
          setTotalExpense(getTotalExpense)
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("table", JSON.stringify(table));
        localStorage.setItem("totalexpense", JSON.stringify(totalexpense));
        localStorage.setItem("totalbudget", JSON.stringify(totalbudget));
    },[table,totalexpense,totalbudget]);

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const addBudget=(e)=>{
        e.preventDefault()
        if(totalbudget){
            setTotalBudget(Number(budget)+Number(totalbudget))
        }
        else{
            setTotalBudget(Number(budget))
        }
        document.getElementById("budgetForm").reset();
    }

    const addExpense=(e)=>{
        e.preventDefault()
        if(totalexpense){
            setTotalExpense(Number(expense)+Number(totalexpense))
        }
        else{

            setTotalExpense(Number(expense))
        }
        setTable([
            { id: Date.now(), expensetitle: expensetitle, expense: expense },
            ...table,
        ]);
        console.log(table)
        document.getElementById("expenseForm").reset();
    }

    const tableDelete = (id) => {
        const updatedtable = table.filter((item) => item.id !== id );
        setTable(updatedtable);
        let totalexp= 0
        updatedtable.map((data)=>(
            totalexp = Number(totalexp) + Number(data.expense)
        ))
        setTotalExpense(totalexp)
    }
    const onLogoutSuccess = () =>{
        console.log("Logout Successfully")
    }

    const handleLogout = () => {
        localStorage.setItem('status','')
        localStorage.setItem('id','')
        localStorage.setItem('email','')
        localStorage.setItem('password','')
        onLogoutSuccess();
        navigate('/log');
    };

    return (
        <Box container spacing={0} direction="column" alignContent="center" alignItems="center" style={styles.boxContainer}>
        <br/>
        <div>
            <Button id="basic-button" aria-controls="basic-menu" aria-haspopup="true" color='error' aria-expanded={open ? 'true' : undefined} onClick={handleClick}>
                {localStorage.getItem('email')}
            </Button>
            <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} MenuListProps={{ 'aria-labelledby': 'basic-button'}}>
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </div>
        <div>
            <Typography variant="h2" gutterBottom component="div">JS Budget Calculator</Typography>
        </div>
        <Container>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
                <form id="budgetForm">
                <div className="container">
                    <h2>Budget Form</h2>
                    <Box container spacing={0} direction="column" alignContent="center" alignItems="center" id="budgetForm"><br/> <br/>
                        <TextField sx={{ mt:2, mx:2 ,color:'white'}} type="number" variant="outlined" color="secondary" focused label="Add an Amount" name="add" onChange={(e) => setBudget(e.target.value)}/><br/>
                        <Button sx={{mt:2}} variant="contained" color="success" onClick={addBudget}>Add Amount</Button><br/><br/><br/>
                    </Box>
                </div>
                </form>
            </Grid>
            <Grid item xs={6}>
                <div className="container ">
                    <h2>Calculation</h2>
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={2} columns={12}>
                            <Grid item xs={4}>
                            <h2>Budget</h2>
                            <MoneyIcon color="secondary" sx={{ fontSize: 40 }}/>
                            <h2>$ {totalbudget}</h2>
                            </Grid>
                            <Grid item xs={4}>
                            <h2>Expenses</h2>
                            <PaymentIcon color="success" sx={{ fontSize: 40 }}/>
                            <h2>$ {totalexpense}
                            </h2>
                            </Grid>
                            <Grid item xs={4}>
                            <h2>Balance</h2>
                            <AccountBalanceWalletIcon sx={{ fontSize: 40, color: pink[500] }}/>
                            <h2>$ {totalbudget-totalexpense ? (totalbudget)-(totalexpense) :""}</h2>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </Grid>
            <Grid item xs={6}>
                <form id="expenseForm">
                <div className="container">
                    <h2>Expenses Form</h2>
                    <Box container spacing={0} direction="column" alignContent="center" alignItems="center"><br/> <br/>
                        <TextField sx={{ mt:2, mx:2}} type="text" variant="outlined" color="secondary" focused label="Title" name="title"  onChange={(e) => setExpensetitle(e.target.value)}/><br/>
                        <TextField sx={{ mt:2, mx:2}} type="number" variant="outlined" color="secondary" focused label="Amount" name="expense" onChange={(e) => setExpense(e.target.value)}/><br/>
                        <Button sx={{mt:2}} variant="contained" color="success" onClick={addExpense}>Add Expenses</Button><br/><br/><br/>
                    </Box>
                </div>
                </form>
            </Grid>
            <Grid item xs={6}>
                <div className="container">
                    <h2>Total Info</h2>
                    <Table className="text-center table-bordered table-dark table-responsive">
                    <thead>
                        <tr>
                            <th>Expense Title</th>
                            <th>Expense Value</th>
                            <th colSpan="2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((data,i)=>(
                        <tr key={i}>
                            <td>{data.expensetitle}</td>
                            <td>{data.expense}</td>
                            <td><Button onClick={() => tableDelete(data.id)}>Delete</Button></td>
                        </tr>
                        ))}
                    </tbody>
                </Table>
                </div>
            </Grid>
        </Grid>
        </Container>
        <br/>
        </Box>
    )
}

export default Main
