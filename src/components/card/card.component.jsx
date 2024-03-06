import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import axios from 'axios';
import { ListItem, ListItemText } from '@mui/material';

function OneCard({ monsters }) {
  const { terrain, name, climate, population, residents } = monsters;
  const [residentData, setResidentData] = useState([]);
  const CARD_PROPERTY = {
    borderRadius: 3,
    boxShadow: 0,
    height: '400px',
    display: 'flex',
    flexDirection: 'column',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#f0f0f0',
    },
  };

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        const residentPromises = residents.map(async residentUrl => {
          const response = await axios.get(residentUrl);
          return response.data;
        });
        const residentResults = await Promise.all(residentPromises);
        setResidentData(residentResults);
      } catch (error) {
        console.error('Error fetching resident data:', error);
      }
    };

    if (residents && residents.length > 0) {
      fetchResidentData();
    }
  }, [residents]);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card sx={CARD_PROPERTY}>
        <CardHeader
          sx={{ p: 1 }}
          title={
            <Link
              href='#'
              variant='h5'
              color='black'
              underline='none'
              sx={{ fontWeight: 'large' }}
            >
              {name}
            </Link>
          }
          subheader={climate}
        />
        <CardContent sx={{ p: 2, flexGrow: 1, overflowY: 'auto' }}>
          <Typography variant='body1' color='black'>
            Population: {population}
          </Typography>
          <Typography variant='body1' color='black' sx={{ mb: 2 }}>
            Terrain: {terrain}
          </Typography>
          <Typography variant='body1' color='black'>
            Resident Data:
          </Typography>
          <ul>
            {residentData.map((resident, index) => (
              <ListItem key={index} alignItems='flex-start'>
                <ListItemText
                  primary={resident.name}
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: 'inline' }}
                        component='span'
                        variant='body2'
                        color='text.primary'
                      >
                        Height: {resident.height}, Mass: {resident.mass},
                        Gender: {resident.gender}
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default OneCard;
