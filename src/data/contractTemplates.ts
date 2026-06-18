// Wedding contract templates — the canonical legal text, copied verbatim
// from the FotoStudio templates Eric authored (CA/ES × foto/vídeo/combo).
//
// These are embedded (not fetched) because the runtime can't reach
// FotoStudio. The website fills the {variables} and renders the contract
// itself (src/lib/contracts/*). If Eric edits a clause in FotoStudio,
// re-sync it here.
//
// Variables used: {firstname} {lastname} {vat} {street} {zipcode} {city}
//   {shoot_description} {shoot_date} {shoot_time} {shoot_place}
//   {shoot_price} {payment_plan} {photographer_name}

import type { Lang } from '~/i18n/ui';
import type { PackType } from '~/data/packs';

export type ContractServiceType = PackType; // 'photo' | 'video' | 'combo'

const CA_PHOTO = `<h2 style="text-align:center;">CONTRACTE DE REPORTATGE FOTOGRÀFIC DE BODA</h2>

<h3>REUNITS</h3>
<p>D'una banda, <strong>"Lifetime Weddings"</strong>, amb raó social <strong>Objectiu S.C.P.</strong>, CIF <strong>J43300581</strong>, i domicili fiscal al carrer Mare Molas, 26 de Reus, d'ara endavant <em>"els fotògrafs"</em>.</p>
<p>I de l'altra, <strong>{firstname} {lastname}</strong>, amb DNI <strong>{vat}</strong> i domicili a {street}, i <strong>{partner2_firstname} {partner2_lastname}</strong>, amb DNI <strong>{partner2_vat}</strong> i domicili a {partner2_street}, d'ara endavant <em>"la parella"</em>.</p>

<h3>INTERVENEN</h3>
<p>Les parts, actuant en el seu propi nom i dret, i reconeixent-se plena capacitat per obligar-se, acorden el present Contracte de Prestació de Serveis per a la <strong>{shoot_description}</strong>, manifestant que els fotògrafs disposen dels equips i coneixements necessaris per realitzar el treball requerit, i ho pacten d'acord amb les següents:</p>

<h3>CLÀUSULES</h3>

<h4>PRIMERA — OBJECTE DEL CONTRACTE</h4>
<p>L'objecte d'aquest contracte és la realització d'un reportatge <strong>fotogràfic</strong> el dia del casament de la parella.</p>
<p>Els clients accepten l'estil i criteri artístic mostrat prèviament pels professionals, no podent exigir modificacions d'estil que no hagin estat acordades abans de la signatura.</p>
<p>El servei es durà a terme el dia <strong>{shoot_date}</strong>.</p>
<p>La cerimònia està prevista a les <strong>{shoot_time}</strong> aproximadament, a <strong>{shoot_place}</strong>.</p>
<p>La cobertura inclourà des de l'inici acordat fins a 45 minuts – 1 hora després del primer ball, o fins a un màxim de 14 hores.</p>
<p>Els retards en l'inici o desenvolupament de l'esdeveniment no implicaran ampliació automàtica del temps contractat.</p>
<p>Qualsevol ampliació horària tindrà un cost addicional de <strong>150 €/hora</strong>.</p>

<h4>SEGONA — PRESSUPOST I FORMA DE PAGAMENT</h4>
<p>Els clients accepten el pressupost adjunt, per un import total de <strong>{shoot_price}</strong> (impostos inclosos).</p>
<p>Els pagaments es realitzaran segons el següent calendari:</p>
{payment_plan}
<p>La totalitat de l'import haurà d'estar abonada abans de l'entrega final del material.</p>
<p>La paga i senyal no serà reemborsable en cap cas.</p>
<p>En cas d'impagament, els fotògrafs podran suspendre l'entrega del treball fins a la seva regularització, sense que això suposi incompliment contractual.</p>

<h4>TERCERA — DESPESES I DESPLAÇAMENTS</h4>
<p>Les despeses de desplaçament i allotjament, si escau, estan detallades en el pressupost acceptat.</p>
<p>En cas de modificació d'ubicació que impliqui un desplaçament addicional no previst, els clients assumiran el cost segons tarifa vigent.</p>
<p>Si la cerimònia i/o banquet tenen lloc fora de la província de Tarragona, s'aplicarà una tarifa de <strong>0,35 €/km</strong>.</p>
<p>Si per horari o ubicació fos necessari, els clients també assumiran les despeses d'allotjament.</p>

<h4>QUARTA — PRESTACIÓ DEL SERVEI</h4>
<p>El servei inclou:</p>
<ul>
  <li>Fotografies des dels preparatius fins a 45 minuts després del primer ball.</li>
  <li>Edició bàsica de les imatges.</li>
  <li>Cobertura alternativa en cas de condicions meteorològiques adverses.</li>
</ul>
<p>Els professionals no es responsabilitzen de l'organització dels convidats ni de les condicions de llum del lloc de celebració.</p>

<h4>CINQUENA — ENTREGA DE LA FEINA</h4>
<p>Els professionals seleccionaran el millor material per a l'edició final.</p>
<p>Format i termini d'entrega:</p>
<ul>
  <li>Fotografies en JPG, màxima qualitat i sense marca d'aigua — termini màxim: <strong>60 dies (2 mesos)</strong>.</li>
</ul>
<p>No es lliuraran arxius RAW ni material en brut.</p>
<p>Una única revisió inclosa dins dels 15 dies posteriors a l'entrega. Revisió addicional: <strong>50 €/hora</strong>.</p>

<h4>SISENA — CANCEL·LACIONS I MODIFICACIONS</h4>
<p>Si la cancel·lació es produeix:</p>
<ul>
  <li>Amb més de 3 mesos d'antelació: s'abonarà el <strong>20% del total</strong>.</li>
  <li>Amb menys de 3 mesos d'antelació: s'abonarà el <strong>80% del total</strong>.</li>
</ul>
<p>Si s'ha realitzat part del servei (preboda, entrevistes, etc.), es calcularà el cost del treball efectuat.</p>
<p>En cas de força major (pandèmies, catàstrofes naturals o situacions imprevisibles), no hi haurà obligació de reemborsar la paga i senyal, però s'intentarà reprogramar el servei segons disponibilitat.</p>

<h4>SETENA — DRETS D'IMATGE I PROPIETAT INTEL·LECTUAL</h4>
<p>Els clients autoritzen la captació de la seva imatge i la dels convidats conforme a la Llei Orgànica 1/1982.</p>
<p>Autoritzen també la publicació de les imatges del reportatge a la pàgina web, xarxes socials i plataformes digitals dels professionals amb finalitats promocionals.</p>
<p>Aquesta autorització s'atorga amb caràcter indefinit i gratuït, podent ser revocada mitjançant comunicació escrita, sense efectes retroactius sobre el material ja publicat.</p>
<p>Els drets d'autor corresponen exclusivament a OBJECTIU S.C.P.</p>
<p>Queda prohibida la modificació, comercialització o ús amb finalitats lucratives del material sense autorització expressa.</p>

<h4>VUITENA — PROTECCIÓ DE DADES</h4>
<p>En compliment del Reglament (UE) 2016/679 i la Llei Orgànica 3/2018:</p>
<ul>
  <li>Responsable del tractament: Objectiu S.C.P.</li>
  <li>Finalitat: gestió contractual, facturació i entrega del material.</li>
  <li>Base legal: execució del contracte.</li>
  <li>Conservació: durant el termini legal necessari.</li>
  <li>Drets: accés, rectificació, supressió, limitació, oposició i portabilitat mitjançant comunicació escrita al domicili fiscal indicat.</li>
</ul>
<p>Les imatges podran formar part de l'arxiu professional dels fotògrafs.</p>

<h4>NOVENA — RESOLUCIÓ DE CONFLICTES</h4>
<p>Les parts intentaran resoldre qualsevol discrepància de manera amistosa.</p>
<p>En cas de no arribar a acord, amb renúncia expressa a qualsevol altre fur, se sotmeten als Jutjats i Tribunals de Reus.</p>

<br>
<p style="display:flex;justify-content:space-between;">
  <span><strong>Signat/</strong> (La Parella)</span>
  <span><strong>Signat/</strong> ({photographer_name})</span>
</p>`;

