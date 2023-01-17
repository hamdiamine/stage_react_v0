import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Item from '../../generic/item/Item'
import { useDispatch, useSelector } from 'react-redux'
import CustomDatePicker from '../../generic/customDatePicker/CustomDatePicker'
import { useFormik } from 'formik'
import ActionsMenu from '../../generic/actionsMenu/ActionsMenu'
import { immobilisationActions } from 'app/core/store/priseencharge/ImmobilisationSlice'
import { fetchListVocabulairePourGeneralites } from 'app/core/store/parametrage/VocabulaireAction'
import { updateGeneralites } from 'app/core/store/priseencharge/ImmobilisationAction'

const Generalites = () => {
    const dispatch = useDispatch()
    const activeModif = useSelector((state) => state.immobilisation.activeModif)
    const selectedImmobilisation = useSelector((state) => state.immobilisation.selectedImmobilisation)
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const listMethodeFiscal = useSelector((state) => state.immobilisation.listMethodeFiscal)
    const listOrigine = useSelector((state) => state.immobilisation.listOrigine)
    const listSource = useSelector((state) => state.immobilisation.listSource)
    const listTypeCaracteristique = useSelector((state) => state.immobilisation.listTypeCaracteristique)
    const listEtatExploit = useSelector((state) => state.immobilisation.listEtatExploit)
    const listNatureProp = useSelector((state) => state.immobilisation.listNatureProp)
    const listNatureUtil = useSelector((state) => state.immobilisation.listNatureUtil)
    const listPeriodInterv = useSelector((state) => state.immobilisation.listPeriodInterv)

    const validate = values => {
        const errors = {};
        if (!values.numInventaire || values.numInventaire === null) {
            errors.numInventaire = 'Obligatoire';
        } else if (values.numInventaire !== null && values.numInventaire.length > 30) {
            errors.numInventaire = 'Doit contenir au plus 30 caractères'
        }

        if (!values.tag || values.tag === null) {
            errors.tag = 'Obligatoire'
        }

        if (values.immatriculation && values.immatriculation !== null && values.immatriculation.length > 50) {
            errors.immatriculation = 'Doit contenir au plus 50 caractères'
        }

        if (values.nSerie && values.nSerie !== null && values.nSerie.length > 50) {
            errors.nSerie = 'Doit contenir au plus 50 caractères'
        }

        if (values.codeABarre && values.codeABarre !== null && values.codeABarre.length > 50) {
            errors.codeABarre = 'Doit contenir au plus 50 caractères'
        }

        if (!values.designation || values.designation === null) {
            errors.designation = 'Obligatoire';
        } else if (values.designation.length > 200) {
            errors.designation = 'Doit contenir au plus 200 caractères'
        }

        if (values.commentaire && values.commentaire !== null && values.commentaire.length > 400) {
            errors.commentaire = 'Doit contenir au plus 400 caractères'
        }

        if (!values.dateAcquisition) {
            errors.dateAcquisition = 'Obligatoire'
        }

        if (!values.dateMiseExploi || values.dateMiseExploi === null) {
            errors.dateMiseExploi = 'Obligatoire'
        }

        if (!values.valeurAcquisition || values.valeurAcquisition === null) {
            errors.valeurAcquisition = 'Obligatoire'
        } else if (values.valeurAcquisition <= 0) {
            errors.valeurAcquisition = 'Valeur incorrecte'
        }

        if (!values.methodeFiscal || !values.methodeFiscal.id || values.methodeFiscal.id <= 0) {
            errors.methodeFiscal = 'Obligatoire'
        }

        if (!values.tauxAmort || values.tauxAmort === null) {
            errors.tauxAmort = 'Obligatoire'
        } else if (values.tauxAmort < 0 || values.tauxAmort > 100) {
            errors.tauxAmort = 'Valeur incorrecte'
        }

        return errors;
    }
    const submit = (values) => {
        values.organisation = currentOrganisation
        dispatch(updateGeneralites(values, currentOrganisation.id))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedImmobilisation,
        validate: validate,
        onSubmit: submit,
    })

    const onModifHandle = () => {
        if (listMethodeFiscal.length === 0) {
            dispatch(fetchListVocabulairePourGeneralites(currentOrganisation.id))
        }
        dispatch(immobilisationActions.setActiveModif({ activeModif: true }))
    }

    const onCancelChangeHandle = () => {
        dispatch(immobilisationActions.setActiveModif({ activeModif: false }))
    }



    return (
        <Item>
            <ActionsMenu
                key="01"
                titre=""
                afficheBtnMenu="1"
                withModif={(!activeModif && selectedImmobilisation.id) ? "1" : undefined}
                withSave={activeModif ? "1" : undefined}
                withCancel={activeModif ? "1" : undefined}
                selectedItem={selectedImmobilisation.id ? selectedImmobilisation : undefined}
                openModif={onModifHandle}
                onSave={formik.handleSubmit}
                onCancel={onCancelChangeHandle}
            ></ActionsMenu>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField fullWidth disabled={!activeModif} id="numInventaire" label="N° inventaire *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.numInventaire ? formik.values.numInventaire : ''} error={formik.errors.numInventaire} helperText={formik.errors.numInventaire} />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField fullWidth disabled={!activeModif} id="tag" label="TAG *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.tag ? formik.values.tag : ''} error={formik.errors.tag} helperText={formik.errors.tag} />
                </Grid>
                <Grid item lg={4} md={4} sm={12} xs={12}>
                    <TextField fullWidth disabled={!activeModif} id="codeABarre" label="Code à barre" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.codeABarre ? formik.values.codeABarre : ''} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField fullWidth disabled={!activeModif} id="immatriculation" label="Immatriculation" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.immatriculation ? formik.values.immatriculation : ''} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField fullWidth disabled={!activeModif} id="nSerie" label="N° serie" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.nSerie ? formik.values.nSerie : ''} />
                </Grid>
                
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField disabled={!activeModif} fullWidth id="designation" label="Désignation *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.designation ? formik.values.designation : ''} error={formik.errors.designation} helperText={formik.errors.designation} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField disabled={!activeModif} fullWidth id="commentaire" label="Commentaire" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.commentaire ? formik.values.commentaire : ''} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateAcquisition"
                        locale="fr"
                        disableFuture="true"
                        label="Date acquisition *"
                        disabled={!activeModif}
                        onChange={(value) => {
                            formik.setFieldValue("dateAcquisition", value)
                        }}
                        value={formik.values.dateAcquisition ? formik.values.dateAcquisition : null}
                        error={formik.errors.dateAcquisition}
                        helperText={formik.errors.dateAcquisition}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateMiseExploi"
                        locale="fr"
                        disableFuture="true"
                        label="Mise en exploitation *"
                        disabled={!activeModif}
                        onChange={(value) => {
                            formik.setFieldValue("dateMiseExploi", value)
                        }}
                        value={formik.values.dateMiseExploi ? formik.values.dateMiseExploi : null}
                        error={formik.errors.dateMiseExploi}
                        helperText={formik.errors.dateMiseExploi}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={0} xs={0}></Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled={!activeModif} type="number" id="valeurAcquisition" label="Valeur d'acquisition *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.valeurAcquisition ? formik.values.valeurAcquisition : 0} error={formik.errors.valeurAcquisition} helperText={formik.errors.valeurAcquisition} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled={!activeModif}
                        options={listMethodeFiscal}
                        style={{ width: "94%" }}
                        id="methodeFiscal"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("methodeFiscal", value)
                        }}
                        value={formik.values.methodeFiscal ? formik.values.methodeFiscal : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Méthode fiscale *"
                                error={formik.errors.methodeFiscal}
                                helperText={formik.errors.methodeFiscal}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled={!activeModif} type="number" id="tauxAmort" label="Taux d'amortissement (%) *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.tauxAmort ? formik.values.tauxAmort : 0} error={formik.errors.tauxAmort} helperText={formik.errors.tauxAmort} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled type="number" id="valeurResiduel" label="Valeur résiduel" variant="outlined" size="small"
                        value={formik.values.valeurResiduel ? formik.values.tauxAmort : 0} />

                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled={!activeModif}
                        options={listOrigine}
                        style={{ width: "94%" }}
                        id="origine"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("origine", value)
                        }}
                        value={formik.values.origine ? formik.values.origine : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Origine"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled={!activeModif}
                        options={listSource}
                        style={{ width: "94%" }}
                        id="source"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("source", value)
                        }}
                        value={formik.values.source ? formik.values.source : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Source"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled
                        options={listTypeCaracteristique}
                        style={{ width: "94%" }}
                        id="typeCaract"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("typeCaract", value)
                        }}
                        value={formik.values.typeCaract ? formik.values.typeCaract : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Type caractéristique"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled
                        options={listEtatExploit}
                        style={{ width: "94%" }}
                        id="etat"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("etat", value)
                        }}
                        value={formik.values.etat ? formik.values.etat : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Etat *"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled
                        options={[]}
                        style={{ width: "94%" }}
                        id="marque"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("marque", value)
                        }}
                        value={formik.values.marque ? formik.values.marque : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Marque *"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled
                        options={[]}
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
                                label="Modèle *"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled={!activeModif}
                        options={listNatureProp}
                        style={{ width: "94%" }}
                        id="natureProp"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("natureProp", value)
                        }}
                        value={formik.values.natureProp ? formik.values.natureProp : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nature de la propriété"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled={!activeModif}
                        options={listNatureUtil}
                        style={{ width: "94%" }}
                        id="natureImmo"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("natureImmo", value)
                        }}
                        value={formik.values.natureImmo ? formik.values.natureImmo : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Nature d'utilisation"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateDebutgarantie"
                        locale="fr"
                        disableFuture="true"
                        label="Date début garantie"
                        disabled={!activeModif}
                        onChange={(value) => {
                            formik.setFieldValue("dateDebutgarantie", value)
                        }}
                        value={formik.values.dateDebutgarantie ? formik.values.dateDebutgarantie : null}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateFinGarantie"
                        locale="fr"
                        label="Date fin garantie"
                        disabled={!activeModif}
                        onChange={(value) => {
                            formik.setFieldValue("dateFinGarantie", value)
                        }}
                        value={formik.values.dateFinGarantie ? formik.values.dateFinGarantie : null}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={0} xs={0}></Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateDebutLicence"
                        locale="fr"
                        disableFuture="true"
                        label="Date début licence"
                        disabled={!activeModif}
                        onChange={(value) => {
                            formik.setFieldValue("dateDebutLicence", value)
                        }}
                        value={formik.values.dateDebutLicence ? formik.values.dateDebutLicence : null}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateFinLicence"
                        locale="fr"
                        label="Date fin licence"
                        disabled={!activeModif}
                        onChange={(value) => {
                            formik.setFieldValue("dateFinLicence", value)
                        }}
                        value={formik.values.dateFinLicence ? formik.values.dateFinLicence : null}
                    />
                </Grid>
                <Grid item lg={6} md={6} sm={0} xs={0}></Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        disabled={!activeModif}
                        options={listPeriodInterv}
                        style={{ width: "94%" }}
                        id="periodInterv"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("periodInterv", value)
                        }}
                        value={formik.values.periodInterv ? formik.values.periodInterv : {}}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Periodicité intervention"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={9} md={9} sm={0} xs={0}></Grid>
            </Grid>
        </Item >
    )
}

export default Generalites