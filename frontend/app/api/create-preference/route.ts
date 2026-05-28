import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN!,
});

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const preference = new Preference(client);

    const response = await preference.create({

      body: {

        items: body.items.map((item: any) => ({

          title: item.nombre,

          quantity: item.cantidad,

          currency_id: "CLP",

          unit_price: Number(item.precio),

        })),

      },

    });

    return Response.json({
      id: response.id,
    });

  } catch (error) {

    console.log(error);

    return Response.json(
      {
        error: "Error creando preferencia",
      },
      {
        status: 500,
      }
    );

  }

}