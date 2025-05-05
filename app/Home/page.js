'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Box, Button, Typography } from '@mui/material';
import app from '@/firebaseconfig';

const Home = () => {

  const auth = getAuth(app);
  const router = useRouter();
  const [user , setUser] = useState(null);

  useEffect(() => {
    console.log("asdfghjxcvbnm")
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user);
      }else {
        router.push("/");
      }
    })
    return () => unsubscribe();
  },[auth , router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch(error){
      console.log("Error signing out :" , error.message);
    }
  };

  if(user === null) return null;  
  return (
   <Box sx={{
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',     // stack vertically
    justifyContent: 'center',    // center vertically
    alignItems: 'center',        // center horizontally
    textAlign: 'center',
  }}>

     <Typography sx={{mb:4 , fontWeight:'bold' ,fontFamily:'bold' , fontSize:45}}>Welcome to the Homepage, { user.displayName}! </Typography>
     <Button onClick={handleLogout} sx={{ padding: '10px 20px' , fontSize:20}}>LogOut</Button>
   
   </Box>
  )
}

export default Home
