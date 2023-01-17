
import React, { useEffect, useRef } from 'react'
import { styled } from '@mui/system'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import _ from 'lodash'
import Paper from '@mui/material/Paper';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import ActionsMenu from 'app/core/components/generic/actionsMenu/ActionsMenu'
import { codeVocTypeStruct } from 'app/core/util/Constant'
import { fetchListVocByCodeTypeAndOrg } from 'app/core/store/parametrage/VocabulaireAction'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { structureActions } from 'app/core/store/parametrage/StructureSlice'
import { saveStructure } from 'app/core/store/parametrage/StructureAction'
import { uiActions } from 'app/core/store/generic/UISlice'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1)
}));
const DetailsStructure = () => {
    const dispatch = useDispatch()
    const currentOrganisation = useSelector(
        (state) => state.organisation.currentOrganisation
    )
    useEffect(() => {
        dispatch(fetchListVocByCodeTypeAndOrg(codeVocTypeStruct, currentOrganisation.id))
    }, [dispatch, currentOrganisation.id])
    const selectedStructure = useSelector((state) => state.structure.selectedStructure)
    const typesStructures = useSelector(
        (state) => state.structure.listVocTypeStruct
    )
    const listShortStructure = useSelector(
        (state) => state.structure.listShortStructure
    )
    const validate = values => {
        const errors = {}
        console.log(formik.isSubmitting)
        if (!values.type || !values.type.id || values.type.id <= 0) {
            errors.type = 'Obligatoire';
        }

        if (!values.code) {
            errors.code = 'Obligatoire';
        } else if (values.code.length > 30) {
            errors.code = 'Doit contenir 30 caractères ou moins';
        } else if (listShortStructure.findIndex(s => s.code === values.code && s.id !== values.id) >= 0) {
            errors.code = 'Ce code existe déjà';
        }

        if (!values.libelle) {
            errors.libelle = 'Obligatoire';
        } else if (values.libelle.length > 200) {
            errors.libelle = 'Doit contenir 200 caractères ou moins';
        }

        return errors;
    }
    const submit = (values) => {
        if (!(values.structureMere && values.structureMere.id > 0)) {
            values.structureMere = null
        }

        dispatch(saveStructure(values))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            id: selectedStructure.id,
            type: selectedStructure.type,
            structureMere: selectedStructure.structureMere && selectedStructure.structureMere != null ? selectedStructure.structureMere : { id: 0 },
            code: selectedStructure.code,
            libelle: selectedStructure.libelle,
            capacite: selectedStructure.capacite !== null ? selectedStructure.capacite : "",
            surface: selectedStructure.surface != null ? selectedStructure.surface : "",
            areserve: selectedStructure.areserve,
            actif: selectedStructure.actif,
            planifInv:selectedStructure.planifInv,
            organisation: selectedStructure.organisation
        },
        validate,
        onSubmit: submit
    })

    const onCancel = () => {
        dispatch(structureActions.setSelectedStructure({
            selectedStructure: {
                type: null,
                structureMere: null,
                code: '',
                libelle: '',
                capacite: null,
                surface: null,
                areserve: false,
                actif: false,
                planifInv:false
            }
        }))
    }
    return (
        <>
            <ActionsMenu
                key="02"
                titre="Détails de la structure"
                withSave="1"
                afficheBtnMenu="1"
                withCancel="1"
                selectedItem={selectedStructure.id ? selectedStructure : undefined}
                onSave={formik.handleSubmit}
                onCancel={onCancel}
                deleteMessage="fghgfhfgh"
            />
            <Item>
                <Grid container rowSpacing={2} columnSpacing={2}>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!selectedStructure.id && "true"}
                            style={{ width: "94%" }}
                            id="type"
                            options={typesStructures}
                            onChange={(e, value) => {
                                dispatch(structureActions.setSelectedStructure({ type: value }))
                                formik.handleChange(e, value)
                            }}
                            value={formik.values.type}
                            size="small"
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : "Choisir..."}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    error={formik.errors.type}
                                    helperText={formik.errors.type}
                                    label="Type structure *"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <Autocomplete
                            disabled={!selectedStructure.id && "true"}
                            style={{ width: "94%" }}
                            id="mere"
                            options={listShortStructure}
                            onChange={(e, value) => {
                                dispatch(structureActions.setSelectedStructure({ structureMere: value }))
                                formik.handleChange(e, value)
                            }}
                            value={formik.values.structureMere}
                            size="small"
                            getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : "Choisir..."}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Structure mère"
                                />
                            )}
                            isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                        />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!selectedStructure.id && "true"} id="code" label="Code *" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.code} error={formik.errors.code} helperText={formik.errors.code} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!selectedStructure.id && "true"} id="libelle" label="Libellé *" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.libelle} error={formik.errors.libelle} helperText={formik.errors.libelle} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <TextField disabled={!selectedStructure.id && "true"} id="surface" type="number" label="Surface" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.surface} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12} >
                        <TextField disabled={!selectedStructure.id && "true"} id="capacite" type="number" label="Capacité" variant="outlined" size="small" onChange={formik.handleChange}
                            value={formik.values.capacite} />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControlLabel control={<Checkbox disabled={!selectedStructure.id && "true"} id="areserve" onChange={formik.handleChange}
                            checked={formik.values.areserve} />} label="A réserver *" />
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControlLabel control={<Checkbox disabled={!selectedStructure.id && "true"} id="actif" onChange={formik.handleChange}
                            checked={formik.values.actif} />} label="Actif *" />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12} >
                        <FormControlLabel control={<Checkbox disabled={!selectedStructure.id && "true"} id="planifInv" onChange={formik.handleChange}
                            checked={formik.values.planifInv} />} label="Planifier l'inventaire *" />
                    </Grid>
                </Grid>
            </Item></>
    )
}

export default DetailsStructure;