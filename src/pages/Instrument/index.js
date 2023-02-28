
import Analysis from '../../components/Analysis'

import InstrumentTable from '../../components/Instrument-table'


import './index.css'

const Instrument = () => {
    return (
        <div className='instrument-div'>
            <InstrumentTable />
            <Analysis />
        </div>
    )
}

export default Instrument