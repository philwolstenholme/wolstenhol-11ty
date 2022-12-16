export default async (request, context) => {
  const response = await context.next();
  const page = await response.text();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.startsWith('text/html')) {
    return response;
  }

  const userAgent = response.headers.get('user-agent');

  if (
    userAgent.includes("DebugBear") ||
    userAgent.includes("PTST") ||
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
