"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import app from "@/firebaseconfig";
import { getAuth } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";

const Cards = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.push("/Home");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/Home");
    } catch (error) {
      console.log("Error signing in with Google:", error.message);
    }
  };

  if (!hasMounted) return null;

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D0F0FD",
      }}
    >
      <Card
        sx={{
          maxWidth: 700,
          width: "100%",
          height: 400,
          display: "flex",
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {!user && (
          <>
            <Box
              sx={{
                width: "60%",
                backgroundColor: "#81D4FA",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
              }}
            >
              <Typography sx={{ mb: 2, fontSize: 28, fontWeight: "bold" }}>
                Sign-In
              </Typography>

              <Stack>
                <Button
                  variant="contained"
                  onClick={signInWithGoogle}
                  disableRipple
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": { backgroundColor: "#f0f0f0" },
                  }}
                  startIcon={<FcGoogle />}
                >
                  Sign-In with google
                </Button>
              </Stack>
            </Box>
            <Box
              sx={{
                width: "40%",
                backgroundImage: 'url("/images/googlewithphone.png")',
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderTopRightRadius: 16,
                borderBottomRightRadius: 16,
              }}
            />
          </>
        )}
      </Card>
    </Box>
  );
};

export default Cards;
