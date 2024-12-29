import { Facebook, Whatsapp, Instagram } from 'react-bootstrap-icons'
import Link from 'next/link'
import './contacto.sass'


export default function Contacto() {


  return(
    <section id="contactoContain">
      <h2>CONTACTO</h2>
      <div className="contactoInner">
        <div className="video"></div>
        <div className="redesContain">
          <h3>REDES:</h3>
          <div className="redesInner">
            <Link href="https://www.facebook.com/profile.php?id=61562258850072&mibextid=LQQJ4d"><Facebook size={30} color="dark"/><p>Facebook</p></Link>
          </div>
          <div className="redesInner">
            <Link href="https://wa.me/6871406011"><Whatsapp size={30}/><p>Whatsapp</p></Link>
          </div>
          <div className="redesInner">
            <Link href="https://www.instagram.com/sorteosjplosmochis?igsh=bDlwOXhkNTVldXUy"><Instagram size={30}/><p>Instagram</p></Link>
          </div>
        </div>
        </div>
    </section>
  )
}