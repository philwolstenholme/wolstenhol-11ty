export default async (request, context) => {
  const requestHeaders = Object.fromEntries(request.headers);
  const userAgent = requestHeaders["user-agent"];

  const response = await context.next();
  const page = await response.text();

  if (
    userAgent.includes("DebugBear") ||
    userAgent.includes("WebPageTest") ||
    userAgent.includes("Lighthouse")
  ) {
    const removeAnimationCSS = `
      <style>
        *, ::before, ::after {
          animation-delay: -1ms !important;
          animation-duration: 1ms !important;
          animation-iteration-count: 1 !important;
        }
      </style> 
    `;
    const page = page.replace("</body>", removeAnimationCSS + "</body>");
  }

  return new Response(page, response);
};
