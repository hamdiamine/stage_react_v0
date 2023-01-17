import { Button } from 'primereact/button'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from 'app/core/store/generic/UISlice'
import { Dialog } from 'primereact/dialog'

const ActionsMenu = (props) => {
    const dispatch = useDispatch();

    const affichDeleteDialog = useSelector((state) => state.ui.affichDeleteDialog)

    const onHideDeleteDialog = () => {
        dispatch(uiActions.setAffichDeleteDialog({ affichDeleteDialog: false }))
    }

    const onAffichDeleteDialog = () => {
        dispatch(uiActions.setAffichDeleteDialog({ affichDeleteDialog: true }))
    }

    const deleteDialogFooter = (
        <>
            <Button label="Annuler" icon="pi pi-times" className="p-button-text" onClick={onHideDeleteDialog} />
            <Button label="Valider" icon="pi pi-check" className="p-button-text" onClick={props.confirmDelete} />
        </>
    );

    return (
        <>
            <div className="flex flex-column md:flex-row md:align-items-center justify-content-between mb-3">
                <span className="p-input-icon-left w-full md:w-auto">
                    <h4 className='titre-item'>{props.titre}</h4>
                </span>
                <div className="float-r mt-3 md:mt-0 flex justify-content-end">
                    {props.withSearch && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-search"
                            className="p-button-help mr-2 p-button-rounded"
                            onClick={props.openSearch}
                            tooltip={props.tooltipRech ? props.tooltipRech : "Rechercher"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withAdd && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-plus"
                            className="mr-2 p-button-rounded"
                            onClick={props.openNew}
                            disabled={props.disableAdd}
                            tooltip={props.tooltipAdd ? props.tooltipAdd : "Ajouter"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withOtherAdd && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-plus"
                            className="mr-2 p-button-rounded btn-other-add"
                            onClick={props.openOtherNew}
                            disabled={props.disableOtherAdd}
                            tooltip={props.tooltipOtherAdd ? props.tooltipOtherAdd : "Ajouter"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withModif && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-pencil"
                            className="p-button-warning mr-2 p-button-rounded"
                            onClick={props.openModif}
                            tooltip={props.tooltipModif ? props.tooltipModif : "Modifier"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withDelete && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-trash"
                            className="p-button-danger mr-2 p-button-rounded"
                            onClick={onAffichDeleteDialog}
                            disabled={!props.selectedItem}
                            tooltip={props.tooltipSupp ? props.tooltipSupp : "Supprimer"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withSave && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-save"
                            className="p-button-success mr-2 p-button-rounded"
                            onClick={props.onSave}
                            disabled={!props.selectedItem}
                            tooltip={props.tooltipSave ? props.tooltipSave : "Sauvegarder"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withCancel && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-times"
                            className="p-button-danger mr-2 p-button-rounded"
                            onClick={props.onCancel}
                            disabled={!props.selectedItem}
                            tooltip={props.tooltipAnnul ? props.tooltipAnnul : "Annuler"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withPlanif && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-table"
                            className="mr-2 p-button-rounded btn-planif"
                            onClick={props.onPlanif}
                            tooltip={props.tooltipPlanif ? props.tooltipPlanif : "Planifier"}
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                </div>
            </div>
            {
                props.withDelete &&
                <Dialog visible={affichDeleteDialog} style={{ width: '450px' }} header="Confirmation" modal footer={deleteDialogFooter} onHide={onHideDeleteDialog}>
                    <div className="confirmation-content">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        <span>{props.deleteMessage}</span><b>{props.selectedItem && props.selectedItem.libelle}</b>
                    </div>
                </Dialog>
            }
        </>
    )
}

export default ActionsMenu;