/**
 * Google Apps Script — Contact Form Handler
 * ==========================================
 * HOW TO DEPLOY:
 * 1. Go to https://script.google.com and create a new project
 * 2. Paste this entire file into the editor
 * 3. Click Deploy → New Deployment → Web App
 * 4. Set "Execute as" = Me, "Who has access" = Anyone
 * 5. Click Deploy and copy the Web App URL
 * 6. In your portfolio project, create a .env file (or set in GitHub secrets):
 *    VITE_GAS_URL=https://script.google.com/macros/s/YOUR_ID/exec
 * 7. Redeploy the portfolio (npm run build + git push)
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents)

    const recipient = 'i.chapchakhov@gmail.com'
    const subject   = `[Portfolio Contact] ${data.subject || 'New message'}`
    const body      = [
      `Name:    ${data.name}`,
      `Email:   ${data.email}`,
      `Subject: ${data.subject}`,
      '',
      data.message,
    ].join('\n')

    MailApp.sendEmail({
      to:      recipient,
      subject: subject,
      body:    body,
      replyTo: data.email,
    })

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON)

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON)
  }
}

// Test function — run this in the Apps Script editor to verify email works
function testDoPost() {
  const mockEvent = {
    postData: {
      contents: JSON.stringify({
        name:    'Test User',
        email:   'test@example.com',
        subject: 'Test message',
        message: 'This is a test from the Apps Script editor.',
      })
    }
  }
  const result = doPost(mockEvent)
  Logger.log(result.getContent())
}
