import { Fragment } from "react";
import { styled, useTheme } from '@mui/system'
import { Grid, Card } from '@mui/material'



const ContentBox = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
}))
const StyledCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '24px !important',
    background: theme.palette.background.paper,
    [theme.breakpoints.down('sm')]: {
        padding: '16px !important',
    },
}))

const IMG = styled('img')(() => ({
    width: '70%',
    margin:'auto',
    display: 'block'
}))

const Home = () => {
    return (

        <IMG src="/assets/images/assets_home.jpg" alt="" />

    )
}

export default Home;