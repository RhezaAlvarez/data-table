import React, { useEffect, useState } from 'react'
import { createEmployees, getEmployees, deleteEmployees, updateEmployees } from '../Services/SetupAxios'
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox, Button, TextField, IconButton
  } from '@mui/material';
import { Add, Delete } from '@mui/icons-material'

const Employee = () => {
    const [employees, setEmployees] = React.useState([]) // Variabel untuk menyimpan data Employee
    const [selectedIds, setSelectedIds] = useState([]) // Variabel untuk menyimpan Id Employee yang sudah dipilih untuk kebutuhan Delete nantinya
    const [newRows, setNewRows] = useState([]); // Variabel untuk menyimpan Id Employee yang sudah dipilih untuk kebutuhan Delete nantinya

    // Fetch data dari API get all Employee
    const fetchData = async () => {
        try {
            const response = await getEmployees()
            if(response.status === 200){
                setEmployees(response.data)
                console.log("Employees:",employees)
            }
            
        } catch (error) {
            console.log("Error get Employees:", e)
        }
    }

    // Fetch data pertama kali ketika halaman di load
    React.useEffect(() => {
        fetchData()
    }, [])

    // Handler ketika ada value input yang berubah
    const handleInputChange = (e, id, field) => {
        const updatedEmployees = employees.map((emp) =>
          emp.id === id ? { ...emp, [field]: e.target.value } : emp
        )
        setEmployees(updatedEmployees)
    }
    
    // ====================================================== Add ====================================================== //
    // Handler call API Create Employee
    const handleAdd = () => {
        const allFilled = newRows.every(row => row.name && row.position && row.salary);
        if (allFilled) {
        createEmployees(newRows)
            .then(() => {
                fetchData()
                setNewRows([])
            })
            .catch((error) => {
                console.error("Error creating employees: ", error)
            })
        } else {
            alert('Please fill out all fields before submit add employees.')
        }
    }

    // Handler membuat baris baru untuk kebutuhan add employee
    const handleAddRow = () => {
        setNewRows([...newRows, { name: '', position: '', salary: '' }]);
    }

    // ====================================================== Update ====================================================== //
    // Handler call API Update Employee
    const handleUpdate = () => {
        const updatedEmployees = employees.filter(emp => emp.id !== null)
        if (updatedEmployees.length > 0) {
            updateEmployees(updatedEmployees)
            .then(fetchData)
            .catch((error) => {
                console.error("Error updating employees: ", error)
            })
        }
    }
    
    // ====================================================== Delete ====================================================== //
    // Handler call API Delete Employee
    const handleDelete = () => {
        if (selectedIds.length > 0) {
            deleteEmployees(selectedIds)
            .then(fetchData)
            .catch((error) => {
                console.error("Error deleting employees: ", error)
            })
            setSelectedIds([]);
        } else {
            alert('Please select at least one employee to delete.')
        }
    }

    // Handler menyimpan id employee ketika tombol checkbox dipilih untuk kebutuhan delete
    const handleCheckboxChange = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        )
    }

    return(
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Salary</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee.id}>
                                <TableCell padding="checkbox">
                                    <Checkbox
                                    checked={selectedIds.includes(employee.id)}
                                    onChange={() => handleCheckboxChange(employee.id)}
                                    />
                                </TableCell>
                                <TableCell>{employee.id}</TableCell>
                                <TableCell>
                                    <TextField
                                    value={employee.name}
                                    onChange={(e) => handleInputChange(e, employee.id, 'name')}
                                    fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                    value={employee.position}
                                    onChange={(e) => handleInputChange(e, employee.id, 'position')}
                                    fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                    value={employee.salary}
                                    onChange={(e) => handleInputChange(e, employee.id, 'salary')}
                                    fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                        ))}

                        {newRows.map((row, index) => (
                            <TableRow key={`new-${index}`}>
                                <TableCell padding="checkbox" />
                                <TableCell>New</TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.name}
                                        onChange={(e) => handleInputChange(e, index, 'name', true)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.position}
                                        onChange={(e) => handleInputChange(e, index, 'position', true)}
                                        fullWidth
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        value={row.salary}
                                        onChange={(e) => handleInputChange(e, index, 'salary', true)}
                                        fullWidth
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className='flex gap-10 justify-center items-center'>
                <div className='flex flex-col gap-1'>
                    <Button variant="contained" color="success" onClick={handleAddRow} style={{ marginTop: '16px' }}>
                        <Add /> Add Row
                    </Button>
                    <Button variant="contained" color="success" onClick={handleAdd} style={{ marginTop: '16px' }}>
                        <Add />Add
                    </Button>
                </div>
                <Button variant="contained" color="primary" onClick={handleUpdate} style={{ marginTop: '16px' }}>
                    Update
                </Button>
                <Button variant="contained" color="error" onClick={handleDelete} style={{ marginTop: '16px' }}>
                    Delete
                </Button>
            </div>

        </>
    )
}

export default Employee