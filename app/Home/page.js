'use client';
import React, { useState, useEffect } from 'react';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { Button, Typography } from '@mui/material';
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
    <div>
      <Typography>Welcome to the Homepage, { user.displayName}! </Typography>
      <Button onClick={handleLogout}>LogOut</Button>
    </div>
  )
}

export default Home
