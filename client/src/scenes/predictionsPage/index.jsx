import React, { useEffect, useState } from 'react'
import SalesLineChart from '../../components/SalesLineChart';
import { Box, CircularProgress, TextField, Typography } from '@mui/material';
import Navbar from '../../scenes/navbar';

const PredictionPage = () => {
    const [monthlySales, setMonthlySales] = useState([]);
    const [year, setYear] = useState(2000);
    const [loading, setLoading] = useState(true);

    const getPredictionsMonthly = async () => {
        try {
            setLoading(true); // Start loading
            const monthlySales = {
                Laptop: [],
                Coffee_cup: [],
                Wireless_Headphones: [],
                Gaming_console: []
            };

            for (let month = 0; month < 12; month++) {
                const response = await fetch(`https://sparkathon24.pankajkush.club/predictMonthly?month=${month + 1}&year=${year}`, {
                    method: "GET",
                });

                const data = await response.json();

                const monthName = new Date(year, month).toLocaleString('default', { month: 'short' });

                monthlySales.Laptop.push({ x: monthName, y: data.P1 });
                monthlySales.Coffee_cup.push({ x: monthName, y: data.P2 });
                monthlySales.Wireless_Headphones.push({ x: monthName, y: data.P3 });
                monthlySales.Gaming_console.push({ x: monthName, y: data.P4 });
            }

            const formattedData = Object.keys(monthlySales).map(product => ({
                id: product,
                data: monthlySales[product]
            }));

            setMonthlySales(formattedData);
            setLoading(false); // End loading
        } catch (error) {
            console.error("Error fetching predictions", error);
            setLoading(false); // End loading even if there's an error
        }
    };

    useEffect(() => {
        getPredictionsMonthly();
    }, [year]);

    return (
        <Box height={"500px"}>
            <Navbar />
            <Box sx={{ textAlign: 'center' }} mt={4}>
                <Typography variant="h1" sx={{ fontFamily: 'monospace', fontWeight: 'bold', color: 'white', fontSize: '3rem' }}>
                    Sales Prediction System
                </Typography>
                <TextField
                    label="Year for Prediction"
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                    sx={{ marginLeft: '1rem', marginTop: '1rem' }}
                />
            </Box>

            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : (
                <SalesLineChart data={monthlySales} />
            )}
        </Box>
    )
}

export default PredictionPage;
