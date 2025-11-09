/**
 * Generate purchase confirmation email HTML
 * @param {object} params - Email parameters
 * @param {string} params.customerEmail - Customer email
 * @param {object} params.product - Product data
 * @param {string} params.downloadToken - Download token
 * @param {string} params.successPageUrl - Success page URL
 * @returns {object} - Email subject and HTML body
 */
export function generatePurchaseEmail({ customerEmail, product, downloadToken, successPageUrl }) {
  const subject = `Your ${product.title} Download is Ready!`

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background-color: #000000; padding: 40px 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                Thank You for Your Purchase!
              </h1>
            </td>
          </tr>

          <!-- Success Icon -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <div style="width: 60px; height: 60px; background-color: #22c55e; border-radius: 50%; margin: 0 auto; display: flex; align-items: center; justify-content: center;">
                <span style="color: white; font-size: 32px; line-height: 60px;">✓</span>
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <p style="margin: 0 0 20px; color: #374151; font-size: 16px; line-height: 1.6;">
                Your purchase of <strong>${product.title}</strong> was successful! Your download is ready.
              </p>

              <p style="margin: 0 0 30px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                This email contains everything you need to download and install your plugin.
              </p>

              <!-- Product Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb; border-radius: 8px; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 20px;">
                    <h2 style="margin: 0 0 12px; color: #111827; font-size: 18px; font-weight: 600;">
                      ${product.title}
                    </h2>
                    <p style="margin: 0 0 16px; color: #6b7280; font-size: 14px; line-height: 1.5;">
                      ${product.description}
                    </p>
                    <div style="color: #6b7280; font-size: 13px;">
                      <strong>Category:</strong> ${product.category}<br>
                      <strong>Formats:</strong> VST3, AU (macOS only)
                    </div>
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 30px;">
                <tr>
                  <td align="center">
                    <a href="${successPageUrl}" style="display: inline-block; background-color: #22c55e; color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; font-weight: 600; font-size: 16px;">
                      Download Your Plugin
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #6b7280; font-size: 13px; text-align: center;">
                Or copy this link: <br>
                <a href="${successPageUrl}" style="color: #3b82f6; word-break: break-all;">${successPageUrl}</a>
              </p>
            </td>
          </tr>

          <!-- Platform Info -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; border-radius: 4px;">
                <h3 style="margin: 0 0 12px; color: #1e40af; font-size: 14px; font-weight: 600;">
                  Choose Your Platform
                </h3>
                <p style="margin: 0; color: #1e3a8a; font-size: 13px; line-height: 1.5;">
                  On the download page, select your operating system (macOS, Windows, or Linux) to get the correct version for your system.
                </p>
              </div>
            </td>
          </tr>

          <!-- Installation Quick Guide -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <h3 style="margin: 0 0 16px; color: #111827; font-size: 16px; font-weight: 600;">
                Quick Installation Guide
              </h3>
              <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
                <li>Download and unzip the plugin package</li>
                <li>Copy the plugin files to your DAW's plugin directory</li>
                <li>Restart your DAW and look for VEX MIDI Expression</li>
                <li>Refer to the included User Manual for detailed instructions</li>
              </ol>
            </td>
          </tr>

          <!-- Important Info -->
          <tr>
            <td style="padding: 0 40px 30px;">
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; border-radius: 4px;">
                <h3 style="margin: 0 0 8px; color: #92400e; font-size: 14px; font-weight: 600;">
                  Important Information
                </h3>
                <ul style="margin: 0; padding-left: 20px; color: #78350f; font-size: 13px; line-height: 1.6;">
                  <li>Your download link is valid for 30 days</li>
                  <li>Save this email or bookmark the download page</li>
                  <li>Need to re-download? Visit your download page or contact support</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td style="padding: 0 40px 40px;">
              <h3 style="margin: 0 0 12px; color: #111827; font-size: 16px; font-weight: 600;">
                Need Help?
              </h3>
              <p style="margin: 0 0 12px; color: #6b7280; font-size: 14px; line-height: 1.6;">
                If you have any questions or need assistance with installation, we're here to help!
              </p>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Email us at: <a href="mailto:support@extrasensory.studio" style="color: #3b82f6; text-decoration: none;">support@extrasensory.studio</a>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 8px; color: #6b7280; font-size: 13px;">
                This email was sent to ${customerEmail}
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                © ${new Date().getFullYear()} Extrasensory Studio. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `

  const text = `
Thank You for Your Purchase!

Your purchase of ${product.title} was successful!

Download your plugin here:
${successPageUrl}

Quick Installation Guide:
1. Download and unzip the plugin package
2. Copy the plugin files to your DAW's plugin directory
3. Restart your DAW and look for VEX MIDI Expression
4. Refer to the included User Manual for detailed instructions

Important Information:
- Your download link is valid for 30 days
- Save this email or bookmark the download page
- Need to re-download? Visit your download page or contact support

Need Help?
Email us at: support@extrasensory.studio

This email was sent to ${customerEmail}
© ${new Date().getFullYear()} Extrasensory Studio. All rights reserved.
  `.trim()

  return { subject, html, text }
}
