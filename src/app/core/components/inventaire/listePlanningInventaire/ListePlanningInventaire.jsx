import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useDispatch, useSelector } from 'react-redux'
import { fetchResultatInventaireByPlan } from 'app/core/store/inventaire/PlanificationInventaireAction'
import { Button } from 'primereact/button';

const ListePlanningInventaire = () => {
    const dispatch = useDispatch()
    const listPlanifInv = useSelector((state) => state.planifInv.listPlanifInv)

    const actionBodyTemplate = (rowData) => {
        return (
            <Button
                icon="pi pi-check"
                className="p-button-rounded p-button-success "
                onClick={() => selectPlan(rowData)}
                tooltip="Sélectionner"
                tooltipOptions={{ position: 'bottom' }} />
        );
    }
    const selectPlan = (rowData)=>{
        dispatch(fetchResultatInventaireByPlan(rowData.id, rowData.structure.id))
    }
    return (
        <div className='flex-column'>
            <h4 className='titre-item'>Liste planning inventaire</h4>
            <DataTable
                value={listPlanifInv}
                dataKey="id"
                responsiveLayout="scroll"
                resizableColumns
                columnResizeMode="fit"
                showGridlines
                scrollable
                scrollHeight="300px"
                scrollDirection="both"
                emptyMessage="Aucune données trouvées"
            >
                <Column
                    field="libelleStructure"
                    header="Structure"
                    sortable
                    style={{ width: '35%' }}
                ></Column>
                <Column
                    field="periodeAff"
                    header="Période"
                    sortable
                    style={{ width: '55%' }}
                ></Column>
                <Column
                    body={actionBodyTemplate}
                    exportable={false}
                    style={{ width: '10%', minWidth: '4rem' }}
                    bodyStyle={{ textAlign: 'center' }}
                ></Column>
            </DataTable>
        </div>

    )
}

export default ListePlanningInventaire