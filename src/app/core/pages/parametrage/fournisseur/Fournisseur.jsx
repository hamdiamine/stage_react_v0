import React, { useEffect, useRef } from 'react'
import { Breadcrumb, SimpleCard } from 'app/template/components'
import { styled } from '@mui/system'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import _ from 'lodash'
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux'
import { Grid } from '@mui/material'
import ActionsMenu from 'app/core/components/generic/actionsMenu/ActionsMenu'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { fournisseurActions } from 'app/core/store/parametrage/FournisseurSlice'
import SearchFournisseur from 'app/core/components/parametrage/searchFournisseur/SearchFournisseur'
import { Dialog } from 'primereact/dialog';
import { fetchListVocByCodeTypeAndOrg } from 'app/core/store/parametrage/VocabulaireAction'
import { codeVocFormeJurd, codeVocPays, codeVocTypeIdent } from 'app/core/util/Constant'
import { useFormik } from 'formik'
import { deleteFournisseur, saveFournisseur } from 'app/core/store/parametrage/FournisseurAction'
import Container from 'app/core/components/generic/container/Container'
import Item from 'app/core/components/generic/item/Item'


const Fournisseur = () => {
    const dispatch = useDispatch()

    const currentOrganisation = useSelector(
        (state) => state.organisation.currentOrganisation
    )

    useEffect(() => {
        dispatch(fetchListVocByCodeTypeAndOrg(codeVocPays, currentOrganisation.id))
        dispatch(fetchListVocByCodeTypeAndOrg(codeVocFormeJurd, currentOrganisation.id))
        dispatch(fetchListVocByCodeTypeAndOrg(codeVocTypeIdent, currentOrganisation.id))
    }, [dispatch, currentOrganisation.id])

    const listVocPays = useSelector(
        (state) => state.fournisseur.listVocPays
    )
    const listVocFormeJurd = useSelector(
        (state) => state.fournisseur.listVocFormeJurd
    )
    const listVocTypeIdent = useSelector(
        (state) => state.fournisseur.listVocTypeIdent
    )
    const selectedFournisseur = useSelector(
        (state) => state.fournisseur.selectedFournisseur
    )
    const displaySearchPopup = useSelector(
        (state) => state.fournisseur.displaySearchPopup
    )
    const activerModif = useSelector(
        (state) => state.fournisseur.activerModif
    )

    const validate = values => {
        const errors = {};

        if (!values.code) {
            errors.code = 'Obligatoire';
        } else if (values.code.length > 30) {
            errors.code = 'Doit contenir au plus 30 caractères';
        }

        if (!values.raisonSocial) {
            errors.raisonSocial = 'Obligatoire';
        } else if (values.raisonSocial.length > 400) {
            errors.raisonSocial = 'Doit contenir au plus 200 caractères';
        }

        if (!values.identite) {
            errors.identite = 'Obligatoire';
        } else if (values.identite.length > 30) {
            errors.identite = 'Doit contenir au plus 30 caractères';
        }

        if (values.registreCommerce && values.registreCommerce.length > 30) {
            errors.registreCommerce = 'Doit contenir au plus 30 caractères';
        }

        if (!values.adresse) {
            errors.adresse = 'Obligatoire';
        } else if (values.adresse.length > 800) {
            errors.adresse = 'Doit contenir au plus 800 caractères';
        }

        if (!values.codePostal) {
            errors.codePostal = 'Obligatoire';
        } else if (values.codePostal.length > 10) {
            errors.codePostal = 'Doit contenir au plus 10 caractères';
        }

        if (!values.ville) {
            errors.ville = 'Obligatoire';
        } else if (values.ville.length > 20) {
            errors.ville = 'Doit contenir au plus 20 caractères';
        }

        if (values.telephone && values.telephone.length > 30) {
            errors.telephone = 'Doit contenir au plus 30 caractères';
        }

        if (values.fax && values.fax.length > 30) {
            errors.fax = 'Doit contenir au plus 30 caractères';
        }

        if (values.mail && values.mail.length > 30) {
            errors.mail = 'Doit contenir au plus 30 caractères';
        }

        if (values.siteWeb && values.siteWeb.length > 200) {
            errors.siteWeb = 'Doit contenir au plus 200 caractères';
        }

        if (!values.typeIdentite || !values.typeIdentite.id || values.typeIdentite.id <= 0) {
            errors.typeIdentite = 'Obligatoire';
        }

        if (!values.pays || !values.pays.id || values.pays.id <= 0) {
            errors.pays = 'Obligatoire';
        }

        return errors;
    }
    const submit = (values) => {
        const fournisseurToSave = { ...values, organisation: currentOrganisation, formeJuridique: (values.formeJuridique && values.formeJuridique !== null && values.formeJuridique.id) ? values.formeJuridique : null }
        dispatch(saveFournisseur(fournisseurToSave))
        dispatch(fournisseurActions.setActiverModif({ activerModif: false }))
        if (fournisseurToSave.id > 0) {
            dispatch(fournisseurActions.setListFournisseurAfterModify({ ModifiedFournisseur: fournisseurToSave }))
        }
    }
    const onCancel = () => {
        if (selectedFournisseur.id < 0) {
            dispatch(fournisseurActions.setResetedFournisseur())
        } else {
            dispatch(fournisseurActions.setSelectedFournisseur({ selectedFournisseur: selectedFournisseur }))
        }
        dispatch(fournisseurActions.setActiverModif({ activerModif: false }))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedFournisseur,
        validate,
        onSubmit: submit,

    })


    const onOpenPopup = () => {
        dispatch(fournisseurActions.setDisplaySearchPopup({ displaySearchPopup: true }))
    }

    const onHidePopup = () => {
        dispatch(fournisseurActions.setDisplaySearchPopup({ displaySearchPopup: false }))
    }

    const onNewFournisseur = () => {
        dispatch(fournisseurActions.setNewFournisseur())
        dispatch(fournisseurActions.setActiverModif({ activerModif: true }))
    }

    const onActivateModifFournisseur = () => {
        dispatch(fournisseurActions.setActiverModif({ activerModif: true }))
    }

    const onDeleteFournisseur = () => {
        const deletedFournisseur = { ...selectedFournisseur }
        dispatch(deleteFournisseur(selectedFournisseur.id))
        dispatch(fournisseurActions.setResetedFournisseur())
        dispatch(fournisseurActions.setActiverModif({ activerModif: false }))
        dispatch(fournisseurActions.setListFournisseurAfterDelete({ deletedFournisseur: deletedFournisseur }))
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Paramétrage', path: '/parametrage' },
                        { name: 'Fournisseurs' },
                    ]}
                />
            </div>
            <SimpleCard>
                <ActionsMenu
                    key="01"
                    titre=""
                    withAdd={!activerModif && "1"}
                    afficheBtnMenu="1"
                    withDelete={(!activerModif && selectedFournisseur.id > 0) && "1"}
                    withSave={activerModif && "1"}
                    withCancel={activerModif && "1"}
                    withSearch={!activerModif && "1"}
                    withModif={(!activerModif && selectedFournisseur.id > 0) && "1"}
                    openSearch={onOpenPopup}
                    openNew={onNewFournisseur}
                    openModif={onActivateModifFournisseur}
                    confirmDelete={onDeleteFournisseur}
                    onSave={formik.handleSubmit}
                    onCancel={onCancel}
                    selectedItem={selectedFournisseur}
                    deleteMessage="Voulez vous supprimer le fournisseur sélectionné?"
                ></ActionsMenu>
                <Item>
                    <Grid container rowSpacing={2} columnSpacing={2}>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField autoFocus id="code" label="Code *" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.code} error={formik.errors.code} helperText={formik.errors.code} />
                        </Grid>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <TextField fullWidth id="raisonSocial" label="Nom/Raison social *" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.raisonSocial} error={formik.errors.raisonSocial} helperText={formik.errors.raisonSocial} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Autocomplete
                                options={listVocTypeIdent}
                                style={{ width: "94%" }}
                                id="typeIdentite"
                                size="small"
                                disabled={!activerModif}
                                onChange={(e, value) => {
                                    formik.setFieldValue("typeIdentite", value)
                                }}
                                value={formik.values.typeIdentite}
                                getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={formik.errors.typeIdentite}
                                        helperText={formik.errors.typeIdentite}
                                        label="Type identifiant *"
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="identite" label="Identifiant *" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.identite} error={formik.errors.identite} helperText={formik.errors.identite} />
                        </Grid>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <FormControlLabel control={<Checkbox disabled={!activerModif} id="actif" onChange={formik.handleChange}
                                checked={formik.values.actif} />} label="Actif *" />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Autocomplete
                                options={listVocFormeJurd}
                                style={{ width: "94%" }}
                                id="formeJuridique"
                                size="small"
                                disabled={!activerModif}
                                onChange={(e, value) => {
                                    formik.setFieldValue("formeJuridique", value)
                                }}
                                value={formik.values.formeJuridique}
                                getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={formik.errors.formeJuridique}
                                        helperText={formik.errors.formeJuridique}
                                        label="Forme juridique"
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                            />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="registreCommerce" label="Registre de commerce" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.registreCommerce} error={formik.errors.registreCommerce} helperText={formik.errors.registreCommerce} />
                        </Grid>
                        <Grid item lg={5} md={5} sm={12} xs={12}>
                            <FormControlLabel control={<Checkbox id="estMoral" disabled={!activerModif} onChange={formik.handleChange}
                                checked={formik.values.estMoral} />} label="Personne moral *" />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <Autocomplete
                                options={listVocPays}
                                style={{ width: "94%" }}
                                id="pays"
                                size="small"
                                disabled={!activerModif}
                                onChange={(e, value) => {
                                    formik.setFieldValue("pays", value)
                                }}
                                value={formik.values.pays}
                                getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        error={formik.errors.pays}
                                        helperText={formik.errors.pays}
                                        label="Pays *"
                                    />
                                )}
                                isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                            />
                        </Grid>
                        <Grid item lg={8} md={8} sm={12} xs={12}>
                            <TextField fullWidth id="adresse" label="Adresse *" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.adresse} error={formik.errors.adresse} helperText={formik.errors.adresse} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="codePostal" label="Code postal *" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.codePostal} error={formik.errors.codePostal} helperText={formik.errors.codePostal} />
                        </Grid>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <TextField id="ville" label="Ville *" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.ville} error={formik.errors.ville} helperText={formik.errors.ville} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="telephone" label="Téléphone" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.telephone} error={formik.errors.telephone} helperText={formik.errors.telephone} />
                        </Grid>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <TextField id="fax" label="Fax" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.fax} error={formik.errors.fax} helperText={formik.errors.fax} />
                        </Grid>
                        <Grid item lg={3} md={3} sm={12} xs={12}>
                            <TextField id="mail" label="E-Mail" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.mail} error={formik.errors.mail} helperText={formik.errors.mail} />
                        </Grid>
                        <Grid item lg={9} md={9} sm={12} xs={12}>
                            <TextField id="siteWeb" label="Site Web" variant="outlined" size="small" disabled={!activerModif} onChange={formik.handleChange}
                                value={formik.values.siteWeb} error={formik.errors.siteWeb} helperText={formik.errors.siteWeb} />
                        </Grid>
                    </Grid>
                </Item>
            </SimpleCard>
            <Dialog header="Recherche fournisseur" maximizable visible={displaySearchPopup} onHide={onHidePopup} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }}>
                <SearchFournisseur />
            </Dialog>
        </Container >
    )
}

export default Fournisseur