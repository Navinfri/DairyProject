import React, { useState, useEffect } from 'react'
import "../Product/Product.css"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import { DialogActions, DialogTitle, Button } from '@mui/material';
import Box from '@mui/material/Box';
import { FiEdit } from "react-icons/fi";
// import { MdDeleteOutline } from "react-icons/md";
// import Slide from '@mui/material/Slide';
import axios from 'axios'
// import { IconButton } from '@mui/material';
// import CancelIcon from '@mui/icons-material/Cancel';

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
// });

const MilkMaster = () => {

    const [loader, setLoader] = useState(false)
    const [dtmMilkRate, setDtmMilkRate] = useState("")
    const [standardMilkRate, setStandardMilkRate] = useState("")
    const [hotelMilkRate, setHotelMilkRate] = useState("")
    const [salingMilkRate, setSalingMilkRate] = useState("")
    const [prodTableData, setProdTableData] = useState([])
    // const [opendailogdel, setopendailogdel] = useState(false)
    const [editItem, setEditItem] = useState(null);
    // const [delid, setdelid] = useState()
    // const [anchorEl, setAnchorEl] = React.useState(null);
    const [showtable, setshowtable] = useState(false)

    const saveData = async () => {
        try {
            if (editItem) {
                const editres = await axios.put(`http://103.38.50.113:8080/DairyApplication/updateMilkRate/${editItem.id}`, {
                    dtmMilkRate, standardMilkRate, hotelMilkRate, salingMilkRate
                })
                toast.success("Data Updated Successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            } else {
                const res = await axios.post("http://103.38.50.113:8080/DairyApplication/saveMilkRate", {
                    dtmMilkRate, standardMilkRate, hotelMilkRate, salingMilkRate
                })
                toast.success("Data Saved Successfully", {
                    position: "top-center",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
                setTimeout(() => {
                    window.location.reload()
                }, 4000)
                console.log(res)
            }

            setDtmMilkRate("");
            setStandardMilkRate("");
            setHotelMilkRate("");
            setSalingMilkRate("");
            setEditItem(null);


            getProductData();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    // const dele = (id) => {
    //     setdelid(id)
    //     setopendailogdel(true)
    // }

    // const handleClose = () => {
    //     setAnchorEl(null);
    //     setopendailogdel(false)
    // };

    // const handledel = async () => {
    //     let delobj = {
    //         "id": delid
    //     }

    //     try {
    //         await axios.post("http://103.38.50.113:8080/DairyApplication/deleteMilkRateById", delobj, {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //             .then((resdel) => {
    //                 console.log(resdel.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error)
    //             })
    //         setTimeout(() => {
    //             window.location.reload()
    //         }, 1000);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    // const dailoge = () => {
    //     return (
    //         <>
    //             <Dialog

    //                 open={opendailogdel}
    //                 TransitionComponent={Transition}
    //                 keepMounted
    //                 onClose={handleClose}
    //                 aria-describedby="alert-dialog-slide-description"
    //             >
    //                 <DialogActions style={{ height: '2.5rem' }}>
    //                     <IconButton onClick={handleClose}>
    //                         <CancelIcon style={{ color: 'blue' }} />
    //                     </IconButton>
    //                 </DialogActions>
    //                 <div style={{ background: 'white' }}>

    //                     <DialogTitle>
    //                         Are you sure you want to delete?
    //                     </DialogTitle>
    //                     <DialogActions>
    //                         <Button onClick={handledel}>Yes</Button>
    //                         <Button onClick={handleClose}>No</Button>
    //                     </DialogActions>
    //                 </div>
    //             </Dialog>
    //         </>
    //     )
    // }

    const editItemHandler = (item) => {
        setDtmMilkRate(item.dtmMilkRate);
        setStandardMilkRate(item.standardMilkRate);
        setHotelMilkRate(item.hotelMilkRate);
        setSalingMilkRate(item.salingMilkRate)
        setEditItem(item);
    };


    const getProductData = async () => {
        setLoader(true)
        try {
            let data = await axios.get("http://103.38.50.113:8080/DairyApplication/getAllDataOfMilkRateMaster").then((res) => {
                setProdTableData(res.data)
                setLoader(false)
            })
        } catch (error) {
            console.log(error, "server issue")
        }
    }

    return (
        <>
            {
                loader ?
                    <div className='loader-Cont'>
                        <div className='spinner'></div>
                    </div> :

                    <div className='container mt-4'>
                        <ToastContainer position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light">
                        </ToastContainer>
                        <div className='pt-5'>
                            {/* {dailoge()} */}
                            <h3 className='text-center mt-3' style={{ textDecoration: 'underline' }}>Milk Sale Master</h3>
                            <div className='row mt-4'>
                                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        autoComplete="off"
                                    >
                                        <TextField label="DTM Milk Rate" variant="standard" value={dtmMilkRate} onChange={(e) => setDtmMilkRate(e.target.value)} />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        autoComplete="off"
                                    >
                                        <TextField label="Standard Milk Rate" variant="standard" value={standardMilkRate} onChange={(e) => setStandardMilkRate(e.target.value)} />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        type="number"
                                        autoComplete="off"
                                    >
                                        <TextField label="Hotel Milk Rate" variant="standard" value={hotelMilkRate} onChange={(e) => setHotelMilkRate(e.target.value)} />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-6 col-xl-3 col-md-6 d-flex justify-content-center align-items-center'>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1, width: '25ch' },
                                        }}
                                        type="number"
                                        autoComplete="off"
                                    >
                                        <TextField label="Saling Milk Rate" variant="standard" value={salingMilkRate} onChange={(e) => setSalingMilkRate(e.target.value)} />
                                    </Box>
                                </div>
                                <div className='col-12 col-lg-12 col-xl-12 col-md-12 mt-4 d-flex justify-content-center align-items-center' style={{ gap: "1rem" }}>
                                    <button className='savebtn' onClick={() => { saveData() }}>Save</button>
                                    <button className='tabelbtn' onClick={() => setshowtable(!showtable)}>Show table</button>
                                </div>

                                {/*Table Code */}
                                {
                                    showtable ?
                                        <div className='container tableMaster mt-5 mb-3 p-0'>
                                            <table className='table productTableMAster table-stripped'>
                                                <thead className='tableheading'>
                                                    <tr>
                                                        <th>SrNo</th>
                                                        <th style={{ width: "180px" }}>DTM Milk Rate</th>
                                                        <th> Standard Milk Rate </th>
                                                        <th>Hotel Milk Rate</th>
                                                        <th>Saling Milk Rate</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='border'>
                                                    {
                                                        prodTableData.map((item, i) => {
                                                            return (
                                                                <tr key={i}>
                                                                    <th scope='row' className='text-center'>{item.id}</th>
                                                                    <td>
                                                                        <p className='sub1'>{item.dtmMilkRate}</p>
                                                                    </td>
                                                                    <td>{item.standardMilkRate}</td>
                                                                    <td>{item.hotelMilkRate}</td>
                                                                    <td>{item.salingMilkRate}</td>
                                                                    <td>
                                                                        <button className='btn' onClick={() => editItemHandler(item)}><FiEdit className='editicon' /></button>
                                                                        {/* <button className='btn' onClick={() => dele(item.id)}><MdDeleteOutline className='delicon' /></button> */}
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div> : null
                                }
                            </div>
                        </div>
                    </div>
            }

        </>
    )
}

export default MilkMaster