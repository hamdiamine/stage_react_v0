import Item from "../../generic/item/Item"
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'

const PlanAmortissement = () => {
    const numInvBodyTemplate = (rowData) => {
        return rowData.immobilisation.numInventaire
    }
    const designBodyTemplate = (rowData) => {
        return rowData.immobilisation.designation
    }
    const dateExploitBodyTemplate = (rowData) => {
        return rowData.immobilisation.dateMiseExploi
    }
    const methodBodyTemplate = (rowData) => {
        return rowData.methodeFiscal.libelle
    }
    const planAmortissement = [
        {
            id: 1,
            immobilisation: {
                id: 1,
                numInventaire: "003987866",
                designation: "HP SPECTRE X360",
                dateMiseExploi: "22/03/2022"
            },
            valeurActualisee: 1200,
            tauxAmort: 0.4,
            methodeFiscal: {
                id: 1,
                libelle: "Linéaire"
            },
            cumulAmortissementAnterieur: 1298,
            amortissement: 200,
            valeurNette: 1340,
            cumulAmortissement: 1500
        }
    ]
    return (
        <Item>
            <DataTable
                className="data-display"
                value={planAmortissement}
                dataKey="id"
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Montrant {first} à {last} de {totalRecords} amortissements"
                responsiveLayout="scroll"
                resizableColumns
                columnResizeMode="fit"
                showGridlines
                scrollable
                scrollHeight="300px"
                scrollDirection="both"
            >
                <Column
                    field="numInventaire"
                    header="N° inventaire"
                    body={numInvBodyTemplate}
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="libelle"
                    header="Désignation"
                    body={designBodyTemplate}
                    style={{ width: '15%' }}
                ></Column>
                <Column
                    field="type"
                    header="Exploitation"
                    body={dateExploitBodyTemplate}
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="valeurActualisee"
                    header="Valeur actualisée"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="tauxAmort"
                    header="Taux"
                    style={{ width: '5%' }}
                ></Column>
                <Column
                    field="actif"
                    header="Méthode"
                    body={methodBodyTemplate}
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="cumulAmortissementAnterieur"
                    header="Cumule antérieur"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="amortissement"
                    header="Amortissement"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="valeurNette"
                    header="Valeur nette"
                    style={{ width: '10%' }}
                ></Column>
                <Column
                    field="cumulAmortissement"
                    header="Cumule"
                    style={{ width: '10%' }}
                ></Column>
            </DataTable>
        </Item>
    )
}

export default PlanAmortissement