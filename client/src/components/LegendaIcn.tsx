import ImageGallery from "./ImageGallery"
import '../styles/legenda.scss'


const images = [
    { url: '/easy.png', description: 'DIFICULTATE: Poate fi de 3 feluri, acest simbol reprezinta dificultate scazuta.' },
    { url: '/price.png', description: 'PRET: Pretul este reprezentat de aceasta imagine, valoarea maxima este 4.' },
    { url: '/prepare.png', description: 'TIMP DE PREPARARE: Timpul necesar pentru prepararea mancarii, nu include timpul de gatit.' },
    { url: '/cook.png', description: 'TIMP DE GATIT: Timpul de gatit, poate fi la plita, cuptor sau airfryer.' },
    { url: '/maincourse.png', description: 'FEL PRINCIPAL: Reteta este servita ca fel principal.' },
    { url: '/desert.png', description: 'DESERT: Dulciuri, inghetata, prajituri, smoothie-uri.' },
    { url: '/salad.png', description: 'SALATA' },
    { url: '/supe.png', description: 'SUPE' },
    { url: '/sushi.png', description: 'SUSHI' },
    { url: '/protein.png', description: 'BOGAT IN PROTEINE: Aceste alimente sunt consistente si au un continut mare de proteine.' },
    { url: '/vegan.png', description: 'VEGAN: nu include carne, oua...' },
    { url: '/traditional.png', description: 'TRADITIONAL: reteta traditionala' },
    { url: '/balanced.png', description: 'BALANSAT: Potrivit pentru cei ce au nevoie de o alimentatie calculata.' },
  ];


function LegendaIcn() {
  return (
    <div className="stil-icn">
        <div className="stil-desc">
            <div className="stil-desc-wr">
                <h2> <img src="/traditionalmain.png" alt="dao" style={{width:'70px', height:'70px'}} />SIMBOLURI INTUITIVE</h2>
                <span>
                    FOLOSIM SIMBOLURI INTUITIVE SI UN SISTEM DE FILTRARE COMPLEX CA RETELE NOASTRE SA FIE MAI USOR DE RECUNOSCUT SI GASIT.
                </span>
            </div>
        </div>
        <div className="stil-comp">
            <ImageGallery images={images} />
        </div>
    </div>
  )
}

export default LegendaIcn