const CA_VIDEO = `<h2 style="text-align:center;">CONTRACTE DE REPORTATGE VIDEOGRÀFIC DE BODA</h2>

<h3>REUNITS</h3>
<p>D'una banda, <strong>"Lifetime Weddings"</strong>, amb raó social <strong>Objectiu S.C.P.</strong>, CIF <strong>J43300581</strong>, i domicili fiscal al carrer Mare Molas, 26 de Reus, d'ara endavant <em>"els videògrafs"</em>.</p>
<p>I de l'altra, <strong>{firstname} {lastname}</strong>, amb DNI <strong>{vat}</strong> i domicili a {street}, i <strong>{partner2_firstname} {partner2_lastname}</strong>, amb DNI <strong>{partner2_vat}</strong> i domicili a {partner2_street}, d'ara endavant <em>"la parella"</em>.</p>

<h3>INTERVENEN</h3>
<p>Les parts, actuant en el seu propi nom i dret, i reconeixent-se plena capacitat per obligar-se, acorden el present Contracte de Prestació de Serveis per a la <strong>{shoot_description}</strong>, manifestant que els videògrafs disposen dels equips i coneixements necessaris per realitzar el treball requerit, i ho pacten d'acord amb les següents:</p>

<h3>CLÀUSULES</h3>

<h4>PRIMERA — OBJECTE DEL CONTRACTE</h4>
<p>L'objecte d'aquest contracte és la realització d'un reportatge <strong>videogràfic</strong> el dia del casament de la parella.</p>
<p>Els clients accepten l'estil i criteri artístic mostrat prèviament pels professionals, no podent exigir modificacions d'estil que no hagin estat acordades abans de la signatura.</p>
<p>El servei es durà a terme el dia <strong>{shoot_date}</strong>.</p>
<p>La cerimònia està prevista a les <strong>{shoot_time}</strong> aproximadament, a <strong>{shoot_place}</strong>.</p>
<p>La cobertura inclourà des de l'inici acordat fins a 45 minuts – 1 hora després del primer ball, o fins a un màxim de 14 hores.</p>
<p>Els retards en l'inici o desenvolupament de l'esdeveniment no implicaran ampliació automàtica del temps contractat.</p>
<p>Qualsevol ampliació horària tindrà un cost addicional de <strong>150 €/hora</strong>.</p>

<h4>SEGONA — PRESSUPOST I FORMA DE PAGAMENT</h4>
<p>Els clients accepten el pressupost adjunt, per un import total de <strong>{shoot_price}</strong> (impostos inclosos).</p>
<p>Els pagaments es realitzaran segons el següent calendari:</p>
{payment_plan}
<p>La totalitat de l'import haurà d'estar abonada abans de l'entrega final del material.</p>
<p>La paga i senyal no serà reemborsable en cap cas.</p>
<p>En cas d'impagament, els videògrafs podran suspendre l'entrega del treball fins a la seva regularització, sense que això suposi incompliment contractual.</p>

<h4>TERCERA — DESPESES I DESPLAÇAMENTS</h4>
<p>Les despeses de desplaçament i allotjament, si escau, estan detallades en el pressupost acceptat.</p>
<p>En cas de modificació d'ubicació que impliqui un desplaçament addicional no previst, els clients assumiran el cost segons tarifa vigent.</p>
<p>Si la cerimònia i/o banquet tenen lloc fora de la província de Tarragona, s'aplicarà una tarifa de <strong>0,35 €/km</strong>.</p>
<p>Si per horari o ubicació fos necessari, els clients també assumiran les despeses d'allotjament.</p>

<h4>QUARTA — PRESTACIÓ DEL SERVEI</h4>
<p>El servei inclou:</p>
<ul>
  <li>Gravació en vídeo des dels preparatius fins a 45 minuts després del primer ball.</li>
  <li>Edició bàsica del vídeo.</li>
  <li>Cobertura alternativa en cas de condicions meteorològiques adverses.</li>
</ul>
<p>Els professionals no es responsabilitzen de l'organització dels convidats ni de les condicions de so del lloc de celebració.</p>

<h4>CINQUENA — ENTREGA DE LA FEINA</h4>
<p>Els professionals seleccionaran el millor material per a l'edició final.</p>
<p>Format i termini d'entrega:</p>
<ul>
  <li>Vídeo en MP4 (HD), durada aproximada de <strong>25 a 35 minuts</strong> — termini màxim: <strong>150 dies (5 mesos)</strong>.</li>
</ul>
<p>No es lliuraran arxius bruts ni material sense editar.</p>
<p>Una única revisió inclosa dins dels 15 dies posteriors a l'entrega. Revisió addicional: <strong>50 €/hora</strong>.</p>

<h4>SISENA — CANCEL·LACIONS I MODIFICACIONS</h4>
<p>Si la cancel·lació es produeix:</p>
<ul>
  <li>Amb més de 3 mesos d'antelació: s'abonarà el <strong>20% del total</strong>.</li>
  <li>Amb menys de 3 mesos d'antelació: s'abonarà el <strong>80% del total</strong>.</li>
</ul>
<p>Si s'ha realitzat part del servei (preboda, entrevistes, etc.), es calcularà el cost del treball efectuat.</p>
<p>En cas de força major (pandèmies, catàstrofes naturals o situacions imprevisibles), no hi haurà obligació de reemborsar la paga i senyal, però s'intentarà reprogramar el servei segons disponibilitat.</p>

<h4>SETENA — DRETS D'IMATGE I PROPIETAT INTEL·LECTUAL</h4>
<p>Els clients autoritzen la captació de la seva imatge i la dels convidats conforme a la Llei Orgànica 1/1982.</p>
<p>Autoritzen també la publicació de fragments del reportatge audiovisual a la pàgina web, xarxes socials i plataformes digitals dels professionals amb finalitats promocionals.</p>
<p>Aquesta autorització s'atorga amb caràcter indefinit i gratuït, podent ser revocada mitjançant comunicació escrita, sense efectes retroactius sobre el material ja publicat.</p>
<p>Els drets d'autor corresponen exclusivament a OBJECTIU S.C.P.</p>
<p>Queda prohibida la modificació, comercialització o ús amb finalitats lucratives del material sense autorització expressa.</p>

<h4>VUITENA — PROTECCIÓ DE DADES</h4>
<p>En compliment del Reglament (UE) 2016/679 i la Llei Orgànica 3/2018:</p>
<ul>
  <li>Responsable del tractament: Objectiu S.C.P.</li>
  <li>Finalitat: gestió contractual, facturació i entrega del material.</li>
  <li>Base legal: execució del contracte.</li>
  <li>Conservació: durant el termini legal necessari.</li>
  <li>Drets: accés, rectificació, supressió, limitació, oposició i portabilitat mitjançant comunicació escrita al domicili fiscal indicat.</li>
</ul>
<p>Les imatges podran formar part de l'arxiu professional dels videògrafs.</p>

<h4>NOVENA — RESOLUCIÓ DE CONFLICTES</h4>
<p>Les parts intentaran resoldre qualsevol discrepància de manera amistosa.</p>
<p>En cas de no arribar a acord, amb renúncia expressa a qualsevol altre fur, se sotmeten als Jutjats i Tribunals de Reus.</p>

<br>
<p style="display:flex;justify-content:space-between;">
  <span><strong>Signat/</strong> (La Parella)</span>
  <span><strong>Signat/</strong> ({photographer_name})</span>
</p>`;

