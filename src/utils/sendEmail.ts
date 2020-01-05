import sendgrid from "@sendgrid/mail";

// TODO: do email sending in dedicated notification service
// TODO: add error handling
// TODO: replace recipient during development if env variable is set
export async function sendEmail(email: string, url: string) {
  sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);
  const msg = {
    to: email,
    from: "GraphQL <info@gerbig.org>",
    subject: "Bitte bestätige noch Deinen Account!",
    text: `Einfach Link kopieren: ${url}`,
    html: `Einfach hier klicken: <a href="${url}">${url}</a>`
  };
  sendgrid.send(msg);
}
