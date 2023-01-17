import { Grid, TextField } from "@mui/material";
import { inventaireActions } from "app/core/store/inventaire/InventaireSlice";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import ActionsMenu from "../../generic/actionsMenu/ActionsMenu";
import Item from "../../generic/item/Item";
import { saveInventaire } from "app/core/store/inventaire/InventaireAction";
import { Dialog } from "primereact/dialog";
import RechercheInventaire from "../rechercheInventaire/RechercheInventaire";

const EditerInventaire = () => {
    const dispatch = useDispatch()
    const selectedInventaire = useSelector((state) => state.inventaire.selectedInventaire)
    const activeEdition = useSelector((state) => state.inventaire.activeEdition)
    const displayInvPopup = useSelector((state) => state.inventaire.displayInvPopup)
    const listPlanifInv = useSelector((state) => state.planifInv.listPlanifInv)

    const validate = values => {
        const errors = {};
        if (!values.code) {
            errors.code = 'Obligatoire';
        } else if (values.code.length > 30) {
            errors.code = 'Doit contenir au plus 30 caractères';
        }

        if (!values.libelle) {
            errors.libelle = 'Obligatoire';
        } else if (values.libelle.length > 200) {
            errors.libelle = 'Doit contenir au plus 200 caractères';
        }

        const currentYear = new Date().getFullYear()

        if (!values.exercice) {
            errors.exercice = 'Obligatoire';
        } else if (values.exercice > currentYear || values.exercice < currentYear - 1) {
            errors.exercice = 'Exercice non valide';
        }

        return errors;
    }
    const submit = (values) => {
        dispatch(saveInventaire({ ...values, listPlanifInv: listPlanifInv }))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: selectedInventaire,
        validate,
        onSubmit: submit,

    })
    const onSearchInventaireHandle = () => {
        dispatch(inventaireActions.setDisplayInvPopup({ displayInvPopup: true }))
    }
    const onAddInventaireHandle = () => {
        dispatch(inventaireActions.initForm({ forAdd: true }))
    }
    const onCancelHandle = () => {
        dispatch(inventaireActions.initForm({ forCancel: true }))
    }
    const openModifHandle = () => {
        dispatch(inventaireActions.setActiveEdition({ activeEdition: true }))
    }
    const onHideSearchPopup = () => {
        dispatch(inventaireActions.setDisplayInvPopup({ displayInvPopup: false }))
    }
    return (
        <Item>
            <ActionsMenu
                key="01"
                titre="Informations inventaire"
                afficheBtnMenu="1"
                withSearch={!activeEdition ? "1" : undefined}
                withAdd={!activeEdition ? "1" : undefined}
                withSave={activeEdition ? "1" : undefined}
                withCancel={activeEdition ? "1" : undefined}
                selectedItem={activeEdition ? "1" : undefined}
                withModif={(!activeEdition && selectedInventaire.id) ? "1" : undefined}
                openSearch={onSearchInventaireHandle}
                openNew={onAddInventaireHandle}
                onSave={formik.handleSubmit}
                onCancel={onCancelHandle}
                openModif={openModifHandle}
            ></ActionsMenu>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled={!activeEdition} autoFocus id="code" label="Code *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.code ? formik.values.code : ''} error={formik.errors.code} helperText={formik.errors.code} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled={!activeEdition} id="libelle" label="Libelle *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.libelle ? formik.values.libelle : ''} error={formik.errors.libelle} helperText={formik.errors.libelle} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField type="number" disabled={!activeEdition} id="exercice" label="Exercice *" variant="outlined" size="small" onChange={formik.handleChange}
                        value={formik.values.exercice ? formik.values.exercice : ''} error={formik.errors.exercice} helperText={formik.errors.exercice} />
                </Grid>
                {selectedInventaire.id && <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled id="etat" label="Etat" variant="outlined" size="small"
                        value={formik.values.etat ? formik.values.etat.libelle : null} />
                </Grid>}
            </Grid>
            <Dialog header="Recherche inventaire" maximizable visible={displayInvPopup} onHide={onHideSearchPopup} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }}>
                <RechercheInventaire />
            </Dialog>
        </Item>
    )
}

export default EditerInventaire