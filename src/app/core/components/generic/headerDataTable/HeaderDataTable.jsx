import { Button } from 'primereact/button'
import { InputText } from 'primereact/inputtext'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { Dialog } from 'primereact/dialog';
import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from 'app/core/store/generic/UISlice'


const HeaderDataTable = (props) => {
    const dispatch = useDispatch();
    const affichDeleteDialog = useSelector((state) => state.ui.affichDeleteDialog)
    const exportCSV = () => {
        props.dataTable.current.exportCSV();
    }

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
            <div className="flex flex-column md:flex-row md:align-items-center justify-content-between">
                <span className="p-input-icon-left w-full md:w-auto">
                    <i className="pi pi-search" />
                    <InputText
                        type="search"
                        onInput={(e) => props.setGlobalFilter(e.target.value)}
                        placeholder="Filter..."
                        className="w-full lg:w-auto"
                    />
                </span>
                <div className="mt-3 md:mt-0 flex justify-content-end">
                    {props.withAdd && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-plus"
                            className="mr-2 p-button-rounded"
                            onClick={props.openNew}
                            tooltip="New"
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}
                    {props.withDelete && props.afficheBtnMenu && (
                        <Button
                            icon="pi pi-trash"
                            className="p-button-danger mr-2 p-button-rounded"
                            onClick={onAffichDeleteDialog}
                            disabled={
                                !props.selectedItems ||
                                !props.selectedItems.length
                            }
                            tooltip="Delete"
                            tooltipOptions={{ position: 'bottom' }}
                        />
                    )}

                    <Button
                        icon="pi pi-upload"
                        className="p-button-help p-button-rounded"
                        onClick={exportCSV}
                        tooltip="Export"
                        tooltipOptions={{ position: 'bottom' }}
                    />
                </div>
            </div>
            <Dialog visible={affichDeleteDialog} style={{ width: '450px' }} header="Confirmation" modal footer={deleteDialogFooter} onHide={onHideDeleteDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {props.selectedItems && <span>{props.messageDelete}</span>}
                </div>
            </Dialog>
        </>

    )
}

export default HeaderDataTable
