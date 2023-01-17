import { Fieldset } from 'primereact/fieldset';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { Tree } from 'primereact/tree';
import Item from '../../generic/item/Item'
import { useDispatch, useSelector } from 'react-redux';
import { fetchHierarchieStructureActuel } from 'app/core/store/parametrage/StructureAction';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import CustomDatePicker from '../../generic/customDatePicker/CustomDatePicker';
import { immobilisationActions } from 'app/core/store/priseencharge/ImmobilisationSlice';


const AffectationActuel = () => {
    const dispatch = useDispatch()
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const selectedImmobilisation = useSelector((state) => state.immobilisation.selectedImmobilisation)
    useEffect(() => {
        dispatch(fetchHierarchieStructureActuel(selectedImmobilisation.structureActuel.id, currentOrganisation.id))
    }, [dispatch, selectedImmobilisation.structureActuel.id, currentOrganisation.id])

    const listNodesStructureActuel = useSelector((state) => state.immobilisation.listNodesStructureActuel)
    const expandedNodes = useSelector((state) => state.immobilisation.expandedNodes)

    const validate = values => {
        const errors = {};

        return errors;
    }
    const submit = (values) => {
        values.organisation = currentOrganisation
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedImmobilisation,
        validate: validate,
        onSubmit: submit,
    })

    const onTreeToggleHandle = (e) => {
        dispatch(immobilisationActions.setExpandedNodes({ expandedNodes: e.value }))
    }

    return (
        <Item>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Fieldset legend="Emplacement actuel">
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Tree value={listNodesStructureActuel} expandedKeys={expandedNodes}
                                    onToggle={onTreeToggleHandle} disabled='true' />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <CustomDatePicker
                                    id="dateAffectStructure"
                                    locale="fr"
                                    disableFuture="true"
                                    label="Date affectation *"
                                    disabled
                                    onChange={(value) => {
                                        formik.setFieldValue("dateAffectStructure", value)
                                    }}
                                    value={formik.values.dateAffectStructure ? formik.values.dateAffectStructure : null}
                                    error={formik.errors.dateAffectStructure}
                                    helperText={formik.errors.dateAffectStructure}
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Fieldset legend="Personnel">
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField id="matricule" label="Matricule" variant="outlined" size="small" />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField id="nomprenom" label="Nom et prénom" variant="outlined" size="small" />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <Autocomplete
                                    style={{ width: "94%" }}
                                    id="fonction"
                                    size="small"
                                    getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Fonction"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                                />
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <TextField id="dateAffectation" label="Date affectation" variant="outlined" size="small" />
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Grid>
            </Grid>
        </Item>
    )
}

export default AffectationActuel