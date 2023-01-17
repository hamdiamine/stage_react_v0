import React, { useEffect, useRef } from 'react'
import { Breadcrumb, SimpleCard } from 'app/template/components'
import { styled } from '@mui/system'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchListSelonOrganisation,
    setGlobalSearch,
    saveParametre,
} from 'app/core/store/parametrage/ParametreAction'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import HeaderDataTable from '../../../components/generic/headerDataTable/HeaderDataTable'
import _ from 'lodash'
import TextEditor from 'app/core/components/generic/textEditor/TextEditor'
import NumberEditor from 'app/core/components/generic/numberEditor/NumberEditor'
import { uiActions } from 'app/core/store/generic/UISlice'
import Container from 'app/core/components/generic/container/Container'

const ParametreGenraux = () => {
    const dt = useRef(null)
    const parametres = useSelector((state) => state.parametre.listParametre)
    const globalFilter = useSelector((state) => state.parametre.globalFilter)
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchListSelonOrganisation(currentOrganisation.id))
    }, [dispatch, currentOrganisation.id])

    const setGlobalSearchValue = (value) => {
        dispatch(setGlobalSearch(value))
    }

    const header = (
        <HeaderDataTable
            setGlobalFilter={(v) => setGlobalSearchValue(v)}
            dataTable={dt}
        />
    )

    const textEditor = (options) => {
        return (
            <TextEditor options={options} />
        )
    }


    const numberEditor = (options) => {
        return (
            <NumberEditor options={options} />
        )
    }

    const parametreValidator = (parametre) => {
        if ((!parametre.charVal || !parametre.charVal === null || !parametre.charVal === '')
            &&
            (!parametre.numVal || !parametre.numVal === null || !parametre.numVal === '')
        ) {
            return false
        } else {
            return true;
        }
    }

    const onParametreEditComplete = (e) => {
        let { newData } = e
        if(!parametreValidator(newData)){
            dispatch(
                uiActions.setNotification({
                    notification: {
                        open: true,
                        status: 2,
                        message: 'Un paramètre doit avoir au moins une valeur numérique ou alphanumérique',
                    },
                })
            )
            return;
        }
        const index = parametres.findIndex((p) => p.id === newData.id)
        const oldParametre = parametres[index]
        if (!_.isEqual(newData, oldParametre)) {
            let newListParametre = [...parametres]
            newListParametre[index] = newData
            dispatch(saveParametre(newListParametre, index))
        }
    }

    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Paramétrage', path: '/parametrage' },
                        { name: 'Paramètres généraux' },
                    ]}
                />
            </div>
            <SimpleCard>
                <DataTable
                    ref={dt}
                    value={parametres}
                    dataKey="id"
                    paginator
                    rows={5}
                    rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Montrant {first} à {last} de {totalRecords} paramètres"
                    globalFilter={globalFilter}
                    header={header}
                    responsiveLayout="scroll"
                    editMode="row"
                    onRowEditComplete={onParametreEditComplete}
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
                        style={{ width: '12%' }}
                    ></Column>
                    <Column
                        field="description"
                        header="Description"
                        sortable
                        style={{ width: '33%' }}
                    ></Column>
                    <Column
                        field="charVal"
                        header="Alphanumérique"
                        style={{ width: '28%' }}
                        editor={(options) => textEditor(options)}
                    ></Column>
                    <Column
                        field="numVal"
                        header="Numérique"
                        style={{ width: '12%' }}
                        editor={(options) => numberEditor(options)}
                    ></Column>
                    <Column
                        rowEditor
                        style={{ width: '10%', minWidth: '8rem' }}
                        bodyStyle={{ textAlign: 'center' }}
                    ></Column>
                </DataTable>
            </SimpleCard>
        </Container>
    )
}

export default ParametreGenraux
