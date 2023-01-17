import { fournisseurActions } from "app/core/store/parametrage/FournisseurSlice"
import { useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import HeaderDataTable from "../../generic/headerDataTable/HeaderDataTable"
import { Grid } from '@mui/material'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Breadcrumb, SimpleCard } from 'app/template/components'
import { Button } from 'primereact/button';
import { useFormik } from "formik"
import { fetchListRechercheByOrg } from "app/core/store/parametrage/FournisseurAction"




const SearchFournisseur = () => {
    const dt = useRef(null)
    const dispatch = useDispatch()
    const currentOrganisation = useSelector(
        (state) => state.organisation.currentOrganisation
    )
    const rechercheFournisseur = useSelector(
        (state) => state.fournisseur.rechercheFournisseur
    )
    const listPays = useSelector(
        (state) => state.fournisseur.listVocPays
    )
    const fournisseurs = useSelector(
        (state) => state.fournisseur.listFournisseur
    )

    const selectFournisseur = (rowData) => {
        dispatch(fournisseurActions.setSelectedFournisseur({ selectedFournisseur: rowData }))
        dispatch(fournisseurActions.setActiverModif({ activerModif: false }))
        dispatch(fournisseurActions.setDisplaySearchPopup({ displaySearchPopup: false }))
    }

    const onInit = () => {
        dispatch(fournisseurActions.setResetedRechercheFournisseur())
        dispatch(fournisseurActions.setListFournisseur({ listFournisseur: [] }))
    }

    const submit = (values) => {
        const rech = {
            paysRech: values.paysRech.id ? values.paysRech : null,
            codeRech: values.codeRech != '' ? values.codeRech : null,
            raisonSocialRech: values.raisonSocialRech !== '' ? values.raisonSocialRech : null
        }
        dispatch(fetchListRechercheByOrg(rech, currentOrganisation.id))
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            paysRech: rechercheFournisseur.paysRech,
            codeRech: rechercheFournisseur.codeRech,
            raisonSocialRech: rechercheFournisseur.raisonSocialRech,
            initial: rechercheFournisseur.initial
        },
        onSubmit: submit
    })

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-check"
                className="p-button-rounded p-button-success "
                onClick={() => selectFournisseur(rowData)}
                tooltip="Sélectionner"
                tooltipOptions={{ position: 'bottom' }} />
        );
    }
    return (
        <SimpleCard>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Autocomplete
                        options={listPays}
                        style={{ width: "94%" }}
                        id="paysRech"
                        size="small"
                        onChange={(e, value) => {
                            formik.setFieldValue("paysRech", value)
                        }}
                        value={formik.values.paysRech}
                        getOptionLabel={(option) => option && option !== null && option.libelle ? option.libelle : ""}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Pays *"
                            />
                        )}
                        isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                    />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="codeRech" label="Code *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.codeRech} />
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <TextField fullWidth id="raisonSocialRech" label="Nom/Raison social *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.raisonSocialRech} />
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
                        onClick={onInit}
                        tooltip="Initialiser"
                        tooltipOptions={{ position: 'bottom' }}
                    />

                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <DataTable
                        ref={dt}
                        value={fournisseurs}
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
                            field="code"
                            header="Code"
                            sortable
                            style={{ width: '20%' }}
                        ></Column>
                        <Column
                            field="raisonSocial"
                            header="Nom/Raison social"
                            sortable
                            style={{ width: '30%' }}
                        ></Column>
                        <Column
                            field="adresse"
                            header="Adresse"
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

export default SearchFournisseur