const CA_COMBO = `<h2 style="text-align:center;">CONTRACTE DE REPORTATGE DE BODA</h2>

<h3>REUNITS</h3>
<p>D'una banda, <strong>"Lifetime Weddings"</strong>, amb raó social <strong>Objectiu S.C.P.</strong>, CIF <strong>J43300581</strong>, i domicili fiscal al carrer Mare Molas, 26 de Reus, d'ara endavant <em>"els fotògrafs i videògrafs"</em>.</p>
<p>I de l'altra, <strong>{firstname} {lastname}</strong>, amb DNI <strong>{vat}</strong> i domicili a {street}, i <strong>{partner2_firstname} {partner2_lastname}</strong>, amb DNI <strong>{partner2_vat}</strong> i domicili a {partner2_street}, d'ara endavant <em>"la parella"</em>.</p>

<h3>INTERVENEN</h3>
<p>Les parts, actuant en el seu propi nom i dret, i reconeixent-se plena capacitat per obligar-se, acorden el present Contracte de Prestació de Serveis per a la <strong>{shoot_description}</strong>, manifestant que els fotògrafs i videògrafs disposen dels equips i coneixements necessaris per realitzar el treball requerit, i ho pacten d'acord amb les següents:</p>

<h3>CLÀUSULES</h3>

<h4>PRIMERA — OBJECTE DEL CONTRACTE</h4>
<p>L'objecte d'aquest contracte és la realització d'un reportatge <strong>fotogràfic i videogràfic</strong> el dia del casament de la parella.</p>
<p>Els clients accepten l'estil i criteri artístic mostrat prèviament pels professionals, no podent exigir modificacions d'estil que no hagin estat acordades abans de la signatura.</p>
<p>El servei es durà a terme el dia <strong>{shoot_date}</strong>.</p>
<p>La cerimònia està prevista a les <strong>{shoot_time}</strong> aproximadament, a <strong>{shoot_place}</strong>.</p>
<p>La cobertura inclourà des de l'inici acordat fins a 45 minuts – 1 hora després del primer ball, o fins a un màxim de 14 hores.</p>
<p>Els retards en l'inici o desenvolupament de l'esdeveniment no implicaran ampliació automàtica del temps contractat.</p>
<p>Qualsevol ampliació horària tindrà un cost addicional de <strong>150 €/hora</strong>.</p>

<h4>SEGONA — PRESSUPOST I FORMA DE PAGAMENT</h4>
<p>Els clients accepten el pressupost adjunt, per un import total de <strong>{shoot_price}</strong> (impostos inclosos).</p>
<p>Els pagaments es realitzaran segons el següent calendari:</p>
{payment_plan}
<p>La totalitat de l'import haurà d'estar abonada abans de l'entrega final del material.</p>
<p>La paga i senyal no serà reemborsable en cap cas.</p>
<p>En cas d'impagament, els fotògrafs i/o videògrafs podran suspendre l'entrega del treball fins a la seva regularització, sense que això suposi incompliment contractual.</p>

<h4>TERCERA — DESPESES I DESPLAÇAMENTS</h4>
<p>Les despeses de desplaçament i allotjament, si escau, estan detallades en el pressupost acceptat.</p>
<p>En cas de modificació d'ubicació que impliqui un desplaçament addicional no previst, els clients assumiran el cost segons tarifa vigent.</p>
<p>Si la cerimònia i/o banquet tenen lloc fora de la província de Tarragona, s'aplicarà una tarifa de <strong>0,35 €/km</strong>.</p>
<p>Si per horari o ubicació fos necessari, els clients també assumiran les despeses d'allotjament.</p>

<h4>QUARTA — PRESTACIÓ DEL SERVEI</h4>
<p>El servei inclou:</p>
<ul>
  <li>Fotografies i vídeos des dels preparatius fins a 45 minuts després del primer ball.</li>
  <li>Edició bàsica d'imatges i vídeos.</li>
  <li>Cobertura alternativa en cas de condicions meteorològiques adverses.</li>
</ul>
<p>Els professionals no es responsabilitzen de l'organització dels convidats ni de les condicions de llum o so del lloc de celebració.</p>

<h4>CINQUENA — ENTREGA DE LA FEINA</h4>
<p>Els professionals seleccionaran el millor material per a l'edició final.</p>
<p>Formats i terminis d'entrega:</p>
<ul>
  <li>Fotografies en JPG, màxima qualitat i sense marca d'aigua — termini màxim: <strong>60 dies (2 mesos)</strong>.</li>
  <li>Vídeo en MP4 (HD), durada aproximada de <strong>25 a 35 minuts</strong> — termini màxim: <strong>150 dies (5 mesos)</strong>.</li>
</ul>
<p>No es lliuraran arxius RAW ni material en brut.</p>
<p>Una única revisió inclosa dins dels 15 dies posteriors a l'entrega. Revisió addicional: <strong>50 €/hora</strong>.</p>

<h4>SISENA — CANCEL·LACIONS I MODIFICACIONS</h4>
<p>Si la cancel·lació es produeix:</p>
<ul>
  <li>Amb més de 3 mesos d'antelació: s'abonarà el <strong>20% del total</strong>.</li>
  <li>Amb menys de 3 mesos d'antelació: s'abonarà el <strong>80% del total</strong>.</li>
</ul>
<p>Si s'ha realitzat part del servei (preboda, entrevistes, etc.), es calcularà el cost del treball efectuat.</p>
<p>En cas de força major (pandèmies, catàstrofes naturals o situacions imprevisibles), no hi haurà obligació de reemborsar la paga i senyal, però s'intentarà reprogramar el servei segons disponibilitat.</p>

<h4>SETENA — DRETS D'IMATGE I PROPIETAT INTEL·LECTUAL</h4>
<p>Els clients autoritzen la captació de la seva imatge i la dels convidats conforme a la Llei Orgànica 1/1982.</p>
<p>Autoritzen també la publicació d'imatges i fragments del reportatge a la pàgina web, xarxes socials i plataformes digitals dels professionals amb finalitats promocionals.</p>
<p>Aquesta autorització s'atorga amb caràcter indefinit i gratuït, podent ser revocada mitjançant comunicació escrita, sense efectes retroactius sobre el material ja publicat.</p>
<p>Els drets d'autor corresponen exclusivament a OBJECTIU S.C.P.</p>
<p>Queda prohibida la modificació, comercialització o ús amb finalitats lucratives del material sense autorització expressa.</p>

<h4>VUITENA — PROTECCIÓ DE DADES</h4>
<p>En compliment del Reglament (UE) 2016/679 i la Llei Orgànica 3/2018:</p>
<ul>
  <li>Responsable del tractament: Objectiu S.C.P.</li>
  <li>Finalitat: gestió contractual, facturació i entrega del material.</li>
  <li>Base legal: execució del contracte.</li>
  <li>Conservació: durant el termini legal necessari.</li>
  <li>Drets: accés, rectificació, supressió, limitació, oposició i portabilitat mitjançant comunicació escrita al domicili fiscal indicat.</li>
</ul>
<p>Les imatges podran formar part de l'arxiu professional dels fotògrafs.</p>

<h4>NOVENA — RESOLUCIÓ DE CONFLICTES</h4>
<p>Les parts intentaran resoldre qualsevol discrepància de manera amistosa.</p>
<p>En cas de no arribar a acord, amb renúncia expressa a qualsevol altre fur, se sotmeten als Jutjats i Tribunals de Reus.</p>

<br>
<p style="display:flex;justify-content:space-between;">
  <span><strong>Signat/</strong> (La Parella)</span>
  <span><strong>Signat/</strong> ({photographer_name})</span>
</p>`;

