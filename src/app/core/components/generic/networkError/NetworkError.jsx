import React from 'react'
import { Box, styled } from '@mui/system'
import { CircularProgress, Grid } from '@mui/material'

const StyledLoading = styled('div')(() => ({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
        width: 'auto',
        height: '256px',
    },
    "& .circleProgress": {
        position: 'absolute',
        left: -7,
        right: 0,
        top: 'calc(50% - 25px)',
    }
}))

const NetworkError = () => {

    return (
        <StyledLoading>
            <Box position="relative">
                <Grid container spacing={2} direction="column" alignItems="center" justifyContent="center">
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <img src="/assets/images/network_error.jpg" alt="" />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <b>Problème de connexion avec le serveur</b>
                    </Grid>
                </Grid>
            </Box>
        </StyledLoading >
    )
}

export default NetworkError