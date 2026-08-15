import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { orderReferenceId, customer, items } = body;

    const response = await fetch('https://order.gelatoapis.com/v1/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': import.meta.env.GELATO_API_KEY,
      },
      body: JSON.stringify({
        orderType: 'draft', // Utilise 'draft' pendant le développement pour éviter les prélèvements réels
        orderReferenceId: orderReferenceId,
        customerReferenceId: customer.email,
        currency: 'EUR',
        shippingAddress: {
          firstName: customer.firstName,
          lastName: customer.lastName,
          addressLine1: customer.address,
          city: customer.city,
          postcode: customer.postalCode,
          country: customer.country || 'FR',
          email: customer.email,
        },
        items: items.map((item: any) => ({
          itemReferenceId: item.id,
          productUid: item.gelatoProductUid, // ex: apparel_unisex_t-shirt_black_m
          quantity: item.quantity,
          files: [
            {
              type: 'default',
              url: item.designUrl, // Lien public haute définition de ton visuel
            },
          ],
        })),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify({ error: data }), { status: response.status });
    }

    return new Response(JSON.stringify({ success: true, order: data }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Erreur interne du serveur' }), { status: 500 });
  }
};