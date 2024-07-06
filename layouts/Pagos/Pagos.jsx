

import Image from 'next/image'
import './pagos.sass'

export default function Pagos() {

  return(
    <section id="pagosContain">
      <h2>METODOS DE PAGO</h2>
      <div className="cardsContain">
        <div class="card">
            <div class="card-inner">
                <div class="front">
                    <Image width={500} height={300} src="/images/map.png" class="map-img"></Image>
                    <div class="row">
                        <Image src="/images/chip.png" width={60} height={40}></Image>
                        <Image src="/images/visa.png" width={50} height={25}></Image>
                    </div>
                    <div class="card-no">
                        <p>5244 2150 8252 6420</p>
                    </div>
                    <div className="nameContain">
                      <p>Nombre Nombre Apellido Apellido</p>
                    </div>
                </div>
          </div>
        </div>
        <div class="card">
            <div class="card-inner">
                <div class="front">
                    <Image width={500} height={300} src="/images/map.png" class="map-img"></Image>
                    <div class="row">
                        <Image src="/images/chip.png" width={60} height={40}></Image>
                        <Image src="/images/visa.png" width={50} height={25}></Image>
                    </div>
                    <div class="card-no">
                      <p>5244 2150 8252 6420</p>
                    </div>
                    <div className="nameContain">
                      <p>Nombre Nombre Apellido Apellido</p>
                    </div>
                </div>
          </div>
        </div>
      </div>
      <div className="textContain">
        <h3>NOTAS</h3>
        <p>✨ Los pagos deben realizarse como transferencia electrónica o deposito en efectivo. ✅</p>
        <p>✨ En el concepto debes poner los boletos que elegiste. ✅</p>
        <p>✨ Toma una captura de tu transferencia exitosa y mandala al chat donde apartaste tus boletos para confirmar el pago. ✅</p>
        <p>✨ Debes realizar el pago lo mas rapido posible. ✅</p>
        <p>✨ Si pagaste y te ganaron un boleto seras notificado para elegir. ✅</p>
      </div>
    </section>
  )
}