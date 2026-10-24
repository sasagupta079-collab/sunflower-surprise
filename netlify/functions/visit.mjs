
export default async (request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const recipient = process.env.WHATSAPP_RECIPIENT;
  const apiVersion = process.env.WHATSAPP_API_VERSION || "v23.0";

  if (!token || !phoneNumberId || !recipient) {
    console.error("Missing WhatsApp environment variables");
    return new Response("WhatsApp is not configured", { status: 500 });
  }

  try {
    const body = await request.json();

    if (body.event !== "page_open") {
      return new Response("Invalid event", { status: 400 });
    }

    const response = await fetch(
      `https://graph.facebook.com/${apiVersion}/${phoneNumberId}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          recipient_type: "individual",
          to: recipient,
          type: "text",
          text: {
            body: "🌻 Your butki opened the sunflower surprise!",
          },
        }),
      }
    );

    const result = await response.text();

    if (!response.ok) {
      console.error("WhatsApp API error:", result);
      return new Response("WhatsApp message failed", { status: 502 });
    }

    return new Response("Notification sent", { status: 200 });
  } catch (error) {
    console.error("Notification error:", error);
    return new Response("Server error", { status: 500 });
  }
};