const ES_PHOTO = `<h2 style="text-align:center;">CONTRATO DE REPORTAJE FOTOGRÁFICO DE BODA</h2>

<h3>REUNIDOS</h3>
<p>De una parte, <strong>"Lifetime Weddings"</strong>, con razón social <strong>Objectiu S.C.P.</strong>, CIF <strong>J43300581</strong>, y domicilio fiscal en la calle Mare Molas, 26 de Reus, en adelante <em>"los fotógrafos"</em>.</p>
<p>Y de la otra, <strong>{firstname} {lastname}</strong>, con DNI <strong>{vat}</strong> y domicilio en {street}, y <strong>{partner2_firstname} {partner2_lastname}</strong>, con DNI <strong>{partner2_vat}</strong> y domicilio en {partner2_street}, en adelante <em>"la pareja"</em>.</p>

<h3>INTERVIENEN</h3>
<p>Las partes, actuando en su propio nombre y derecho, y reconociéndose plena capacidad para obligarse, acuerdan el presente Contrato de Prestación de Servicios para la <strong>{shoot_description}</strong>, manifestando que los fotógrafos disponen de los equipos y conocimientos necesarios para realizar el trabajo requerido, y lo pactan de acuerdo con las siguientes:</p>

<h3>CLÁUSULAS</h3>

<h4>PRIMERA — OBJETO DEL CONTRATO</h4>
<p>El objeto de este contrato es la realización de un reportaje <strong>fotográfico</strong> el día del casamiento de la pareja.</p>
<p>Los clientes aceptan el estilo y criterio artístico mostrado previamente por los profesionales, no pudiendo exigir modificaciones de estilo que no hayan sido acordadas antes de la firma.</p>
<p>El servicio se llevará a cabo el día <strong>{shoot_date}</strong>.</p>
<p>La ceremonia está prevista a las <strong>{shoot_time}</strong> aproximadamente, en <strong>{shoot_place}</strong>.</p>
<p>La cobertura incluirá desde el inicio acordado hasta 45 minutos – 1 hora después del primer baile, o hasta un máximo de 14 horas.</p>
<p>Los retrasos en el inicio o desarrollo del evento no implicarán ampliación automática del tiempo contratado.</p>
<p>Cualquier ampliación horaria tendrá un coste adicional de <strong>150 €/hora</strong>.</p>

<h4>SEGUNDA — PRESUPUESTO Y FORMA DE PAGO</h4>
<p>Los clientes aceptan el presupuesto adjunto, por un importe total de <strong>{shoot_price}</strong> (impuestos incluidos).</p>
<p>Los pagos se realizarán según el siguiente calendario:</p>
{payment_plan}
<p>La totalidad del importe deberá estar abonada antes de la entrega final del material.</p>
<p>La señal no será reembolsable en ningún caso.</p>
<p>En caso de impago, los fotógrafos podrán suspender la entrega del trabajo hasta su regularización, sin que ello suponga incumplimiento contractual.</p>

<h4>TERCERA — GASTOS Y DESPLAZAMIENTOS</h4>
<p>Los gastos de desplazamiento y alojamiento, si procede, están detallados en el presupuesto aceptado.</p>
<p>En caso de modificación de ubicación que implique un desplazamiento adicional no previsto, los clientes asumirán el coste según tarifa vigente.</p>
<p>Si la ceremonia y/o banquete tienen lugar fuera de la provincia de Tarragona, se aplicará una tarifa de <strong>0,35 €/km</strong>.</p>
<p>Si por horario o ubicación fuera necesario, los clientes también asumirán los gastos de alojamiento.</p>

<h4>CUARTA — PRESTACIÓN DEL SERVICIO</h4>
<p>El servicio incluye:</p>
<ul>
  <li>Fotografías desde los preparativos hasta 45 minutos después del primer baile.</li>
  <li>Edición básica de las imágenes.</li>
  <li>Cobertura alternativa en caso de condiciones meteorológicas adversas.</li>
</ul>
<p>Los profesionales no se responsabilizan de la organización de los invitados ni de las condiciones de luz del lugar de celebración.</p>

<h4>QUINTA — ENTREGA DEL TRABAJO</h4>
<p>Los profesionales seleccionarán el mejor material para la edición final.</p>
<p>Formato y plazo de entrega:</p>
<ul>
  <li>Fotografías en JPG, máxima calidad y sin marca de agua — plazo máximo: <strong>60 días (2 meses)</strong>.</li>
</ul>
<p>No se entregarán archivos RAW ni material en bruto.</p>
<p>Una única revisión incluida dentro de los 15 días posteriores a la entrega. Revisión adicional: <strong>50 €/hora</strong>.</p>

<h4>SEXTA — CANCELACIONES Y MODIFICACIONES</h4>
<p>Si la cancelación se produce:</p>
<ul>
  <li>Con más de 3 meses de antelación: se abonará el <strong>20% del total</strong>.</li>
  <li>Con menos de 3 meses de antelación: se abonará el <strong>80% del total</strong>.</li>
</ul>
<p>Si se ha realizado parte del servicio (preboda, entrevistas, etc.), se calculará el coste del trabajo efectuado.</p>
<p>En caso de fuerza mayor (pandemias, catástrofes naturales o situaciones imprevisibles), no habrá obligación de reembolsar la señal, pero se intentará reprogramar el servicio según disponibilidad.</p>

<h4>SÉPTIMA — DERECHOS DE IMAGEN Y PROPIEDAD INTELECTUAL</h4>
<p>Los clientes autorizan la captación de su imagen y la de los invitados conforme a la Ley Orgánica 1/1982.</p>
<p>Autorizan también la publicación de las imágenes del reportaje en la página web, redes sociales y plataformas digitales de los profesionales con fines promocionales.</p>
<p>Esta autorización se otorga con carácter indefinido y gratuito, pudiendo ser revocada mediante comunicación escrita, sin efectos retroactivos sobre el material ya publicado.</p>
<p>Los derechos de autor corresponden exclusivamente a OBJECTIU S.C.P.</p>
<p>Queda prohibida la modificación, comercialización o uso con fines lucrativos del material sin autorización expresa.</p>

<h4>OCTAVA — PROTECCIÓN DE DATOS</h4>
<p>En cumplimiento del Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018:</p>
<ul>
  <li>Responsable del tratamiento: Objectiu S.C.P.</li>
  <li>Finalidad: gestión contractual, facturación y entrega del material.</li>
  <li>Base legal: ejecución del contrato.</li>
  <li>Conservación: durante el plazo legal necesario.</li>
  <li>Derechos: acceso, rectificación, supresión, limitación, oposición y portabilidad mediante comunicación escrita al domicilio fiscal indicado.</li>
</ul>
<p>Las imágenes podrán formar parte del archivo profesional de los fotógrafos.</p>

<h4>NOVENA — RESOLUCIÓN DE CONFLICTOS</h4>
<p>Las partes intentarán resolver cualquier discrepancia de manera amistosa.</p>
<p>En caso de no llegar a acuerdo, con renuncia expresa a cualquier otro fuero, se someten a los Juzgados y Tribunales de Reus.</p>

<br>
<p style="display:flex;justify-content:space-between;">
  <span><strong>Firmado/</strong> (La Pareja)</span>
  <span><strong>Firmado/</strong> ({photographer_name})</span>
</p>`;

