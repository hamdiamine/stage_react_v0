import { Grid } from "@mui/material";
import { planificationInventaireActions } from "app/core/store/inventaire/PlanificationInventaireSlice";
import { fetchAllStructuresPlanifInv } from "app/core/store/parametrage/StructureAction";
import { useFormik } from "formik";
import { Tree } from "primereact/tree";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ActionsMenu from "../../generic/actionsMenu/ActionsMenu";
import CustomDatePicker from "../../generic/customDatePicker/CustomDatePicker";
import Item from "../../generic/item/Item";

const PlanifierInventaire = () => {
    const dispatch = useDispatch()
    const selectedInventaire = useSelector((state) => state.inventaire.selectedInventaire)
    const listStruture = useSelector((state) => state.planifInv.listStructure)
    const listNodeTree = useSelector((state) => state.planifInv.listNodeTree)
    const selectedNodes = useSelector((state) => state.planifInv.selectedNodes)
    const expandedNodes = useSelector((state) => state.planifInv.expandedNodes)
    const listPlanifInv = useSelector((state) => state.planifInv.listPlanifInv)
    const selectedStructure = useSelector((state) => state.planifInv.selectedStructure)
    useEffect(() => {
        if (listStruture.length === 0) {
            dispatch(fetchAllStructuresPlanifInv())
        } else {
            dispatch(planificationInventaireActions.setListStructure({ listStructure: listStruture }))
        }
    }, [dispatch])

    const setSelectedNodesHandle = (e) => {
        dispatch(planificationInventaireActions.setSelectedNodes({ selectedNodes: e.value }))
        const listSelectedStrNode = Object.keys(e.value)
            .map((key) => {
                return { id: Number(key), ...e.value[key] }
            })
            .filter(nd => nd.checked === true)

        if (listSelectedStrNode.length > 0) {
            dispatch(planificationInventaireActions.setSelectedStructure({ selectedStructure: listSelectedStrNode[0].id }))
        } else {
            dispatch(planificationInventaireActions.setSelectedStructure({ selectedStructure: null }))
        }
    }

    const onTreeToggleHandle = (e) => {
        dispatch(planificationInventaireActions.setExpandedNodes({ expandedNodes: e.value }))
    }

    const validate = values => {
        const errors = {};

        if (!values.dateDebutPlanifiee) {
            errors.dateDebutPlanifiee = 'Obligatoire';
        }

        if (!values.dateFinPlanifiee) {
            errors.dateFinPlanifiee = 'Obligatoire';
        }

        if (selectedStructure === null) {
            errors.structure = 'Obligatoire';
        }

        return errors;
    }
    const submit = (values) => {
        dispatch(planificationInventaireActions.addPlanifinvToList({ planifInvValues: values }))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {},
        validate,
        onSubmit: submit,

    })

    const onCancelHandle = () => {
        dispatch(planificationInventaireActions.setDisplayPlanifPopup({ displayPlanifPopup: false }))
    }

    return (
        <Item>
            <ActionsMenu
                key="01"
                afficheBtnMenu="1"
                withSave="1"
                withCancel="1"
                selectedItem="1"
                onSave={formik.handleSubmit}
                onCancel={onCancelHandle}
            ></ActionsMenu>
            <Grid container rowSpacing={2} columnSpacing={2}>
                <Grid item lg={5} md={5} sm={12} xs={12}>
                    {formik.errors.structure && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-ftcob6-MuiFormHelperText-root" id="naturePropriete-helper-text">Obligatoire</p>}
                    <Tree value={listNodeTree} expandedKeys={expandedNodes} selectionMode="checkbox" filter filterMode="lenient"
                        selectionKeys={selectedNodes} onSelectionChange={setSelectedNodesHandle} onToggle={onTreeToggleHandle} />
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>
                    <Grid item lg={12} md={12} sm={12} xs={12} className="mb-3">
                        <CustomDatePicker
                            id="dateDebutPlanifiee"
                            locale="fr"
                            label="Date de debut *"
                            maxDate={formik.values.dateFinPlanifiee}
                            onChange={(value) => {
                                formik.setFieldValue("dateDebutPlanifiee", value)
                            }}
                            value={formik.values.dateDebutPlanifiee ? formik.values.dateDebutPlanifiee : null}
                            error={formik.errors.dateDebutPlanifiee}
                            helperText={formik.errors.dateDebutPlanifiee}
                        />
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                        <CustomDatePicker
                            id="dateFinPlanifiee"
                            locale="fr"
                            label="Date de fin *"
                            minDate={formik.values.dateDebutPlanifiee}
                            onChange={(value) => {
                                formik.setFieldValue("dateFinPlanifiee", value)
                            }}
                            value={formik.values.dateFinPlanifiee ? formik.values.dateFinPlanifiee : null}
                            error={formik.errors.dateFinPlanifiee}
                            helperText={formik.errors.dateFinPlanifiee}
                        />
                    </Grid>
                </Grid>
                <Grid item lg={3} md={3} sm={12} xs={12}>

                </Grid>
            </Grid>
        </Item>
    )
}

export default PlanifierInventaire;