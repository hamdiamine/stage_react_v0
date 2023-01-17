import { SimpleCard } from 'app/template/components'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { Autocomplete, Grid, TextField } from '@mui/material'
import CustomDatePicker from '../../generic/customDatePicker/CustomDatePicker'
import { Button } from 'primereact/button';
import { priseEnChargeActions } from 'app/core/store/priseencharge/PriseEnChargeSlice'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fetchListPriseEnChargeByRecherche } from 'app/core/store/priseencharge/PriseEnChargeAction'
import { fetchListImmoParPriseEnCharge } from 'app/core/store/priseencharge/ImmobilisationAction'



const RecherchePriseEnCharge = () => {
    const dispatch = useDispatch()
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const searchPriseEnCharge = useSelector((state) => state.priseencharge.searchPriseEnCharge)
    const listVocOrigine = useSelector((state) => state.priseencharge.listVocOrigine)
    const listFournisseur = useSelector((state) => state.priseencharge.listFournisseur)
    const listArticle = useSelector((state) => state.article.listArticle)
    const listPriseEnCharge = useSelector((state) => state.priseencharge.listPriseEnCharge)

    const validate = values => {
        const errors = {};

        if (!values.numPrsChrgRech && !values.numInvRech && !values.dateOperationMin && !values.dateOperationMax
            && !values.origineRech && !values.fournisseurRech && !values.articleRech) {
            errors.critereoblig = ' '
        }

        return errors;
    }
    const submit = (values) => {
        values.organisation = currentOrganisation
        dispatch(fetchListPriseEnChargeByRecherche(values, currentOrganisation.id))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: searchPriseEnCharge,
        validate: validate,
        onSubmit: submit,
    })

    const onInitHandle = () => {
        dispatch(priseEnChargeActions.setInitSearchPriseEnCharge())
        dispatch(priseEnChargeActions.setInitListPriseEnCharge())
    }

    const selectPriseEnCharge = (data) => {
        dispatch(fetchListImmoParPriseEnCharge(data, currentOrganisation.id))
        dispatch(priseEnChargeActions.setDisplayRecherchePopup({ displayRecherchePopup: false }))
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-check"
                className="p-button-rounded p-button-success "
                onClick={() => selectPriseEnCharge(rowData)}
                tooltip="Sélectionner"
                tooltipOptions={{ position: 'bottom' }} />
        );
    }

    const fournisseurBodyTemplate = (rowData) => {
        return rowData.fournisseur.raisonSocial
    }

    return (
        <SimpleCard>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="numPrsChrgRech" label="N° prise en charge" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.numPrsChrgRech} error={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="numInvRech" label="N° Inventaire" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.numInvRech} error={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateOperationMin"
                        locale="fr"
                        disableFuture="true"
                        label="Date de prise en charge Min"
                        maxDate={formik.values.dateOperationMax}
                        onChange={(value) => {
                            formik.setFieldValue("dateOperationMin", value)
                        }}
                        value={formik.values.dateOperationMin ? formik.values.dateOperationMin : null}
                        error={formik.errors.critereoblig}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateOperationMax"
                        locale="fr"
                        disableFuture="true"
                        label="Date de prise en charge Max"
                        minDate={formik.values.dateOperationMin}
                        onChange={(value) => {
                            formik.setFieldValue("dateOperationMax", value)
                        }}
                        value={formik.values.dateOperationMax ? formik.values.dateOperationMax : null}
                        error={formik.errors.critereoblig}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        options={listVocOrigine}
                        style={{ width: "94%" }}
                        id="origineRech"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("origineRech", value)
                        }}
                        value={formik.values.origineRech ? formik.values.origineRech : {}}
                        getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Origine"
                                error={formik.errors.critereoblig}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        options={listFournisseur}
                        style={{ width: "94%" }}
                        id="fournisseurRech"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("fournisseurRech", value)
                        }}
                        value={formik.values.fournisseurRech ? formik.values.fournisseurRech : {}}
                        getOptionLabel={(option) => (option && option !== null && option.raisonSocial) ? option.raisonSocial : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Fournisseur"
                                error={formik.errors.critereoblig}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        options={listArticle}
                        style={{ width: "94%" }}
                        id="articleRech"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("articleRech", value)
                        }}
                        value={formik.values.articleRech ? formik.values.articleRech : {}}
                        getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Article"
                                error={formik.errors.critereoblig}
                                helperText={formik.errors.critereoblig}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    {formik.errors.critereoblig && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-ftcob6-MuiFormHelperText-root" id="naturePropriete-helper-text">Au moins un critère de recherche doit être saisi</p>}
                </Grid>
                <Grid style={{ textAlign: "right" }} item lg={12} md={12} sm={12} xs={12}>
                    <Button
                        icon="pi pi-search-plus"
                        className="p-button-info mr-2 p-button-rounded"
                        onClick={formik.handleSubmit}
                        tooltip="Rechercher"
                        tooltipOptions={{ position: 'bottom' }}
                    />
                    <Button
                        icon="pi pi-circle"
                        className="p-button-secondary mr-2 p-button-rounded"
                        onClick={onInitHandle}
                        tooltip="Initialiser"
                        tooltipOptions={{ position: 'bottom' }}
                    />

                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <DataTable
                        value={listPriseEnCharge}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Montrant {first} à {last} de {totalRecords} demandes"
                        responsiveLayout="scroll"
                        editMode="row"
                        resizableColumns
                        columnResizeMode="fit"
                        showGridlines
                        selectionMode="single"
                        scrollable
                        scrollHeight="300px"
                        scrollDirection="both"
                    >
                        <Column
                            field="numero"
                            header="N° Prise en charge"
                            sortable
                            style={{ width: '20%' }}
                        ></Column>
                        <Column
                            field="dateOperation"
                            header="Date de prise en charge"
                            sortable
                            style={{ width: '30%' }}
                        ></Column>
                        <Column
                            field="fournisseur"
                            header="Fournisseur"
                            body={fournisseurBodyTemplate}
                            sortable
                            style={{ width: '40%' }}
                        ></Column>
                        <Column
                            body={actionBodyTemplate}
                            exportable={false}
                            style={{ width: '10', minWidth: '4rem' }}
                            bodyStyle={{ textAlign: 'center' }}
                        ></Column>
                    </DataTable>
                </Grid>
            </Grid>
        </SimpleCard>
    )
}

export default RecherchePriseEnCharge