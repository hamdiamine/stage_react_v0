import { styled } from '@mui/system'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useFormik } from 'formik'
import Paper from '@mui/material/Paper';
import { fetchListModeleByMarqueAndOrg } from 'app/core/store/parametrage/ModeleAction'
import ActionsMenu from 'app/core/components/generic/actionsMenu/ActionsMenu'
import { saveArticle } from 'app/core/store/parametrage/ArticleAction'
import { articleActions } from 'app/core/store/parametrage/ArticleSlice'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));

const DetailsArticle = () => {
    const dispatch = useDispatch()
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const selectedArticle = useSelector((state) => state.article.selectedArticle)
    const activeEdition = useSelector((state) => state.article.activeEdition)
    const listShortFamille = useSelector((state) => state.famille.listShortFamille)
    const listMarque = useSelector((state) => state.modele.listVocMarque)
    const listModele = useSelector((state) => state.modele.listModele)
    const listMethodeAmort = useSelector((state) => state.famille.listVocMethodeAmort)
    const listTypeCaract = useSelector((state) => state.caracteristiqueImmo.listVocTypeCaract)
    const listArticle = useSelector((state) => state.article.listArticle)
    const listCompteCpt = useSelector((state) => state.compteComptable.listComptesComptableActifs)
    const validate = values => {
        const errors = {};

        if (!values.code) {
            errors.code = 'Obligatoire';
        } else if (values.code.length > 30) {
            errors.code = 'Doit contenir au plus 30 caractères';
        } else {
            const idx = listArticle.findIndex(a => a.code === values.code && a.id !== values.id)
            if (idx >= 0) {
                errors.code = 'Code existant';
            }
        }

        if (!values.libelle) {
            errors.libelle = 'Obligatoire';
        } else if (values.libelle.length > 200) {
            errors.libelle = 'Doit contenir au plus 200 caractères';
        }

        if (!values.famille || !values.famille.id || values.famille.id <= 0) {
            errors.famille = 'Obligatoire';
        }

        return errors;
    }
    const submit = (values) => {
        dispatch(saveArticle(values, listArticle))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedArticle,
        validate,
        onSubmit: submit,

    })
    const handleCancel = () => {
        dispatch(articleActions.setSelectedArticle({ selectedArticle: {} }))
    }
    return (
        <>
            <ActionsMenu
                key="01"
                titre="Article"
                afficheBtnMenu="1"
                withSave="1"
                withCancel="1"
                selectedItem={activeEdition ? {} : undefined}
                onSave={formik.handleSubmit}
                onCancel={handleCancel}
            />
            <Item>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listShortFamille}
                            style={{ width: "94%" }}
                            id="famille"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("famille", value)
                            }}
                            value={formik.values.famille ? formik.values.famille : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.famille}
                                    helperText={formik.errors.famille}
                                    label="Famille"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!activeEdition} autoFocus id="code" label="Code *" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.code ? formik.values.code : ''} error={formik.errors.code} helperText={formik.errors.code} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!activeEdition} id="libelle" label="Libelle *" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.libelle ? formik.values.libelle : ''} error={formik.errors.libelle} helperText={formik.errors.libelle} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listMarque}
                            style={{ width: "94%" }}
                            id="marque"
                            size="small"
                            onChange={(e, value) => {
                                if (value && value != null) {
                                    dispatch(fetchListModeleByMarqueAndOrg(value.id, currentOrganisation.id))
                                }
                                formik.setFieldValue("marque", value)
                            }}
                            value={formik.values.marque ? formik.values.marque : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.marque}
                                    helperText={formik.errors.marque}
                                    label="Marque"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listModele}
                            style={{ width: "94%" }}
                            id="modele"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("modele", value)
                            }}
                            value={formik.values.modele ? formik.values.modele : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.modele}
                                    helperText={formik.errors.modele}
                                    label="Modèle"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!activeEdition} type="number" id="dureeVie" label="Durée de vie" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.dureeVie ? formik.values.dureeVie : ''} error={formik.errors.dureeVie} helperText={formik.errors.dureeVie} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControlLabel control={<Checkbox disabled={!activeEdition} id="actif" onChange={formik.handleChange}
                            checked={formik.values.actif} />} label="Actif *" />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listTypeCaract}
                            style={{ width: "94%" }}
                            id="type"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("type", value)
                            }}
                            value={formik.values.type ? formik.values.type : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Type"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listMethodeAmort}
                            style={{ width: "94%" }}
                            id="methodeAmortissement"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("methodeAmortissement", value)
                            }}
                            value={formik.values.methodeAmortissement ? formik.values.methodeAmortissement : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.methodeAmortissement}
                                    helperText={formik.errors.methodeAmortissement}
                                    label="Méthode d'amortissement"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!activeEdition} type="number" id="tauxAmortissement" label="Taux d'amortissement" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.tauxAmortissement ? formik.values.tauxAmortissement : ''} error={formik.errors.tauxAmortissement} helperText={formik.errors.tauxAmortissement} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="compteAchat"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("compteAchat", value)
                            }}
                            value={formik.values.compteAchat ? formik.values.compteAchat : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.compteAchat}
                                    helperText={formik.errors.compteAchat}
                                    label="Compte d'achat"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="compteAmortissement"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("compteAmortissement", value)
                            }}
                            value={formik.values.compteAmortissement ? formik.values.compteAmortissement : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.compteAmortissement}
                                    helperText={formik.errors.compteAmortissement}
                                    label="Compte d'amortissement "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="compteDotation"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("compteDotation", value)
                            }}
                            value={formik.values.compteDotation ? formik.values.compteDotation : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.compteDotation}
                                    helperText={formik.errors.compteDotation}
                                    label="Compte dotation "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="compteProfit"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("compteProfit", value)
                            }}
                            value={formik.values.compteProfit ? formik.values.compteProfit : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.compteProfit}
                                    helperText={formik.errors.compteProfit}
                                    label="Compte profit "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="comptePerte"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("comptePerte", value)
                            }}
                            value={formik.values.comptePerte ? formik.values.comptePerte : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.comptePerte}
                                    helperText={formik.errors.comptePerte}
                                    label="Compte de perte "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="compteReserve"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("compteReserve", value)
                            }}
                            value={formik.values.compteReserve ? formik.values.compteReserve : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Compte de reserve "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="compteVente"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("compteVente", value)
                            }}
                            value={formik.values.compteVente ? formik.values.compteVente : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Compte de perte "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!activeEdition}
                            options={listCompteCpt}
                            style={{ width: "94%" }}
                            id="imputationAnalytique"
                            size="small"
                            onChange={(e, value) => {
                                formik.setFieldValue("imputationAnalytique", value)
                            }}
                            value={formik.values.imputationAnalytique ? formik.values.imputationAnalytique : {}}
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.code + '-' + option.libelle : ""}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Imputation analitique "
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                </Grid>
            </Item>
        </>
    )
}

export default DetailsArticle