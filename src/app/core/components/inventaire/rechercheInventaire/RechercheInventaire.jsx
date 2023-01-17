import { Grid, TextField } from "@mui/material"
import { fetchListInvParRecherche } from "app/core/store/inventaire/InventaireAction";
import { inventaireActions } from "app/core/store/inventaire/InventaireSlice";
import { fetchListPlanifInvByInvId } from "app/core/store/inventaire/PlanificationInventaireAction";
import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { useDispatch, useSelector } from "react-redux";
import Item from "../../generic/item/Item";

const RechercheInventaire = () => {
    const dispatch = useDispatch()
    const searchInventaire = useSelector((state) => state.inventaire.searchInventaire)
    const listInventaire = useSelector((state) => state.inventaire.listInventaire)
    const validate = values => {
        const errors = {};

        if (!values.code && !values.libelle && !values.exercice) {
            errors.critereoblig = ' '
        }

        return errors;
    }
    const submit = (values) => {
        dispatch(fetchListInvParRecherche(values))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: searchInventaire,
        validate: validate,
        onSubmit: submit,
    })

    const onInitHandle = () => {
        dispatch(inventaireActions.initRecherche())
    }

    const etatBodyTemplate = (rowData) => {
        return rowData.etat.libelle
    }

    const selectInventaire = (inventaire) => {
        dispatch(fetchListPlanifInvByInvId(inventaire.id))
        dispatch(inventaireActions.setSelectedInventaire({ selectedInventaire: inventaire }))
        dispatch(inventaireActions.setDisplayInvPopup({ displayInvPopup: false }))
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-check"
                className="p-button-rounded p-button-success "
                onClick={() => selectInventaire(rowData)}
                tooltip="Sélectionner"
                tooltipOptions={{ position: 'bottom' }} />
        );
    }
    return (
        <Item>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="code" label="Code" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.code ? formik.values.code : ''} error={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField id="libelle" label="Libelle" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.libelle ? formik.values.libelle : ''} error={formik.errors.critereoblig} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField type="number" id="exercice" label="Exercice *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.exercice ? formik.values.exercice : ''} error={formik.errors.critereoblig} />
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
                        value={listInventaire}
                        dataKey="id"
                        paginator
                        rows={5}
                        rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Montrant {first} à {last} de {totalRecords} inventaires"
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
                            field="libelle"
                            header="Libellé"
                            sortable
                            style={{ width: '40%' }}
                        ></Column>
                        <Column
                            field="exercice"
                            header="Exercice"
                            sortable
                            style={{ width: '15%' }}
                        ></Column>
                        <Column
                            field="etat"
                            header="Etat"
                            body={etatBodyTemplate}
                            sortable
                            style={{ width: '15%' }}
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
        </Item>
    )
}

export default RechercheInventaire