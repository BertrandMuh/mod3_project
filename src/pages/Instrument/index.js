
import { Link } from 'react-router-dom'
import Analysis from '../../components/Analysis'
import InstrumentTable from '../../components/Instrument-table'
import './index.css'

const Instrument = () => {
    return (
        <div className='instru-page'>
            <div className='return-arrow'>
                <Link to='/trading-avenue.com' title='Go to home page' className='fa fa-chevron-left'></Link>
            </div>

            <div className='instrument-div'>
                <InstrumentTable />
                {/* <Analysis /> */}
            </div>
        </div>
    )
}

export default Instrument