import Boletos from "@/layouts/Boletos/Boletos";
import Contacto from "@/layouts/Contacto/Contacto";
import Inicio from "@/layouts/Inicio/Inicio";
import Pagos from "@/layouts/Pagos/Pagos";
import './main.sass'
import Footer from "@/layouts/Footer/Footer";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <meta name="facebook-domain-verification" content="zdm34a265j0uckz3hqiwinpxpj1oa9" />
      </Head>
      <Inicio/>
      <Boletos/>
      <Pagos/>
      <Contacto/>
      <Footer/>
    </>
  );
}
