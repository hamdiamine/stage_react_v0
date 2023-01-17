import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Autocomplete, Grid, TextField } from '@mui/material'
import CustomDatePicker from '../../generic/customDatePicker/CustomDatePicker'
import { SimpleCard } from 'app/template/components'
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { fetchListImmoParRecherche } from "app/core/store/priseencharge/ImmobilisationAction";
import { immobilisationActions } from "app/core/store/priseencharge/ImmobilisationSlice";

const RechercheImmobilisation = () => {
    const dispatch = useDispatch()
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const searchImmobilisation = useSelector((state) => state.immobilisation.searchImmobilisation)
    const listAllFournisseur = useSelector((state) => state.fournisseur.listAllFournisseur)
    const listAllArticle = useSelector((state) => state.article.listAllArticle)
    const listRechImmobilisation = useSelector((state) => state.immobilisation.listRechImmobilisation)

    const validate = values => {
        const errors = {};
        if (!values.numInvRech && !values.immatriculRech && !values.numSerieRech && !values.codeABarreRech
            && !values.designRech && !values.dateExploitMin && !values.dateExploitMax
            && !values.fournisseurRech && !values.articleRech) {
            errors.critereoblig = " "
        }

        return errors;
    }
    const submit = (values) => {
        values.organisation = currentOrganisation
        dispatch(fetchListImmoParRecherche(values, currentOrganisation.id))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: searchImmobilisation,
        validate: validate,
        onSubmit: submit,
    })

    const onInitHandle = () => {
        dispatch(immobilisationActions.setSearchImmobilisation({ searchImmobilisation: {} }))
        dispatch(immobilisationActions.setListRechImmobilisation({ listRechImmobilisation: [] }))
    }

    const selectImmobilisation = (data) => {
        dispatch(immobilisationActions.setSelectedImmobilisation({ selectedImmobilisation: data }))
        dispatch(immobilisationActions.setDisplaySearchPopup({ displaySearchPopup: false }))
    }

    const articleBodyTemplate = (rowData) => {
        return rowData.article.libelle
    }

    const structureBodyTemplate = (rowData) => {
        return rowData.structureActuel.libelle
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-check"
                className="p-button-rounded p-button-success "
                onClick={() => selectImmobilisation(rowData)}
                tooltip="Sélectionner"
                tooltipOptions={{ position: 'bottom' }} />
        );
    }

    return (
        <SimpleCard>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="numInvRech" label="N° Inventaire" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.numInvRech} error={formik.errors.critereoblig} helperText={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="immatriculRech" label="Immatriculation" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.immatriculRech} error={formik.errors.critereoblig} helperText={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="numSerieRech" label="N° serie" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.numSerieRech} error={formik.errors.critereoblig} helperText={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="codeABarreRech" label="Code à barre" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.codeABarreRech} error={formik.errors.critereoblig} helperText={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField fullWidth id="designRech" label="Désignation" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.designRech} error={formik.errors.critereoblig} helperText={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateExploitMin"
                        locale="fr"
                        disableFuture="true"
                        label="Mise en exploitation Min"
                        maxDate={formik.values.dateExploitMax}
                        onChange={(value) => {
                            formik.setFieldValue("dateExploitMin", value)
                        }}
                        value={formik.values.dateExploitMin ? formik.values.dateExploitMin : null}
                        error={formik.errors.critereoblig}
                        helperText={formik.errors.critereoblig}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <CustomDatePicker
                        id="dateExploitMax"
                        locale="fr"
                        disableFuture="true"
                        label="Mise en exploitation Max"
                        minDate={formik.values.dateExploitMax}
                        onChange={(value) => {
                            formik.setFieldValue("dateExploitMax", value)
                        }}
                        value={formik.values.dateExploitMax ? formik.values.dateExploitMax : null}
                        error={formik.errors.critereoblig}
                        helperText={formik.errors.critereoblig}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        options={listAllFournisseur}
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
                                helperText={formik.errors.critereoblig}
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        options={listAllArticle}
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
                        className="small-table"
                        value={listRechImmobilisation}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Montrant {first} à {last} de {totalRecords} fournisseurs"
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
                            field="numInventaire"
                            header="N° Inventaire"
                            sortable
                            style={{ width: '15%' }}
                        ></Column>
                        <Column
                            field="designation"
                            header="Désignation"
                            sortable
                            style={{ width: '25%' }}
                        ></Column>
                        <Column
                            field="dateMiseExploi"
                            header="Exploitation"
                            sortable
                            style={{ width: '15%' }}
                        ></Column>
                        <Column
                            field="article"
                            header="Article"
                            body={articleBodyTemplate}
                            sortable
                            style={{ width: '15%' }}
                        ></Column>
                        <Column
                            field="structureActuel"
                            header="Emplacement actuel"
                            body={structureBodyTemplate}
                            sortable
                            style={{ width: '20%' }}
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

export default RechercheImmobilisation