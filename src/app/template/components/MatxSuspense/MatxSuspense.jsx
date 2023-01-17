import React, { Suspense } from 'react'
import { MatxLoading } from 'app/template/components'

const MatxSuspense = ({ children }) => {
    return <Suspense fallback={<MatxLoading />}>{children}</Suspense>
}

export default MatxSuspense
