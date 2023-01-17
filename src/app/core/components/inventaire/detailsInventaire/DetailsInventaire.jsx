import { Grid, TextField } from "@mui/material";
import { inventaireActions } from "app/core/store/inventaire/InventaireSlice";
import { Dialog } from "primereact/dialog";
import { useDispatch, useSelector } from "react-redux";
import ActionsMenu from "../../generic/actionsMenu/ActionsMenu";
import RechercheInventaire from "../rechercheInventaire/RechercheInventaire";
import {fetchListPlanifInvByInvId} from '../../../store/inventaire/PlanificationInventaireAction'
import { useEffect } from "react";

const DetailsInventaire = () => {
    const dispatch = useDispatch()
    const selectedInventaire = useSelector((state) => state.inventaire.selectedInventaire)
    const displayInvPopup = useSelector((state) => state.inventaire.displayInvPopup)

    useEffect(() => {
        if (selectedInventaire && selectedInventaire.id){
            dispatch(fetchListPlanifInvByInvId(selectedInventaire.id))
        }
    }, [dispatch,selectedInventaire])

    const onSearchInventaireHandle = () => {
        dispatch(inventaireActions.setDisplayInvPopup({ displayInvPopup: true }))
    }

    const onHideSearchPopup = () => {
        dispatch(inventaireActions.setDisplayInvPopup({ displayInvPopup: false }))
    }
    return (
        <>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <ActionsMenu
                        key="01"
                        titre="Détails inventaire"
                        afficheBtnMenu="1"
                        withSearch="1"
                        openSearch={onSearchInventaireHandle}
                    ></ActionsMenu>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled id="code" label="Code *" variant="outlined" size="small"
                        value={selectedInventaire.code ? selectedInventaire.code : ''} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled id="libelle" label="Libelle *" variant="outlined" size="small"
                        value={selectedInventaire.libelle ? selectedInventaire.libelle : ''} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField type="number" disabled id="exercice" label="Exercice *" variant="outlined" size="small"
                        value={selectedInventaire.exercice ? selectedInventaire.exercice : ''} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <TextField disabled id="etat" label="Etat" variant="outlined" size="small"
                        value={selectedInventaire.etat ? selectedInventaire.etat.libelle : ''} />
                </Grid>
            </Grid>
            <Dialog header="Recherche inventaire" maximizable visible={displayInvPopup} onHide={onHideSearchPopup} breakpoints={{ '960px': '75vw' }} style={{ width: '70vw' }}>
                <RechercheInventaire />
            </Dialog>
        </>


    )
}

export default DetailsInventaire