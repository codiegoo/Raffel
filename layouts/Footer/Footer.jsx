
import Image from 'next/image'
import './footer.sass'
import Link from 'next/link'

export default function Footer() {


  return(
    <footer>
      <Link href="https://web-build-dreams.vercel.app/"><Image src="/images/logoWBD.jpeg" width={230} height={50} alt="logtipo de la empresa WebBuildDreams"/></Link>
      <p>Sitio web desarrollado por <a href="https://web-build-dreams.vercel.app/">WebBuildDreams</a> | Copyright &copy; 2024</p>
    </footer>
  )
}