import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { Grid } from '@mui/material'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import Item from '../../generic/item/Item'
const ComptesComptable = () => {

    return (
        <Item>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="compteAchat"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte d'achat"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="compteAmortissement"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte d'amortissement"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="compteDotation"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte dotation"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="compteProfit"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte profit"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="comptePerte"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte perte"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="compteVente"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte vente"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="compteReserve"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Compte reserve"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <Autocomplete
                        style={{ width: "94%" }}
                        id="imputationAnalytique"
                        size="small"
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Imputation analytique"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
            </Grid>
        </Item>
    )
}

export default ComptesComptable