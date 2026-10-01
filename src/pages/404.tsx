import Link from "next/link";
import Head from "next/head";
import { Box, Typography, Button } from "@mui/material";

export default function NotFound() {
  return (
    <Box sx={{ py: 8 }}>
      <Head>
        <title>Halaman tidak ditemukan | DevTools</title>
      </Head>
      <Typography variant="h1" component="h1">
        Halaman tidak ditemukan.
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
        Pilih alat dari navigasi atau buka JSON Formatter.
      </Typography>
      <Button variant="contained" component={Link} href="/">
        Buka JSON Formatter
      </Button>
    </Box>
  );
}
