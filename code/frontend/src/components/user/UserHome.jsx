import React, { useEffect, useState } from 'react'
import { Badge, Row } from 'antd';
import Notification from '../common/Notification';
import axios from 'axios';
import { Link} from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MedicationIcon from '@mui/icons-material/Medication';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import { Container } from 'react-bootstrap';

import ApplyDoctor from './ApplyDoctor';
import UserAppointments from './UserAppointments';
import DoctorList from './DoctorList';

const UserHome = () => {
   const [doctors, setDoctors] = useState([])
   const [userdata, setUserData] = useState({})
   const [activeMenuItem, setActiveMenuItem] = useState('');

   // const location = useLocation();
   // const dbsbs = location.state;

   const getUser = () => {
      const user = JSON.parse(localStorage.getItem('userData'))
      if (user) {
         setUserData(user)
      }
   }

   const getUserData = async () => {
      try {
         await axios.post('http://localhost:8001/api/user/getuserdata', {}, {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token')
            },
         });
      } catch (error) {
         console.log(error);
      }
   };

   const getDoctorData = async () => {
      try {
         const res = await axios.get('http://localhost:8001/api/user/getalldoctorsu', {
            headers: {
               Authorization: "Bearer " + localStorage.getItem('token')
            },
         });
         if (res.data.success) {
            setDoctors(res.data.data)
         }
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      getUser();
      getUserData();
      getDoctorData()
   }, []);

   const logout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      window.location.href = "/";
   };

   const handleMenuItemClick = (menuItem) => {
      setActiveMenuItem(menuItem);
   };
   
   return (
      <>
         <div className='main'>
            <div className="layout">
               <div className="sidebar" style={{height:"112.7vh",backgroundColor:"#f5f5f5",color:"rgb(229,9,20)"}}>
                  <div className="logo" style={{color:"#279681",marginBottom:"12rem",marginTop:"1rem"}}>
                     <h2>MediCareBook</h2>
                  </div>
                  <div className="menu">
                     <div className="menu-items" onClick={()=>{window.location.href="/userhome"}}>
                        <HomeIcon className='icon' />&nbsp;<Link>HomePage</Link>
                     </div>
                     <div className={`menu-items ${activeMenuItem === 'userappointments' ? 'active' : ''}`} onClick={() => handleMenuItemClick('userappointments')}>
                        <CalendarMonthIcon className='icon' />&nbsp;<Link>Appointments</Link>
                     </div>
                     {userdata.isdoctor === true ? <></> : <div className={`menu-items ${activeMenuItem === 'applyDoctor' ? 'active' : ''}`} onClick={() => handleMenuItemClick('applyDoctor')}>
                        <MedicationIcon className='icon' />&nbsp;<Link>Apply doctor</Link>
                     </div>}
                     
                     
                     <div className="menu-items" onClick={logout}>
                        <LogoutIcon className='icon' />&nbsp;<Link>Logout</Link>
                     </div>
                  </div>
               </div>
               <div className="content">
                  <div className="header">
                     <div className="header-content">
                        
                        <Badge className={`notify ${activeMenuItem === 'notification' ? 'active' : ''}`} onClick={() => handleMenuItemClick('notification')} count={userdata?.notification ? userdata.notification.length : 0}>
                           <NotificationsIcon style={{color:"rgb(229,9,20)"}} className="icon" />
                        </Badge>

                        {userdata.isdoctor === true && <h3>Dr. </h3>}
                        <h3 style={{position:"relative",top:"2px"}}>{userdata.fullName}</h3>
                     </div>
                  </div>
                  <div className="body" style={{
                     height: "100vh",
                     overflow: "auto"
                  }}>
                     {activeMenuItem === 'applyDoctor' && <ApplyDoctor userId={userdata._id} />}
                     {activeMenuItem === 'notification' && <Notification />}
                     {activeMenuItem === 'userappointments' && <UserAppointments />}
                     {activeMenuItem !== 'applyDoctor' && activeMenuItem !== 'notification' && activeMenuItem !== 'userappointments' && <Container>
                        <h2 className="text-center p-2">Home</h2>
                        
                        {userdata.isdoctor === true ? <></> : <Row>
                           {doctors && doctors.map((doctor, i) => {
                              let notifyDoc = doctor.userId
                              return (
                                 <DoctorList userDoctorId={notifyDoc} doctor={doctor} userdata={userdata} key={i} />
                              )
                           })}
                        </Row>}
                     </Container>}
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default UserHome;
