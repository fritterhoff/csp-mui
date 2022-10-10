import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import React from "react";
import Link from "next/link";


export default function ButtonAppBar() {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography component="div" sx={{ flexGrow: 1 }}>
                    <Link href="/">
                        <Button color="inherit">Home</Button>
                    </Link>
                    <Link key="grid" href="/grid"><Button key="grid" color="inherit">View Data</Button></Link>
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
