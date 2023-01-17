
import React from 'react'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import _ from 'lodash'
import { Dropdown } from 'primereact/dropdown';
import { classNames } from 'primereact/utils';




const SelectEditor = (props) => {
    return (
        <>
            {
                props.isObject === true && <Dropdown style={{ width: '100%' }} value={props.options.value} options={props.list} optionLabel="libelle"
                    onChange={(e) => props.options.editorCallback(e.value)}
                    placeholder="Choisir ..."
                    required
                    autoFocus
                    className={props.obligatoire && classNames({ 'p-invalid': !props.options.value.id })}
                    itemTemplate={(el) => {
                        return <span>{el.libelle}</span>
                    }} />
            }

            {
                props.isObject === false && <Dropdown value={props.options.value} options={props.list} optionLabel="libelle" optionValue='id'
                    onChange={(e) => props.options.editorCallback(e.value)}
                    placeholder="Choisir ..."
                    required
                    autoFocus
                    className={props.obligatoire && classNames({ 'p-invalid': !props.options.value.id })}
                    itemTemplate={(el) => {
                        return <span>{el.libelle}</span>
                    }} />
            }
        </>


    )
}

export default SelectEditor;