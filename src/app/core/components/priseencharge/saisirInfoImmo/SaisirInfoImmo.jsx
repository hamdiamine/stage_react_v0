import React, { useEffect } from 'react'
import { Fieldset } from 'primereact/fieldset';
import { Autocomplete, Grid, TextField } from '@mui/material'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import ActionsMenu from '../../generic/actionsMenu/ActionsMenu';
import { priseEnChargeActions } from 'app/core/store/priseencharge/PriseEnChargeSlice';
import { TreeSelect } from 'primereact/treeselect';
import { fetchListCaracteristiqueImmoByTypeAndOrg } from '../../../store/parametrage/CaracteristiqueImmoAction'



const SaisirInfoImmo = () => {
    const dispatch = useDispatch();
    const currentOrganisation = useSelector((state) => state.organisation.currentOrganisation)
    const listArticle = useSelector((state) => state.article.listArticle)
    const articleImmo = useSelector((state) => state.priseencharge.articleImmo)
    const listVocMethAmort = useSelector((state) => state.famille.listVocMethodeAmort)
    const listVocNatProp = useSelector((state) => state.priseencharge.listVocNatProp)
    const listVocNatUtils = useSelector((state) => state.priseencharge.listVocNatUtils)
    const listCaracteristiqueImmo = useSelector((state) => state.caracteristiqueImmo.listCaracteristiqueImmo)
    const structuresNodeTree = useSelector((state) => state.structure.listNodeTree)
    const listImmobilisation = useSelector((state) => state.priseencharge.listImmobilisation)
    const listStructure = useSelector((state) => state.structure.listStructure)
    const validate = values => {
        const errors = {};

        if (!values.article || !values.article.id || values.article.id <= 0) {
            errors.article = 'Obligatoire';
        }

        if (!values.quantite) {
            errors.quantite = 'Obligatoire';
        } else if (values.quantite <= 0) {
            errors.quantite = 'Quantité invalide';
        } else if (values.quantite > 100) {
            errors.quantite = 'Quantité doit être inférieur à 100';
        }

        if (!values.prixUntHt) {
            errors.prixUntHt = 'Obligatoire';
        } else if (values.prixUntHt <= 0) {
            errors.prixUntHt = 'Prix invalide';
        }

        if (!values.tauxTva) {
            errors.tauxTva = 'Obligatoire';
        } else if (values.tauxTva <= 0 || values.tauxTva > 100) {
            errors.tauxTva = 'Taux tva invalide';
        }

        if (!values.methodeFiscale || !values.methodeFiscale.id || values.methodeFiscale.id <= 0) {
            errors.methodeFiscale = 'Obligatoire';
        }

        if (!values.tauxAmort) {
            errors.tauxAmort = 'Obligatoire';
        } else if (values.tauxAmort < 0) {
            errors.tauxAmort = 'Taux amortissement invalide';
        }

        if (!values.naturePropriete || !values.naturePropriete.id || values.naturePropriete.id <= 0) {
            errors.naturePropriete = 'Obligatoire';
        }

        if (!values.natureUtilisation || !values.natureUtilisation.id || values.natureUtilisation.id <= 0) {
            errors.natureUtilisation = 'Obligatoire';
        }

        if (values.memeStructure && values.communStructureImmo === null) {
            errors.communStructureImmo = 'Obligatoire';
        }

        if (!values.memeStructure && values.listStructureImmo && values.listStructureImmo.filter(s => s.structure.id === -1).length > 0) {
            errors.listStructureImmo = 'Obligatoire';
        }

        if (values.listInfoImmo && values.listInfoImmo.filter(i => i.numInv === '' || i.tag === '').length > 0) {
            errors.listInfoImmo = 'Obligatoire';
        }

        return errors;
    }
    const submit = (values) => {
        let listNewImmobilisation = []
        const length = listImmobilisation.length;
        for (let index = 0; index < values.quantite; index++) {
            listNewImmobilisation.push({
                id: -1 * (length + index + 1),
                designation: values.article.libelle,
                article: values.article,
                valeurAcquisition: values.prixUntHt,
                methodeFiscal: values.methodeFiscale,
                tauxAmort: values.tauxAmort,
                typeCaract: values.article.type,
                marque: values.article.marque,
                modele: values.article.modele,
                natureProp: values.naturePropriete,
                natureImmo: values.natureUtilisation,
                structureActuel: values.memeStructure ? listStructure.find(s => s.id === parseInt(values.communStructureImmo)) : values.listStructureImmo[index].structure,
                listValeurCaracteristique: values.listValeurCaracteristique.map(v => { return { ...v, id: undefined } }),
                numInventaire: values.listInfoImmo[index].numInv,
                tag: values.listInfoImmo[index].tag,
                immatriculation: values.listInfoImmo[index].immat,
                codeABarre: values.listInfoImmo[index].codeABarre,
                numSerie: values.listInfoImmo[index].numSerie
            })
        }
        dispatch(priseEnChargeActions.setAddedImmobilisations({ immobilisationsToAdd: listNewImmobilisation }))
        dispatch(priseEnChargeActions.setDisplayAddPopup({ displayAddPopup: false }))
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: articleImmo,
        validate,
        onSubmit: submit,

    })

    useEffect(() => {
        const newList = listCaracteristiqueImmo.map((element, index) => {
            return {
                id: -1 * (index + 1),
                caracteristiqueImmo: element,
                valeur: null,
                commentaire: null
            }
        })
        formik.setFieldValue("listValeurCaracteristique", newList)
    }, [dispatch, listCaracteristiqueImmo])

    const onChangeQuantitehandle = (e) => {
        let structureArray = []
        let infoImmoArray = []
        if (e.target.valueAsNumber > 0 && e.target.valueAsNumber <= 100) {
            for (let index = 0; index < e.target.valueAsNumber; index++) {
                structureArray.push({ id: index + 1, structure: { id: -1 } })
                infoImmoArray.push({ id: index + 1, numInv: '', tag: '', codeABarre: '', immat: '', numSerie: '' })
            }
        }

        formik.setFieldValue("listStructureImmo", structureArray)
        formik.setFieldValue("listInfoImmo", infoImmoArray)
        formik.handleChange(e)
    }

    const cancelHandle = () => {
        dispatch(priseEnChargeActions.setDisplayAddPopup({ displayAddPopup: false }))
    }

    const setSelectedNode = (e, data) => {
        const list = formik.values.listStructureImmo
        const index = list.findIndex(s => s.id === data.id)
        list[index].structure = listStructure.find(s => s.id === e.value)
        formik.setFieldValue("listStructureImmo", list)
    }

    const onChangeArticleHandle = (e, value) => {
        if (value && value != null) {
            if (value.type && value.type !== null && value.type.id > 0) {
                dispatch(fetchListCaracteristiqueImmoByTypeAndOrg(value.type.id, currentOrganisation.id))
            }
            if (value.methodeAmortissement && value.methodeAmortissement !== null && value.methodeAmortissement.id > 0) {
                formik.setFieldValue("methodeFiscale", value.methodeAmortissement)
            }
            if (value.tauxAmortissement && value.tauxAmortissement != null) {
                formik.setFieldValue("tauxAmort", value.tauxAmortissement)
            }
            formik.setFieldValue("article", value)
        }

    }

    const onChangeCheckHandle = (e) => {
        formik.handleChange(e)
    }

    const onChangeStructureImmoHandle = (e) => {
        formik.setFieldValue("communStructureImmo", e.value.toString())
    }

    const onChangeValeurHandle = (e, data) => {
        const list = formik.values.listValeurCaracteristique
        const index = list.findIndex(v => v.id === data.id)
        list[index].valeur = e.target.value
        formik.setFieldValue("listValeurCaracteristique", list)
    }

    const onChangeCommentaireHandle = (e, data) => {
        const list = formik.values.listValeurCaracteristique
        const index = list.findIndex(v => v.id === data.id)
        list[index].commentaire = e.target.value
        formik.setFieldValue("listValeurCaracteristique", list)
    }

    const onChangeInfoImmoHandle = (e, data) => {
        const list = formik.values.listInfoImmo
        const index = list.findIndex(v => v.id === data.id)
        switch (data.champ) {
            case 'numInv':
                list[index].numInv = e.target.value
                break
            case 'tag':
                list[index].tag = e.target.value
                break
            case 'codeABarre':
                list[index].codeABarre = e.target.value
                break
            case 'immat':
                list[index].immat = e.target.value
                break
            case 'numSerie':
                list[index].numSerie = e.target.value
                break
            default:
                break;
        }
        formik.setFieldValue("listInfoImmo", list)
    }

    const structureBodyTemplate = (rowData) => {
        const selectedNode = (data) => {
            const index = formik.values.listStructureImmo.findIndex(s => s.id === data.id)
            return index >= 0 ? formik.values.listStructureImmo[index].structure.id.toString() : null
        }
        return (
            <>
                <TreeSelect
                    className={rowData.structure.id < 0 ? 'full-width custom-required' : 'full-width'}
                    options={structuresNodeTree}
                    filter
                    value={selectedNode(rowData)}
                    onChange={(e) => setSelectedNode(e, rowData)}
                >
                </TreeSelect>
                {rowData.structure.id < 0 && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-ftcob6-MuiFormHelperText-root" id="naturePropriete-helper-text">Obligatoire</p>}

            </>
        )
    }

    const infoImmoBodyTemplate = (rowData) => {
        const valueInfoImmo = (rowData) => {
            switch (rowData.champ) {
                case 'numInv':
                    return rowData.numInv
                case 'tag':
                    return rowData.tag
                case 'codeABarre':
                    return rowData.codeABarre
                case 'immat':
                    return rowData.immat
                case 'numSerie':
                    return rowData.numSerie
                default:
                    break;
            }
        }
        return (
            <div className='flex flex-column'>
                <TextField id={rowData.champ || rowData.id} size="small" onChange={(e) => onChangeInfoImmoHandle(e, rowData)}
                    value={valueInfoImmo(rowData)} />
                {(rowData.champ === 'numInv' && rowData.numInv === '' || rowData.champ === 'tag' && rowData.tag === '') && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-ftcob6-MuiFormHelperText-root" id="naturePropriete-helper-text">Obligatoire</p>}
            </div>
        )
    }

    const caracteristiqueBodyTemplate = (rowData) => {
        return <span>{rowData.caracteristiqueImmo.libelle}</span>
    }

    const valeurBodyTemplate = (rowData) => {
        return <TextField id={"valeur_id_" || rowData.id} size="small" onChange={(e) => onChangeValeurHandle(e, rowData)}
            value={rowData.valeur ? rowData.valeur : ''} />
    }

    const commentaireBodyTemplate = (rowData) => {
        return <TextField id={"commentaire_id_" || rowData.id} size="small" onChange={(e) => onChangeCommentaireHandle(e, rowData)}
            value={rowData.commentaire ? rowData.commentaire : ''} />
    }
    return (
        <>
            <ActionsMenu
                key="03"
                titre=""
                afficheBtnMenu="1"
                withSave="1"
                withCancel="1"
                selectedItem="1"
                onSave={formik.handleSubmit}
                onCancel={cancelHandle}
            ></ActionsMenu>
            <Grid container rowSpacing={4}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Fieldset legend="Informations article:" className='small-fieldset' toggleable>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Autocomplete
                                    options={listArticle}
                                    style={{ width: "94%" }}
                                    id="article"
                                    size="small"
                                    onChange={onChangeArticleHandle}
                                    value={formik.values.article ? formik.values.article : {}}
                                    getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={formik.errors.article}
                                            helperText={formik.errors.article}
                                            label="Article *"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField id="quantite" type="number" label="Quantité *" variant="outlined" size="small" onChange={onChangeQuantitehandle}
                                    value={formik.values.quantite ? formik.values.quantite : ''} error={formik.errors.quantite} helperText={formik.errors.quantite} />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField id="prixUntHt" type="number" min="0" label="Prix unitaire HT *" variant="outlined" size="small" onChange={formik.handleChange}
                                    value={formik.values.prixUntHt ? formik.values.prixUntHt : ''} error={formik.errors.prixUntHt} helperText={formik.errors.prixUntHt} />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField id="tauxTva" type="number" min="0" max="100" label="Taux TVA *" variant="outlined" size="small" onChange={formik.handleChange}
                                    value={formik.values.tauxTva ? formik.values.tauxTva : ''} error={formik.errors.tauxTva} helperText={formik.errors.tauxTva} />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Autocomplete
                                    options={listVocMethAmort}
                                    style={{ width: "94%" }}
                                    id="methodeFiscale"
                                    size="small"
                                    onChange={(e, value) => {
                                        formik.setFieldValue("methodeFiscale", value)
                                    }}
                                    value={formik.values.methodeFiscale ? formik.values.methodeFiscale : {}}
                                    getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={formik.errors.methodeFiscale}
                                            helperText={formik.errors.methodeFiscale}
                                            label="Méthode fiscale *"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <TextField id="tauxAmort" type="number" min="0" max="100" label="Taux d'amortissement *" variant="outlined" size="small" onChange={formik.handleChange}
                                    value={formik.values.tauxAmort ? formik.values.tauxAmort : ''} error={formik.errors.tauxAmort} helperText={formik.errors.tauxAmort} />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Autocomplete
                                    options={listVocNatProp}
                                    style={{ width: "94%" }}
                                    id="naturePropriete"
                                    size="small"
                                    onChange={(e, value) => {
                                        formik.setFieldValue("naturePropriete", value)
                                    }}
                                    value={formik.values.naturePropriete ? formik.values.naturePropriete : {}}
                                    getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={formik.errors.naturePropriete}
                                            helperText={formik.errors.naturePropriete}
                                            label="Nature propriété *"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                                />
                            </Grid>
                            <Grid item lg={3} md={3} sm={12} xs={12}>
                                <Autocomplete
                                    options={listVocNatUtils}
                                    style={{ width: "94%" }}
                                    id="natureUtilisation"
                                    size="small"
                                    onChange={(e, value) => {
                                        formik.setFieldValue("natureUtilisation", value)
                                    }}
                                    value={formik.values.natureUtilisation ? formik.values.natureUtilisation : {}}
                                    getOptionLabel={(option) => (option && option !== null && option.libelle) ? option.libelle : ""}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            error={formik.errors.natureUtilisation}
                                            helperText={formik.errors.natureUtilisation}
                                            label="Nature utilisation *"
                                        />
                                    )}
                                    isOptionEqualToValue={(option, value) => value && value.id && option.id === value.id}
                                />
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Fieldset legend="Informations immobilisations:" className='small-fieldset' toggleable>
                        <DataTable
                            className="data-display"
                            value={formik.values.listInfoImmo}
                            dataKey="id"
                            responsiveLayout="scroll"
                            columnResizeMode="fit"
                            showGridlines
                            scrollable
                            scrollHeight="300px"
                            scrollDirection="both">
                            <Column
                                field="id"
                                header="Rang"
                                style={{ width: '5%' }}
                            ></Column>
                            <Column
                                field="numInv"
                                header="Num inventaire"
                                body={(rowData) => infoImmoBodyTemplate({ ...rowData, champ: 'numInv' })}
                                style={{ width: '15%' }}
                            ></Column>
                            <Column
                                field="tag"
                                header="Tag"
                                body={(rowData) => infoImmoBodyTemplate({ ...rowData, champ: 'tag' })}
                                style={{ width: '20%' }}
                            ></Column>
                            <Column
                                field="codeABarre"
                                header="Code à barre"
                                body={(rowData) => infoImmoBodyTemplate({ ...rowData, champ: 'codeABarre' })}
                                style={{ width: '20%' }}
                            ></Column>
                            <Column
                                field="immat"
                                header="Immatriculation"
                                body={(rowData) => infoImmoBodyTemplate({ ...rowData, champ: 'immat' })}
                                style={{ width: '20%' }}
                            ></Column>
                            <Column
                                field="numSerie"
                                header="Num serie"
                                body={(rowData) => infoImmoBodyTemplate({ ...rowData, champ: 'numSerie' })}
                                style={{ width: '20%' }}
                            ></Column>
                        </DataTable>
                    </Fieldset>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Fieldset legend="Affectations aux structures:" className='small-fieldset' toggleable>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <FormControlLabel control={<Checkbox id="memeStructure" onChange={onChangeCheckHandle}
                                    checked={formik.values.memeStructure} />} label="Affecter tous les immobilisations à la même structure *" />
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                {
                                    formik.values.memeStructure ?
                                        <>
                                            <TreeSelect
                                                className={formik.values.communStructureImmo === null ? 'full-width custom-required' : 'full-width'}
                                                options={structuresNodeTree}
                                                filter
                                                value={formik.values.communStructureImmo}
                                                onChange={onChangeStructureImmoHandle}

                                            >
                                            </TreeSelect>
                                            {formik.values.communStructureImmo === null && <p class="MuiFormHelperText-root Mui-error MuiFormHelperText-sizeSmall MuiFormHelperText-contained css-ftcob6-MuiFormHelperText-root" id="naturePropriete-helper-text">Obligatoire</p>}
                                        </>
                                        :
                                        <DataTable
                                            className="data-display"
                                            value={formik.values.listStructureImmo}
                                            dataKey="id"
                                            responsiveLayout="scroll"
                                            columnResizeMode="fit"
                                            showGridlines
                                            scrollable
                                            scrollHeight="300px"
                                            scrollDirection="both">
                                            <Column
                                                field="id"
                                                header="Rang"
                                                style={{ width: '20%' }}
                                            ></Column>
                                            <Column
                                                field="structure"
                                                header="Structure"
                                                body={structureBodyTemplate}
                                                style={{ width: '80%' }}
                                            ></Column>
                                        </DataTable>
                                }
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Fieldset legend="Caractéristiques article:" className='small-fieldset' toggleable>
                        <Grid container rowSpacing={2} columnSpacing={2}>
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                                <DataTable
                                    className="data-display"
                                    value={formik.values.listValeurCaracteristique}
                                    dataKey="id"
                                    responsiveLayout="scroll"
                                    columnResizeMode="fit"
                                    showGridlines
                                    scrollable
                                    scrollHeight="300px"
                                    scrollDirection="both"
                                >
                                    <Column
                                        field="caracteristique"
                                        header="Caracteristque"
                                        body={caracteristiqueBodyTemplate}
                                        style={{ width: '25%' }}
                                    ></Column>
                                    <Column
                                        field="valeur"
                                        header="Valeur"
                                        body={valeurBodyTemplate}
                                        style={{ width: '25%' }}
                                    ></Column>
                                    <Column
                                        field="commentaire"
                                        header="Commentaire"
                                        body={commentaireBodyTemplate}
                                        style={{ width: '50%' }}
                                    ></Column>
                                </DataTable>
                            </Grid>
                        </Grid>
                    </Fieldset>
                </Grid>
            </Grid>
        </>

    )
}

export default SaisirInfoImmo