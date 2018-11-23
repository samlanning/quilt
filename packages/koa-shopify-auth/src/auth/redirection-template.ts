export default function redirectionTemplate({origin, redirectTo}) {
  return `
    <script type="text/javascript">
      document.addEventListener('DOMContentLoaded', function() {
        sessionStorage.setItem('shopify.top_level_interaction', true);
        document.cookie = 'shopify.top_level_oauth=true';

        if (window.top === window.self) {
          // If the current window is the 'parent', change the URL by setting location.href
          window.location.href = '${redirectTo}';
        } else {
          // If the current window is the 'child', change the parent's URL with postMessage
          data = JSON.stringify({
            message: 'Shopify.API.remoteRedirect',
            data: { location: '${redirectTo}' }
          });

          window.parent.postMessage(data, '${origin}');
        }
      });
    </script>
  `;
}