const ES_VIDEO = `<h2 style="text-align:center;">CONTRATO DE REPORTAJE VIDEOGRÁFICO DE BODA</h2>

<h3>REUNIDOS</h3>
<p>De una parte, <strong>"Lifetime Weddings"</strong>, con razón social <strong>Objectiu S.C.P.</strong>, CIF <strong>J43300581</strong>, y domicilio fiscal en la calle Mare Molas, 26 de Reus, en adelante <em>"los videógrafos"</em>.</p>
<p>Y de la otra, <strong>{firstname} {lastname}</strong>, con DNI <strong>{vat}</strong> y domicilio en {street}, y <strong>{partner2_firstname} {partner2_lastname}</strong>, con DNI <strong>{partner2_vat}</strong> y domicilio en {partner2_street}, en adelante <em>"la pareja"</em>.</p>

<h3>INTERVIENEN</h3>
<p>Las partes, actuando en su propio nombre y derecho, y reconociéndose plena capacidad para obligarse, acuerdan el presente Contrato de Prestación de Servicios para la <strong>{shoot_description}</strong>, manifestando que los videógrafos disponen de los equipos y conocimientos necesarios para realizar el trabajo requerido, y lo pactan de acuerdo con las siguientes:</p>

<h3>CLÁUSULAS</h3>

<h4>PRIMERA — OBJETO DEL CONTRATO</h4>
<p>El objeto de este contrato es la realización de un reportaje <strong>videográfico</strong> el día del casamiento de la pareja.</p>
<p>Los clientes aceptan el estilo y criterio artístico mostrado previamente por los profesionales, no pudiendo exigir modificaciones de estilo que no hayan sido acordadas antes de la firma.</p>
<p>El servicio se llevará a cabo el día <strong>{shoot_date}</strong>.</p>
<p>La ceremonia está prevista a las <strong>{shoot_time}</strong> aproximadamente, en <strong>{shoot_place}</strong>.</p>
<p>La cobertura incluirá desde el inicio acordado hasta 45 minutos – 1 hora después del primer baile, o hasta un máximo de 14 horas.</p>
<p>Los retrasos en el inicio o desarrollo del evento no implicarán ampliación automática del tiempo contratado.</p>
<p>Cualquier ampliación horaria tendrá un coste adicional de <strong>150 €/hora</strong>.</p>

<h4>SEGUNDA — PRESUPUESTO Y FORMA DE PAGO</h4>
<p>Los clientes aceptan el presupuesto adjunto, por un importe total de <strong>{shoot_price}</strong> (impuestos incluidos).</p>
<p>Los pagos se realizarán según el siguiente calendario:</p>
{payment_plan}
<p>La totalidad del importe deberá estar abonada antes de la entrega final del material.</p>
<p>La señal no será reembolsable en ningún caso.</p>
<p>En caso de impago, los videógrafos podrán suspender la entrega del trabajo hasta su regularización, sin que ello suponga incumplimiento contractual.</p>

<h4>TERCERA — GASTOS Y DESPLAZAMIENTOS</h4>
<p>Los gastos de desplazamiento y alojamiento, si procede, están detallados en el presupuesto aceptado.</p>
<p>En caso de modificación de ubicación que implique un desplazamiento adicional no previsto, los clientes asumirán el coste según tarifa vigente.</p>
<p>Si la ceremonia y/o banquete tienen lugar fuera de la provincia de Tarragona, se aplicará una tarifa de <strong>0,35 €/km</strong>.</p>
<p>Si por horario o ubicación fuera necesario, los clientes también asumirán los gastos de alojamiento.</p>

<h4>CUARTA — PRESTACIÓN DEL SERVICIO</h4>
<p>El servicio incluye:</p>
<ul>
  <li>Grabación en vídeo desde los preparativos hasta 45 minutos después del primer baile.</li>
  <li>Edición básica del vídeo.</li>
  <li>Cobertura alternativa en caso de condiciones meteorológicas adversas.</li>
</ul>
<p>Los profesionales no se responsabilizan de la organización de los invitados ni de las condiciones de sonido del lugar de celebración.</p>

<h4>QUINTA — ENTREGA DEL TRABAJO</h4>
<p>Los profesionales seleccionarán el mejor material para la edición final.</p>
<p>Formato y plazo de entrega:</p>
<ul>
  <li>Vídeo en MP4 (HD), duración aproximada de <strong>25 a 35 minutos</strong> — plazo máximo: <strong>150 días (5 meses)</strong>.</li>
</ul>
<p>No se entregarán archivos brutos ni material sin editar.</p>
<p>Una única revisión incluida dentro de los 15 días posteriores a la entrega. Revisión adicional: <strong>50 €/hora</strong>.</p>

<h4>SEXTA — CANCELACIONES Y MODIFICACIONES</h4>
<p>Si la cancelación se produce:</p>
<ul>
  <li>Con más de 3 meses de antelación: se abonará el <strong>20% del total</strong>.</li>
  <li>Con menos de 3 meses de antelación: se abonará el <strong>80% del total</strong>.</li>
</ul>
<p>Si se ha realizado parte del servicio (preboda, entrevistas, etc.), se calculará el coste del trabajo efectuado.</p>
<p>En caso de fuerza mayor (pandemias, catástrofes naturales o situaciones imprevisibles), no habrá obligación de reembolsar la señal, pero se intentará reprogramar el servicio según disponibilidad.</p>

<h4>SÉPTIMA — DERECHOS DE IMAGEN Y PROPIEDAD INTELECTUAL</h4>
<p>Los clientes autorizan la captación de su imagen y la de los invitados conforme a la Ley Orgánica 1/1982.</p>
<p>Autorizan también la publicación de fragmentos del reportaje audiovisual en la página web, redes sociales y plataformas digitales de los profesionales con fines promocionales.</p>
<p>Esta autorización se otorga con carácter indefinido y gratuito, pudiendo ser revocada mediante comunicación escrita, sin efectos retroactivos sobre el material ya publicado.</p>
<p>Los derechos de autor corresponden exclusivamente a OBJECTIU S.C.P.</p>
<p>Queda prohibida la modificación, comercialización o uso con fines lucrativos del material sin autorización expresa.</p>

<h4>OCTAVA — PROTECCIÓN DE DATOS</h4>
<p>En cumplimiento del Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018:</p>
<ul>
  <li>Responsable del tratamiento: Objectiu S.C.P.</li>
  <li>Finalidad: gestión contractual, facturación y entrega del material.</li>
  <li>Base legal: ejecución del contrato.</li>
  <li>Conservación: durante el plazo legal necesario.</li>
  <li>Derechos: acceso, rectificación, supresión, limitación, oposición y portabilidad mediante comunicación escrita al domicilio fiscal indicado.</li>
</ul>
<p>Las imágenes podrán formar parte del archivo profesional de los videógrafos.</p>

<h4>NOVENA — RESOLUCIÓN DE CONFLICTOS</h4>
<p>Las partes intentarán resolver cualquier discrepancia de manera amistosa.</p>
<p>En caso de no llegar a acuerdo, con renuncia expresa a cualquier otro fuero, se someten a los Juzgados y Tribunales de Reus.</p>

<br>
<p style="display:flex;justify-content:space-between;">
  <span><strong>Firmado/</strong> (La Pareja)</span>
  <span><strong>Firmado/</strong> ({photographer_name})</span>
</p>`;

