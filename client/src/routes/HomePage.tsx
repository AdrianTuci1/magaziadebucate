import { useNavigate } from 'react-router-dom'
import RecipeSlider from '../components/RecipeSlider'
import '../styles/homepage.scss'
import LegendaIcn from '../components/LegendaIcn';
import PrezentarePlan from '../components/PrezentarePlan';
import Footer from '../components/Footer';

function HomePage() {

  const navigate = useNavigate();

  const handleCreateAccount = () => {
    navigate('/inregistrare')
  };

  const handleViewPublicRecipes = () => {
    navigate('/retete')
  };

  return (
    <>
    <div className="pagina">
    <div className="sectiune_1 pattern-grid-md">
      <div className="stanga">
        <h1 className='text_big'>CAUTA <a className='strong'>RETETELE</a> TALE PREFERATE</h1>
        <h2>
        AICI GASESTI CELE MAI BUNE RETETE DE MANCARE!
        </h2>
        <p>
                PAGINA FUNCȚIONEAZĂ CA O RETEA SOCIALA,
        ALEGE DIN RETELELE POSTATE DE UTILIZATORI SAU
        CREAZĂ-ȚI PROPRIILE RETETE. POȚI ADAUGA LA FAVORITE
        SAU GESTIONA RETELE TALE ȘI POȚI CREA UN PLAN DE MÂNCARE
        PENTRU URMATOARELE ZILE.
        </p>
        <div className='buttons'>
        <button className='btn btn-primary' onClick={handleViewPublicRecipes}>VEZI RETETELE</button>
        <button className='btn btn-secondary' onClick={handleCreateAccount}>ALATURA-TE</button>
        </div>
      </div>
      <div className="dreapta">
        <img src="chicken.jpg" alt="" className='img02'/>
        <img src="gogosi.avif" alt="" className='img01'/>
      </div>
    </div>
    <div className="pluses">
    </div>
    <div className="sectiune_2">
      <RecipeSlider />
    </div>
    <div className="pluses">
    </div>
    <div className="sectiune_3">
      <LegendaIcn />
      <PrezentarePlan />
    </div>
    <div className="sectiune_3">
      <div className="grat-wr" style={{overflowX:'hidden'}}>
      <h1>100% GRATUIT</h1>
      <span>ACEST SERVICIU VA FI MEREU GRATUIT</span>
      </div>
    </div>
    <div className="pluses"></div>
    <div className="footeri">
      <Footer />
    </div>
    </div>
    </>
  )
}

export default HomePage