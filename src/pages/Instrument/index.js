
import { Link, useNavigate } from 'react-router-dom'
import Analysis from '../../components/Analysis'
import InstrumentTable from '../../components/Instrument-table'
import './index.css'

const Instrument = () => {
    let navigate = useNavigate()

    return (
        <div>
            <div className='return-arrow'>
                <Link to='/trading-avenue.com' className='fa fa-chevron-left'></Link>
            </div>
            <div className='instrument-div'>
                <InstrumentTable />
                <Analysis />
            </div>
        </div>
    )
}

export default Instrument