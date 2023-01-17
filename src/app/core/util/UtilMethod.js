export const convertToNodesTree = (listStructureMere, listAllStructure) => {
    var listNodeTree = []
    for (var index in listStructureMere) {
        var node = {
            key: listStructureMere[index].id,
            label: listStructureMere[index].libelle,
            data: listStructureMere[index],
            icon: "pi pi-fw pi-inbox",
            leaf: false,
        }
        const listRech = listAllStructure.filter(s => s.structureMere !== null && s.structureMere.id === listStructureMere[index].id)
        if (listRech.length > 0) {
            listStructureMere[index].listFille = listRech
            node.children = convertToNodesTree(listStructureMere[index].listFille, listAllStructure)
        }
        listNodeTree.push(node)
    }
    return listNodeTree;
}

export const convertFamillesToNodesTree = (listFamilleMere, listAllFamille, listAllArticle) => {
    var listNodeTree = []
    for (var index in listFamilleMere) {
        var node = {
            key: listFamilleMere[index].id,
            label: listFamilleMere[index].libelle,
            data: listFamilleMere[index],
            icon: "pi pi-wallet",
            leaf: false
        }
        const listRech = listAllFamille.filter(f => f.familleMere !== null && f.familleMere.id === listFamilleMere[index].id)
        if (listRech.length > 0) {
            listFamilleMere[index].listFille = listRech
            node.children = convertFamillesToNodesTree(listFamilleMere[index].listFille, listAllFamille, listAllArticle)
        }
        const listArticleFille = listAllArticle.filter(a => a.famille.id === listFamilleMere[index].id)
        if (listArticleFille.length > 0) {
            if (!node.children || node.children === null) {
                node.children = []
            }
            for (var index2 in listArticleFille) {
                var nodeArt = {
                    key: listArticleFille[index2].id,
                    label: listArticleFille[index2].libelle,
                    data: listArticleFille[index2],
                    icon: "pi pi-bookmark-fill",
                    leaf: false
                }
                node.children.push(nodeArt)
            }
        }
        listNodeTree.push(node)
    }
    return listNodeTree;
}

export const convertStrAndImmoInvToNodesTree = (listStructureMere, listStructure, listImmo) => {
    let listNodeTree = []
    for (const strMere of listStructureMere) {
        let node = {
            key: strMere.id,
            label: strMere.libelle,
            data: strMere,
            icon: "pi pi-fw pi-inbox",
            leaf: true,
            children: []
        }
        const listImmoStr = listImmo.filter(i => i.structureActuel.id === strMere.id)
        if (listImmoStr.length > 0) {
            for (const immo of listImmoStr) {
                const nodeFils = {
                    key: immo.id,
                    label: immo.numInventaire + '-' + immo.designation,
                    data: immo,
                    className: immo.etatInv,
                    icon: getIconForImmo(immo),
                    leaf: false,
                }
                node.children.push(nodeFils)
            }
        }
        const listStrFils = listStructure.filter(s => s.structureMere !== null && s.structureMere.id === strMere.id)
        if (listStrFils.length > 0) {
            node.children.push.apply(node.children, convertStrAndImmoInvToNodesTree(listStrFils, listStructure, listImmo))
        }
        listNodeTree.push(node)
    }
    return listNodeTree;
}

export const expandAllNodes = (nodes) => {
    let expandedKeys = {};
    for (let node of nodes) {
        expandNode(node, expandedKeys);
    }
    return expandedKeys
}

const expandNode = (node, expandedKeys) => {
    if (node.children && node.children.length) {
        expandedKeys[node.key] = true;

        for (let child of node.children) {
            expandNode(child, expandedKeys);
        }
    }
}

const getIconForImmo = (immo) => {
    switch (immo.etatInv) {
        case 'IDF':
            return 'pi pi-fw pi-check-circle'
        case 'IDF_OTHER':
            return 'pi pi-fw pi-directions-alt'
        case 'IDF_ADD':
            return 'pi pi-fw pi-plus-circle'
        case 'IDF_MISS':
            return 'pi pi-fw pi-minus-circle'
        case 'NIDF':
            return 'pi pi-fw pi-times-circle'
        default:
            return 'pi pi-fw pi-inbox'
    }
}