import React from 'react'
import { Breadcrumb, SimpleCard } from 'app/template/components'
import { Box, styled } from '@mui/system'
import Container from 'app/core/components/generic/container/Container'

const Parametrage = () => {
    return (
        <Container>
            <div className="breadcrumb">
                <Breadcrumb
                    routeSegments={[
                        { name: 'Paramétrage'},
                    ]}
                />
            </div>
            Paramétrage
        </Container>
    )
}

export default Parametrage;
