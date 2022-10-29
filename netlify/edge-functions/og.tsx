import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts';
import classnames from 'https://deno.land/x/classnames@0.1.1/index.ts';
import { unescape } from 'https://deno.land/x/html_escape/unescape.ts';

const robotoSlabRegular = fetch(
  'https://github.com/google/fonts/raw/5c3d8ef085f3084db38936d0dcd39a567dbc1e01/apache/robotoslab/static/RobotoSlab-Regular.ttf'
).then(res => res.arrayBuffer());

const robotoSlabBold = fetch(
  'https://github.com/google/fonts/raw/5c3d8ef085f3084db38936d0dcd39a567dbc1e01/apache/robotoslab/static/RobotoSlab-Bold.ttf'
).then(res => res.arrayBuffer());

const tryAndGetImageBlobUrl = async (url: string) => {
  try {
    const res = await fetch(url);

    if (res.status !== 200) {
      throw new Error('Failed to fetch image');
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export default async function handler(req) {
  const robotoSlabRegularData = await robotoSlabRegular;
  const robotoSlabBoldData = await robotoSlabBold;

  const THUM_API_KEY = Deno.env.get('THUM_API_KEY');
  const searchParams = new URLSearchParams(unescape(req.url.split('?')[1]));
  const title = decodeURI(searchParams.get('title') || `Phil Wolstenholme's personal website, blog and portfolio`);
  let url = decodeURI(searchParams.get('url') || 'https://wolstenhol.me');
  const type = decodeURI(searchParams.get('type') || 'webpage');

  const allowedTypes = ['webpage', 'blog post'];
  if (!allowedTypes.includes(type)) {
    return new Response('Invalid type', { status: 400 });
  }

  if (!url.startsWith('https://wolstenhol.me') && !url.startsWith('https://dev.to/philw_/')) {
    return new Response('Invalid URL', { status: 400 });
  }

  if (!THUM_API_KEY) {
    return new Response('Missing THUM_API_KEY', { status: 500 });
  }

  console.log({ title, url, type });

  const headRes = await fetch(url, { method: 'HEAD' });
  if (headRes.status !== 200) {
    console.warn('Invalid URL, using fallback');
    url = 'https://wolstenhol.me';
  }

  try {
    const cloudinaryPrefix = 'https://res.cloudinary.com/wolstenh/image/fetch/';
    let imgSrc = `${cloudinaryPrefix}https://image.thum.io/get/auth/${THUM_API_KEY}/maxAge/24/crop/600/allowJPG/noanimate/${url}`;

    console.log(imgSrc);

    const imageBlobUrl = await tryAndGetImageBlobUrl(imgSrc);

    if (imageBlobUrl) {
      imgSrc = imageBlobUrl;
    } else {
      const uncachedImageBlobUrl = await tryAndGetImageBlobUrl(imgSrc.replace(cloudinaryPrefix, ''));

      if (uncachedImageBlobUrl) {
        imgSrc = uncachedImageBlobUrl;
      } else {
        imgSrc = 'https://res.cloudinary.com/wolstenh/image/upload/v1666814388/one-offs/website.png';
      }
    }

    imgSrc = 'https://res.cloudinary.com/wolstenh/image/upload/v1666814388/one-offs/website.png';

    console.log(imgSrc);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            fontFamily: '"Roboto Slab", serif',
          }}
          tw="relative flex justify-center w-full h-full relative flex-col overflow-hidden bg-yellow-300"
        >
          <div tw="relative flex flex-col flex-1 w-full items-center justify-between content-between">
            <img
              tw="opacity-30 absolute -right-80 top-20"
              src="https://res.cloudinary.com/wolstenh/image/upload/v1666823712/one-offs/cup-coffee-stain-2-removebg-preview.png"
              alt=""
            />
            <img
              tw="absolute left-0 right-0 top-0 bottom-0 opacity-5 w-full h-full"
              src="https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill,g_north,w_1200,h_630/v1661284312/one-offs/9-soft-grunge-texture-4-1.png"
              alt=""
            />
            <div tw="flex flex-1 items-center px-30 z-10">
              <h1
                tw={classnames('font-bold text-black text-center', {
                  'text-8xl': title.length <= 20,
                  'text-6xl': title.length <= 50 && title.length > 20,
                  'text-5xl': title.length <= 120 && title.length > 50,
                  'text-4xl': title.length > 120,
                })}
                style={{
                  transform: 'rotate(-0.5deg)',
                }}
              >
                {title || `Phil Wolstenholme's personal website, blog and portfolio`}
              </h1>
            </div>
            <img tw="h-80 mt-4 rounded-tl-xl rounded-tr-xl shadow-2xl z-10" src={imgSrc} alt="" />
          </div>
          <div
            tw="flex text-white py-2 px-4 w-full"
            style={{
              transform: 'rotate(-0.5deg) scale(1.2)',
              backgroundImage:
                'url(https://wolstenhol.me/proxy/cloudinary/image/upload/c_crop,f_png,h_200,w_200,q_auto:eco/v1473712910/binding_dark_im2rpa.png)',
            }}
          >
            <div
              tw="flex flex-row items-center w-full"
              style={{
                transform: 'rotate(0.5deg) scale(0.8)',
              }}
            >
              <div tw="flex bg-yellow-300 rounded-full overflow-hidden mr-5">
                <img
                  src="https://wolstenhol.me/proxy/cloudinary/image/upload/c_scale,f_auto,q_auto,w_192/v1545084898/avatar_egzcjk.png"
                  alt=""
                  tw="w-12 h-12"
                />
              </div>
              <div tw="flex flex-grow justify-between font-bold text-2xl">
                <p>
                  A {type} by{' '}
                  <svg xmlns="http://www.w3.org/2000/svg" height="30" tw="ml-3 h-7" viewBox="0 0 612.53101 73.130898">
                    <path
                      fill="#fcd34d"
                      d="M12.75632725.81855468c-3.9132401.65624-7.76299423 3.1933967-9.35343426 6.8967365C-.98663693 15.05418108.06089135 23.94725464.16588134 32.11173528c.60693 9.26639878 1.3863151 18.51224208 3.43131503 27.61795147.67845992 4.22925076 2.86388092 8.79441387 6.35465077 11.64838429 1.83045997 2.038051 5.48603004 2.26567468 7.74422998 1.3472054 3.48192006-2.42972958 1.90739684-7.5889881 1.9409669-10.44225737-.4614701-3.30987925-1.22588415-8.10970131-1.57406417-11.99875083-1.7003998-4.10910082 1.98620616-5.80649549 4.83019623-7.85998492 3.93266052-3.41279952 6.38000605-8.0517073 9.43766595-12.1460285 1.2680209 2.71055039 1.37267948 6.28789693 2.12286847 9.30330816 1.19853074 5.01602104 1.73542323 10.36507047 1.24695213 15.54427064 2.03891883 2.96610084 5.8548137 4.89243417 9.43508388 4.63382513 4.66186038-1.32068092 4.60424472-7.12198 8.16332442-9.4753905 3.22939036 2.14492942 3.5100974 6.70511837 5.41775908 9.96941785 1.49314956 2.75840027 1.75057327 6.35809087 5.0875432 7.6434605 3.98731048 2.26491004 9.60031089 1.65378075 11.58017207-2.8892288 2.027129-1.93296114-.9460759-4.73028691-1.32291665-6.87916657-1.69234906-2.82719989-2.11951885-6.31983742-4.0023388-9.07179774-1.16062124-2.96520126-3.85379379-5.18780442-6.03994266-7.46879583-4.06689978-3.06011787-9.6726162-4.76360325-14.58980744-2.91558394-1.8623703-.04350014-1.61343973-3.29081337-2.0376012-4.1708043-.27750029-3.26942975-1.84226727-7.01315687-2.27789579-10.53165664-.41197212-2.89124995-1.66439318-5.65465138-2.43189386-8.3860512-1.6388609-3.29280012-2.9184679-7.27893664-6.6409384-8.78447664-2.91045102-1.92465005-6.4824662-1.17278413-9.74617514-1.37924406C22.20475566 2.777241 17.6225772 1.21796468 12.75632725.81855468zm3.97391753 16.4088173c4.0696398-.10271998 6.0855211 4.84086503 4.25762123 8.08839522-1.59984014 5.18724852-9.04759418 3.93992862-7.62537438-1.83503012-.27165988-2.36678997.83478316-5.64162515 3.36775315-6.2533651zM400.90169 62.12418c-.15875.60854-.52919 1.21708-.82023 1.37583-.68792.34396-.97896.0794-.5556-.50271.18518-.26458.58208-.97896.89958-1.64041.66146-1.37584.9525-.92605.47625.79375M380.29065 48.47168a77.575833 77.575833 0 00-3.96875 7.91104c-.84669 1.98437-1.61396 3.09562-1.61396 2.27542 0-.58209 2.03727-5.68855 2.96331-7.40834.87315-1.64041 2.46065-3.65125 2.91044-3.65125.13227 0 0 .39688-.26458.87313M79.15609 43.39215c-4.33807.11039-6.87519 5.22379-4.28707 8.76094 1.83251 3.12687 3.29838 7.22785 6.97858 8.59841 4.29249 1.77737 10.41415-.5013 10.39505-5.51735-1.5309-3.5399-3.32618-6.73855-6.02637-9.54074-2.04578-1.40393-4.58994-2.17149-7.06019-2.30126zM78.93026 22.75413c-3.52459-.35429-7.28975 4.18083-3.77779 6.80636 2.92402 3.1266 12.57469 2.63636 9.25381-3.33997-1.11539-1.96536-3.22621-3.28769-5.47602-3.46639zM87.38091 1.23968C83.71514.73456 80.15918 5.88253 83.412 8.64647c3.23681 3.30724 5.4128 7.33571 7.08091 11.54141 3.09061 7.44036 5.57655 15.13697 6.9384 23.09611 1.67492 6.93176 1.4092 14.1822 2.96177 21.12806 3.582242 2.05748 9.611321 3.23617 12.612651-.75315 3.598944-2.79916.648403-8.39981.869725-12.35355-1.996728-12.58323-5.02187-25.15087-10.509055-36.69538-1.843595-3.54061-4.429141-6.68895-7.216181-9.52724-2.39477-2.22232-5.41064-3.93672-8.76931-3.84305zM219.055876 28.88196c-2.298832.95829-4.690171.089-7.215182.20265-3.827603-.65155-7.6453658 1.83975-9.1715142 5.31757-2.47548134 3.08224-2.88559609 5.82933-4.2054303 9.60829-.8951225 3.81375-1.8320941 8.63912 1.30183196 11.71067 2.89951584 4.0951 8.45139744 5.67638 13.24209154 4.97061 5.281088-1.36117 9.804207-4.81495 12.885581-9.26823 2.69744-1.70078 2.639256-7.76573 4.669414-8.1378 1.447126.16759-1.601877-3.83813-1.701929-5.12682-.45542-1.60146.08428-3.69861-1.58069-4.67805-2.266677-2.21628-4.77825-4.765-8.224173-4.59889zm-2.360062 7.84655c3.804012-.31304 5.012507 4.27465 3.823848 7.16612-1.213086 3.59265-4.150738 8.18002-8.522478 7.51565-4.1361305-1.07053-5.2447585-6.39488-3.4117675-9.83734 1.4042284-3.03854 4.8389355-4.84837 8.1103975-4.84443zm-2.219503 5.76347c-27.49025-5.44636-54.9805-10.89272-82.470748-16.33908 27.490248 5.44636 54.980498 10.89272 82.470748 16.33908zM567.06 36.38022c-6.89966.30171-13.71266 6.50688-13.34823 13.66242-.11583 5.17869 6.61968 8.52149 10.42129 11.63754 13.33018 8.04996 30.14616 8.01081 44.52938 2.99061 6.18664-1.38202 3.40813-8.93403-1.77845-9.01056-4.82261-.30183-9.59259 1.24267-14.42399 1.38395-6.67695.25737-13.78987.46751-19.97604-2.46063-1.74276-3.14155 10.39084-5.31244 6.99479-11.25236-1.91897-4.68862-7.53553-7.36487-12.41875-6.92451M501.17875 29.07776c-6.03514 1.82627-10.20706 7.5894-11.70822 13.53964-4.45567 3.2337-5.67882 9.64051-1.66921 14.02565 3.18424 4.76112 13.64188 5.70129 12.92764-2.16529.27267-2.80492.96581-5.54009 1.5875-8.28146 1.89353-1.03205 5.67299-8.45552 5.60141-3.25189 1.90162 4.06263.80181 9.7259 4.64621 12.65358 2.95859 2.18244 8.11646 4.2257 10.68092.49373-.04-2.92033 2.64983-6.59372 2.75167-7.48771-.39378-5.2645 7.39392-4.44526 7.45004.95638 2.05067 4.44652.26352 10.16101 3.21901 14.06995 2.46515 2.61757 6.09568 3.09057 9.51866 3.09763 4.31896-3.32914 1.93836-9.25536 1.42602-13.76856-.78911-5.21723-2.85549-10.6021-7.5875-13.46699-4.43549-3.06265-9.55572-5.81303-15.13702-5.21063-3.47553-.11826-6.43157 3.33878-8.52734-.6568-3.72372-2.46655-7.68126-5.50777-12.44228-4.73653-.91364.0262-1.83357.0365-2.73751.18926M398.09708 15.00194c-2.17947.64629-3.09654 2.81147-4.10104 4.63021 3.37184 6.07854 5.46351 12.72244 7.8912 19.20136 1.96676 5.17669 4.21971 10.24374 6.06518 15.46355.56783 2.56222 2.77668 4.40276 5.09362 5.55175 2.5952 1.33337 6.44313 2.25954 8.4377-.55149.63527-.52579 1.72521.92317 2.22044-.90951 2.5153.79129 5.31682 3.2911 8.33091 3.30952 2.63486.16958 4.71372-1.37868 7.22494-.72529 2.41-1.49284-2.75098-.33641-.78756-2.28743 1.28523-1.85371-1.44416-5.56205 2.40812-4.25192 3.55955-1.70057 4.61643 2.43437 7.2349 3.95849 2.2288 1.26079 4.66984 2.54917 7.28372 2.70114 2.90482-.36206 6.35904-.15925 8.65332-2.19402 1.71901-1.64985 2.85355-4.11443 2.58691-6.4901-1.10511 1.43691-1.31117 5.80479-3.64999 5.52773 1.43938-2.3818 2.6108-4.92198 2.89704-7.72097.47579-1.13199.0447-2.1402-.64061-3.07222-1.22725-2.11703-3.36442-3.54215-4.56701-5.64199-2.3577-.81721-4.66766-1.67476-6.89859-2.90484-2.32529-1.20307-5.31533-.79847-7.28672.74841-1.81771 2.73145-4.18021 5.44866-4.6155 8.80838-.65321 1.54848 2.50407 4.50063-.28489 4.41807-1.83574.0219-5.85925-1.63844-4.63006-2.7096-4.01168 2.11378-3.53825-3.64625-5.5054-5.7212-1.26606-2.64972-4.26339-3.03078-6.7264-3.88357-2.41954-1.67264-5.09107-.0425-7.5578.61183-1.40425-1.0313-1.59693-3.57443-2.42595-5.25711-2.21791-5.8804-4.00492-12.06932-7.70759-17.22255-2.24895-1.63505-4.75383-3.13632-7.4844-3.72526-.5013.0242-.99668.14331-1.45849.3386M268.583515 14.49923c-2.392614.81849-5.167611.80625-7.110996 2.64637-2.163439 1.6062-3.228297 4.13038-4.202784 6.54449-1.589136 2.66334-1.114079 5.96886.393879 8.54744 3.367875 6.28737 8.702716 11.2621 11.91768 17.65042.962569 1.92291 1.809445 3.95596 2.169362 6.08456-1.716183.43695-3.323792-2.58493-5.30183-2.98912-2.238591-1.20125-4.262066.83596-4.258297 3.05873-1.876323.79151-.298526 3.04692.119736 4.55089.914296 2.35376 2.46728 4.38957 4.643869 5.70646 2.109358 1.73509 4.671251 2.74282 7.364088 3.11157 2.437333.59237 4.961052.20449 7.18613-.9221 3.097029-1.50159 3.719329-5.36323 3.938906-8.45096.402641-4.32695-.402746-8.74564-2.512097-12.5619-3.336957-6.75114-9.254623-11.82742-12.54266-18.59808-.859328-2.37339 2.135568-4.41313 3.867641-2.32215 1.466888.61074 3.090999.73347 4.624259 1.05943 1.884776-.26738 4.664645-1.03436 4.778576-3.32425.116025-2.49156-1.711527-4.66575-3.698382-5.95534-2.917549-1.94293-6.272241-3.28281-9.708966-3.97614-.550988-.0823-1.170956-.1452-1.668114.16614"
                    ></path>
                    <path
                      fill="#fcd34d"
                      d="M287.580675 6.64104c-6.80446.95699-5.000485 9.31279-2.401434 13.42588 2.000522 6.03738 3.649916 12.18603 5.100184 18.37704-4.993605 1.56005-6.49743 8.4501-.946213 10.31171 6.493391.36323 4.057187 7.78802 5.902583 11.91597 3.082866 3.68965 12.806925 4.56679 12.617205-2.14177 1.64595-4.37326-3.97756-11.16237 1.2252-13.23464 6.03377-1.91863 12.20947-3.32803 18.20112-5.4013 6.34704-1.79586 6.96608 6.86843 9.08666 10.80701 4.49841 7.21054 12.38676 13.40122 21.27442 12.92753 3.56332-2.26613 7.58835-1.74687 11.13293-.002 4.39276-.34438 7.24772-4.67364 8.79396-8.38576.83256-3.17378 4.56381-11.47606 7.58444-5.3285 2.1055 3.42657 2.68101 7.64806.22722 11.03376 3.28272 3.78893 9.1118 5.1258 13.73185 3.09381 5.50203-1.20216 2.26564-9.27795 1.04933-13.12659-2.56067-6.2731-7.29189-12.14254-14.07049-13.96741-6.54765-3.06294-15.09907-.74514-18.72671 5.64402-1.57178 2.94997-2.70783 4.80412-6.04294 4.2704-3.62899 1.11813-3.29464 9.1722-7.65236 4.22455-4.75555-6.21404 6.20174-4.14219 8.27207-8.75607 2.99188-3.8253.0104-9.11716-2.79744-12.1014-4.02081-2.38561-9.23122-5.09972-13.8898-3.07947-4.89974 1.73101-8.3858 10.8636-14.06843 5.3431-4.80397-3.79185-11.12043-.93693-16.50608-.43942-4.30319-.0705-12.01968 6.00288-12.32853-1.12539-1.968131-6.603-3.43389-13.43554-6.334947-19.69878-1.645606-3.07452-5.261931-4.08543-8.433768-4.5862M189.473175 6.40292c-.52917.13229-1.40229.26458-1.98437.3175l-1.50813.10583c-.55563.0265-1.95792 2.14313-3.3602 5.05354-1.37584 2.91042-2.24897 6.42938-3.33375 13.49375-.89959 5.82084-2.38125 12.91167-3.25437 15.74271l-1.13772 3.57188c-.635 2.06375-1.19063 3.33375-1.53459 3.54541-.34394.21167-6.90562-1.00541-6.90562-1.27 0-.13229.18521-.47625.4498-.74083.8202-.92604.10582-.79375-.89959.15875-.52916.52917-1.32291 1.05833-1.71978 1.19062-.68793.26459-.76731.18521-1.29647-.97895-2.38125-5.31813-5.55625-16.93334-6.19125-22.46313a51.990625 51.990625 0 00-.87313-6.29708c-.47625-1.53459-.92603-2.24896-1.42875-2.24896-.26458 0-.9525-.42333-1.53458-.9525a8.2814583 8.2814583 0 00-6.19125-1.82563c-1.93145.18521-2.38125.47625-3.54542 2.14313-.84666 1.24354-1.08478 2.72521-.79375 5.18583a135.20208 135.20208 0 005.37104 22.83354c1.16418 3.46605 1.98438 5.55625 3.43959 8.73125.34396.74084 1.05834 2.64584 1.5875 4.2598.52916 1.64041 1.11125 3.09562 1.32291 3.28083.21168.18521.39688.44979.39688.60854 0 1.16417 3.01625 3.12208 6.21771 4.02167l1.5875.44979 1.98437-.84667c1.95792-.82021 3.06917-1.85208 3.54542-3.36021.0794-.26458.50271-.76729.89958-1.05833l.76729-.55562 1.56106.52916c2.38125.79375 4.8154 1.32292 6.77332 1.45521 1.56105.10583 1.98437.0265 3.3073-.60854a13.229167 13.229167 0 002.38125-1.50813c.97895-.87312 3.54541-4.86833 4.49791-7.06437 1.48167-3.33375 1.69334-3.70417 1.905-3.70417.13229 0 .18522-.23812.10584-.50271-.0794-.26458.1852-1.56104.5820801-2.8575.66145-2.11666 1.11125-3.78354 1.56105-5.715.10582-.39687.26457-.66145.42332-.58208.15875.10583.18521-.13229.10583-.58208-.15875-.79375.52917-5.10646.92605-5.87375.1323-.26459.26458-.92604.26458-1.50813 0-1.29646.92604-7.62 1.61397-10.95375.66145-3.175 1.69332-6.00604 2.46062-6.82625.52916-.58208.52916-.635.13228-.87312-.26458-.13229-.58208-.71438-.74083-1.27-.21167-.82021-.42332-1.05834-1.05832-1.16417-.42335-.10583-1.16418-.52917-1.61397-.97896-.58208-.52916-1.11125-.79375-1.66688-.79375-.44978 0-1.05833-.15875-1.34937-.34396-.84666-.58208-1.27-.635-2.2489601-.37041M224.133595 3.25438c-1.5875.68791-2.2225 1.48166-3.04271 3.81-.39688 1.08479-.44979 1.50812-.21166 1.87854 1.00541 1.5875 6.58812 13.12333 7.67291 15.90146 3.96875 9.81604 7.1173 21.96041 7.99042 30.7975.21167 2.11666.39688 2.77812.97895 3.62479.39688.58208.87313 1.03187 1.05834 1.03187.23813 0 .9525.26459 1.61396.52917.76729.37042 1.48167.52917 1.95792.42333.42333-.0794 1.19062.0529 1.74625.26459.89958.39687 1.11125.37041 2.61937 0 1.16416-.34396 1.87854-.74084 2.51354-1.37584.47625-.50271 1.05834-.89958 1.32292-.89958.92604 0 1.11125-.68792.9525-3.65125-.29105-5.66208-4.15396-21.43125-7.09083-28.83958a143.51 143.51 0 00-4.97417-10.90084c-.635-1.24354-2.06375-3.99521-3.12208-6.16479-2.19604-4.39208-2.32834-4.49792-6.0325-5.95312-2.98979-1.13771-4.15397-1.21709-5.95312-.47625M463.18466.34396c-7.12176 2.07402-3.05274 9.05394-.88144 13.42295 3.85179 9.26876 4.57051 19.44337 6.57363 29.2077.95204 4.56554 1.24188 9.23908 1.49457 13.87112 2.75494 3.76581 7.93355 3.31193 12.02199 2.57969 2.61981-6.15911.40735-12.76238-.29104-19.10292-.0664-4.81904-.0862-5.26318-2.38388-12.43262-1.73848-8.04361-3.44603-16.44569-7.92453-23.46803-2.14522-1.78899-5.62203-4.95087-8.6093-4.07789z"
                    ></path>
                  </svg>
                </p>

                <p>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" tw="mr-3 h-7 w-7">
                    <path
                      fill="#fff"
                      d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
                    ></path>
                  </svg>{' '}
                  @philw_
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Roboto Slab',
            data: robotoSlabRegularData,
            weight: 400,
            style: 'normal',
          },
          {
            name: 'Roboto Slab',
            data: robotoSlabBoldData,
            weight: 700,
            style: 'normal',
          },
        ],
      }
    );
  } catch (error) {
    console.error(error);
    return new Response('Error', { status: 400 });
  }
}
