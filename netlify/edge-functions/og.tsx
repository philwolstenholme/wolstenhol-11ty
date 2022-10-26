import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts';

const robotoSlabRegular = fetch(
  'https://github.com/google/fonts/raw/5c3d8ef085f3084db38936d0dcd39a567dbc1e01/apache/robotoslab/static/RobotoSlab-Regular.ttf'
).then(res => res.arrayBuffer());

const robotoSlabBold = fetch(
  'https://github.com/google/fonts/raw/5c3d8ef085f3084db38936d0dcd39a567dbc1e01/apache/robotoslab/static/RobotoSlab-Bold.ttf'
).then(res => res.arrayBuffer());

export default async function handler(req) {
  const robotoSlabRegularData = await robotoSlabRegular;
  const robotoSlabBoldData = await robotoSlabBold;

  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title');

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          fontFamily: '"Roboto Slab", serif',
          //   backgroundImage:
          //     'url(https://wolstenhol.me/proxy/cloudinary/image/upload/c_crop,f_auto,h_200,w_200,q_auto:eco/v1473712910/subtle_grunge_ux3r0f.png)',
        }}
        tw="relative flex justify-center w-full h-full relative flex-col overflow-hidden bg-yellow-300"
      >
        <div tw="relative flex flex-col flex-1 w-full items-center justify-between content-between">
          <img
            tw="absolute left-0 right-0 top-0 bottom-0 opacity-5 w-full h-full object-cover"
            src="https://wolstenhol.me/proxy/cloudinary/image/upload/c_fill%2Cg_north%2Cw_730%2Ch_364%2Cf_auto%2Cq_auto%3Alow%2Fv1661284312%2Fone-offs%2F9-soft-grunge-texture-4-1.png"
            alt=""
          />
          <div tw="flex flex-1 items-center px-30 z-10">
            <h1
              tw="text-5xl font-bold text-black text-center"
              style={{
                transform: 'rotate(-0.5deg)',
              }}
            >
              {title || `Phil Wolstenholme's personal website, blog and portfolio`}
            </h1>
          </div>
          <img
            tw="h-80 mt-4 rounded-tl-xl rounded-tr-xl shadow-2xl z-10"
            src="https://res.cloudinary.com/wolstenh/image/upload/v1666814388/one-offs/website.png"
            alt=""
          />
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
              <p>A webpage by Phil Wolstenholme</p>
              <p>@philw_</p>
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
}
