import React from 'react'
import { MatxLogo } from 'app/template/components'
import { Span } from '../Typography'
import { styled, Box } from '@mui/system'
import useSettings from 'app/template/hooks/useSettings'

const BrandRoot = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 18px 20px 7px',
}))

const StyledSpan = styled(Span)(({ theme, mode }) => ({
    fontSize: 18,
    marginLeft: '.5rem',
    display: mode === 'compact' ? 'none' : 'block',
}))

const Brand = ({ children }) => {
    const { settings } = useSettings()
    const leftSidebar = settings.layout1Settings.leftSidebar
    const { mode } = leftSidebar

    return (
        <BrandRoot>
            <Box id='hkh_01' display="flex" alignItems="center">
                <MatxLogo />
                <StyledSpan mode={mode} className="sidenavHoverShow">
                    Immobilisation
                </StyledSpan>
            </Box>
            <Box
                className="sidenavHoverShow"
                sx={{ display: mode === 'compact' ? 'none' : 'block' }}
            >
                {children || null}
            </Box>
        </BrandRoot>
    )
}

export default Brand
