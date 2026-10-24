# Sunflower surprise + WhatsApp visit alerts

The existing sunflower page and message are preserved. A visit event is sent every time the page loads.
This starter project does not send alerts until you deploy it and configure WhatsApp Business Platform credentials.

## Required setup

1. Create/configure a WhatsApp Business Platform app in Meta for Developers and obtain:
   - a WhatsApp Cloud API access token
   - a WhatsApp phone number ID
   - a recipient phone number in international format (digits only, including country code)
2. Deploy this project as a Netlify site that supports Functions (use a Git-connected project or Netlify CLI; a simple static drag-and-drop upload may not deploy the function).
3. In Netlify site environment variables, add:
   - `WHATSAPP_ACCESS_TOKEN` = your secret access token
   - `WHATSAPP_PHONE_NUMBER_ID` = your sender phone number ID from Meta
   - `WHATSAPP_RECIPIENT` = your own WhatsApp number, digits only with country code
   - optional `WHATSAPP_API_VERSION` = a currently supported Graph API version
4. Redeploy after setting the variables.
5. Test with your own phone first. Depending on your WhatsApp Business setup and messaging window, Meta may require an approved message template rather than a free-form text message.

## Important notes

- Never put your access token in `index.html` or share it in chat.
- The alert fires on every page load, including refreshes and some link-preview/bot requests; it cannot prove that she personally read the page.
- This project sends only a visit alert; it does not order flowers.
- If someone repeatedly reloads the page, you may receive repeated messages and API charges/limits may apply.