const ES_COMBO = `<h2 style="text-align:center;">CONTRATO DE REPORTAJE DE BODA</h2>

<h3>REUNIDOS</h3>
<p>De una parte, <strong>"Lifetime Weddings"</strong>, con razón social <strong>Objectiu S.C.P.</strong>, CIF <strong>J43300581</strong>, y domicilio fiscal en la calle Mare Molas, 26 de Reus, en adelante <em>"los fotógrafos y videógrafos"</em>.</p>
<p>Y de la otra, <strong>{firstname} {lastname}</strong>, con DNI <strong>{vat}</strong> y domicilio en {street}, y <strong>{partner2_firstname} {partner2_lastname}</strong>, con DNI <strong>{partner2_vat}</strong> y domicilio en {partner2_street}, en adelante <em>"la pareja"</em>.</p>

<h3>INTERVIENEN</h3>
<p>Las partes, actuando en su propio nombre y derecho, y reconociéndose plena capacidad para obligarse, acuerdan el presente Contrato de Prestación de Servicios para la <strong>{shoot_description}</strong>, manifestando que los fotógrafos y videógrafos disponen de los equipos y conocimientos necesarios para realizar el trabajo requerido, y lo pactan de acuerdo con las siguientes:</p>

<h3>CLÁUSULAS</h3>

<h4>PRIMERA — OBJETO DEL CONTRATO</h4>
<p>El objeto de este contrato es la realización de un reportaje <strong>fotográfico y videográfico</strong> el día del casamiento de la pareja.</p>
<p>Los clientes aceptan el estilo y criterio artístico mostrado previamente por los profesionales, no pudiendo exigir modificaciones de estilo que no hayan sido acordadas antes de la firma.</p>
<p>El servicio se llevará a cabo el día <strong>{shoot_date}</strong>.</p>
<p>La ceremonia está prevista a las <strong>{shoot_time}</strong> aproximadamente, en <strong>{shoot_place}</strong>.</p>
<p>La cobertura incluirá desde el inicio acordado hasta 45 minutos – 1 hora después del primer baile, o hasta un máximo de 14 horas.</p>
<p>Los retrasos en el inicio o desarrollo del evento no implicarán ampliación automática del tiempo contratado.</p>
<p>Cualquier ampliación horaria tendrá un coste adicional de <strong>150 €/hora</strong>.</p>

<h4>SEGUNDA — PRESUPUESTO Y FORMA DE PAGO</h4>
<p>Los clientes aceptan el presupuesto adjunto, por un importe total de <strong>{shoot_price}</strong> (impuestos incluidos).</p>
<p>Los pagos se realizarán según el siguiente calendario:</p>
{payment_plan}
<p>La totalidad del importe deberá estar abonada antes de la entrega final del material.</p>
<p>La señal no será reembolsable en ningún caso.</p>
<p>En caso de impago, los fotógrafos y/o videógrafos podrán suspender la entrega del trabajo hasta su regularización, sin que ello suponga incumplimiento contractual.</p>

<h4>TERCERA — GASTOS Y DESPLAZAMIENTOS</h4>
<p>Los gastos de desplazamiento y alojamiento, si procede, están detallados en el presupuesto aceptado.</p>
<p>En caso de modificación de ubicación que implique un desplazamiento adicional no previsto, los clientes asumirán el coste según tarifa vigente.</p>
<p>Si la ceremonia y/o banquete tienen lugar fuera de la provincia de Tarragona, se aplicará una tarifa de <strong>0,35 €/km</strong>.</p>
<p>Si por horario o ubicación fuera necesario, los clientes también asumirán los gastos de alojamiento.</p>

<h4>CUARTA — PRESTACIÓN DEL SERVICIO</h4>
<p>El servicio incluye:</p>
<ul>
  <li>Fotografías y vídeos desde los preparativos hasta 45 minutos después del primer baile.</li>
  <li>Edición básica de imágenes y vídeos.</li>
  <li>Cobertura alternativa en caso de condiciones meteorológicas adversas.</li>
</ul>
<p>Los profesionales no se responsabilizan de la organización de los invitados ni de las condiciones de luz o sonido del lugar de celebración.</p>

<h4>QUINTA — ENTREGA DEL TRABAJO</h4>
<p>Los profesionales seleccionarán el mejor material para la edición final.</p>
<p>Formatos y plazos de entrega:</p>
<ul>
  <li>Fotografías en JPG, máxima calidad y sin marca de agua — plazo máximo: <strong>60 días (2 meses)</strong>.</li>
  <li>Vídeo en MP4 (HD), duración aproximada de <strong>25 a 35 minutos</strong> — plazo máximo: <strong>150 días (5 meses)</strong>.</li>
</ul>
<p>No se entregarán archivos RAW ni material en bruto.</p>
<p>Una única revisión incluida dentro de los 15 días posteriores a la entrega. Revisión adicional: <strong>50 €/hora</strong>.</p>

<h4>SEXTA — CANCELACIONES Y MODIFICACIONES</h4>
<p>Si la cancelación se produce:</p>
<ul>
  <li>Con más de 3 meses de antelación: se abonará el <strong>20% del total</strong>.</li>
  <li>Con menos de 3 meses de antelación: se abonará el <strong>80% del total</strong>.</li>
</ul>
<p>Si se ha realizado parte del servicio (preboda, entrevistas, etc.), se calculará el coste del trabajo efectuado.</p>
<p>En caso de fuerza mayor (pandemias, catástrofes naturales o situaciones imprevisibles), no habrá obligación de reembolsar la señal, pero se intentará reprogramar el servicio según disponibilidad.</p>

<h4>SÉPTIMA — DERECHOS DE IMAGEN Y PROPIEDAD INTELECTUAL</h4>
<p>Los clientes autorizan la captación de su imagen y la de los invitados conforme a la Ley Orgánica 1/1982.</p>
<p>Autorizan también la publicación de imágenes y fragmentos del reportaje en la página web, redes sociales y plataformas digitales de los profesionales con fines promocionales.</p>
<p>Esta autorización se otorga con carácter indefinido y gratuito, pudiendo ser revocada mediante comunicación escrita, sin efectos retroactivos sobre el material ya publicado.</p>
<p>Los derechos de autor corresponden exclusivamente a OBJECTIU S.C.P.</p>
<p>Queda prohibida la modificación, comercialización o uso con fines lucrativos del material sin autorización expresa.</p>

<h4>OCTAVA — PROTECCIÓN DE DATOS</h4>
<p>En cumplimiento del Reglamento (UE) 2016/679 y la Ley Orgánica 3/2018:</p>
<ul>
  <li>Responsable del tratamiento: Objectiu S.C.P.</li>
  <li>Finalidad: gestión contractual, facturación y entrega del material.</li>
  <li>Base legal: ejecución del contrato.</li>
  <li>Conservación: durante el plazo legal necesario.</li>
  <li>Derechos: acceso, rectificación, supresión, limitación, oposición y portabilidad mediante comunicación escrita al domicilio fiscal indicado.</li>
</ul>
<p>Las imágenes podrán formar parte del archivo profesional de los fotógrafos.</p>

<h4>NOVENA — RESOLUCIÓN DE CONFLICTOS</h4>
<p>Las partes intentarán resolver cualquier discrepancia de manera amistosa.</p>
<p>En caso de no llegar a acuerdo, con renuncia expresa a cualquier otro fuero, se someten a los Juzgados y Tribunales de Reus.</p>

<br>
<p style="display:flex;justify-content:space-between;">
  <span><strong>Firmado/</strong> (La Pareja)</span>
  <span><strong>Firmado/</strong> ({photographer_name})</span>
</p>`;

/** Key: `${lang}_${type}`. EN couples fall back to ES (no EN legal text). */
const TEMPLATES: Record<string, string> = {
  ca_photo: CA_PHOTO,
  ca_video: CA_VIDEO,
  ca_combo: CA_COMBO,
  es_photo: ES_PHOTO,
  es_video: ES_VIDEO,
  es_combo: ES_COMBO,
};

/** Pick the contract template for a language + service type. EN → ES. */
export function getContractTemplate(lang: Lang, type: ContractServiceType): string {
  const legalLang = lang === 'en' ? 'es' : lang;
  return TEMPLATES[`${legalLang}_${type}`] ?? TEMPLATES[`${legalLang}_combo`] ?? CA_COMBO;
}
