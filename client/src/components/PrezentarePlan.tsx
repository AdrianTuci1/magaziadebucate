import '../styles/prezentareplan.scss'

function PrezentarePlan() {
  return (
    <div className="prez-plan">
        <div className="prez-imag">
            <img src="/prezentareplan.png" alt="prezentare" className='prez-imag-im' style={{minWidth:'500px', overflow:'hidden'}}/>
        </div>
        <div className="prez-desc">
            <div className="prez-desc-wr">
            <h2><img src="/path.png" alt="path" style={{width:'60px'}}/>PLAN ALIMENTAR</h2>
            <span>
                PENTRU CA TOTUL SA MEARGA CA LA CARTE AI NEVOIE DE UN PLAN. <br />
                AM CREEAT UN MOD INTERACTIV DE A GESTIONA RETELE PREFERATE,
                POTI PLANIFICA CE VEI MANCA TOATA SAPTAMANA IN AVANS!
            </span>
            </div>
        </div>
    </div>
  )
}

export default PrezentarePlan