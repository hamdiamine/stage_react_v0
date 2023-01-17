import {
    Card,
    Grid,
    Button,
    CircularProgress,
    Checkbox,
    FormControlLabel,
} from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import { Span } from '../../../../template/components/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import TextField from '@mui/material/TextField'
import { authentification } from 'app/core/store/securite/UtilisateurAction'
import UINotification from 'app/core/components/generic/uiNotification/UINotification'
import { utilisateurActions } from 'app/core/store/securite/UtilisateurSlice'

const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 800,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector((state) => state.ui.loading)
    const isAuthentified = useSelector((state)=>state.utilisateur.isAuthentified)
    useEffect(() => {
        dispatch(utilisateurActions.setLogoutParam())
    }, [])

    useEffect(() => {
        if(isAuthentified){
            navigate('/home')
        }else{
            const token = localStorage.getItem('accessToken')
            if(token && token!==null){
                dispatch(utilisateurActions.setUtilisateurFromStorage())
                navigate('/home')
            }
        }
    }, [isAuthentified])

    const { palette } = useTheme()
    const textPrimary = palette.primary.main

    const validate = values => {
        const errors = {};
        if (!values.login || values.login === null) {
            errors.login = 'Obligatoire';
        }

        if (!values.mdp || values.mdp === null) {
            errors.mdp = 'Obligatoire';
        }

        return errors;
    }
    const submit = (values) => {
        try {
            dispatch(authentification(values))
        } catch (error) {

        }

    }
    const formik = useFormik({
        initialValues: { login: null, mdp: null },
        validate: validate,
        onSubmit: submit,
    })

    return (
        <>
            <UINotification />
            <JWTRoot>
                <Card className="card">
                    <Grid container>
                        <Grid item lg={5} md={5} sm={5} xs={12}>
                            <JustifyBox p={4} height="100%">
                                <IMG
                                    src="/assets/images/illustrations/dreamer.svg"
                                    alt=""
                                />
                            </JustifyBox>
                        </Grid>
                        <Grid item lg={7} md={7} sm={7} xs={12}>
                            <ContentBox>
                                <Grid container rowSpacing={2} columnSpacing={2}>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField fullWidth id="login" label="Login *" variant="outlined" size="small" onChange={formik.handleChange}
                                            value={formik.values.login ? formik.values.login : null} error={formik.errors.login} helperText={formik.errors.login} />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <TextField fullWidth type="password" id="mdp" label="Mot de passe *" variant="outlined" size="small" onChange={formik.handleChange}
                                            value={formik.values.mdp ? formik.values.mdp : null} error={formik.errors.mdp} helperText={formik.errors.mdp} />
                                    </Grid>
                                    <Grid item lg={12} md={12} sm={12} xs={12}>
                                        <FormControlLabel
                                            sx={{ mb: '12px', maxWidth: 288 }}
                                            name="agreement"
                                            control={
                                                <Checkbox
                                                    size="small"
                                                />
                                            }
                                            label="Remeber me"
                                        />
                                    </Grid>

                                </Grid>
                                <FlexBox mb={2} flexWrap="wrap">
                                    <Box position="relative">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            disabled={loading}
                                            type="submit"
                                            onClick={formik.handleSubmit}
                                        >
                                            S'authentifier
                                        </Button>
                                        {loading && (
                                            <StyledProgress
                                                size={24}
                                                className="buttonProgress"
                                            />
                                        )}
                                    </Box>
                                    <Span sx={{ mr: 1, ml: '20px' }}>or</Span>
                                    <Button
                                        sx={{ textTransform: 'capitalize' }}
                                        onClick={() =>
                                            navigate('/session/signup')
                                        }
                                    >
                                        S'inscrire
                                    </Button>
                                </FlexBox>
                                <Button
                                    sx={{ color: textPrimary }}
                                    onClick={() =>
                                        navigate('/session/forgot-password')
                                    }
                                >
                                    Mot de passe oublié?
                                </Button>
                            </ContentBox>
                        </Grid>
                    </Grid>
                </Card >
            </JWTRoot >
        </>

    )
}

export default Login;
