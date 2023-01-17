import { Card } from 'primereact/card'
import { Grid } from '@mui/material'
import HeaderVignette from 'app/core/components/generic/headerVignette/HeaderVignette'

const Vignette = (props) => {
    const header = () => <HeaderVignette title={props.title} />
    return (
        <Card className='vignette' header={header}>
            <Grid container rowSpacing={0}>
                <Grid container rowSpacing={2}>
                    {
                        props.items && props.items.map((el) => {
                            return (
                                <Grid item lg={12} md={12} sm={12} xs={12}>
                                    <label>{el.label} <span>{el.value}</span></label>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </Card>
    )
}

export default Vignette