# License Key Distribution Integration Plan
**Project**: VEX MIDI EXPRESSION
**Website**: extrasensory.studio
**Created**: 2025-11-17
**Status**: Ready for Implementation

---

## Table of Contents
1. [Overview](#overview)
2. [Current System Architecture](#current-system-architecture)
3. [Integration Architecture](#integration-architecture)
4. [Implementation Phases](#implementation-phases)
5. [Technical Specifications](#technical-specifications)
6. [File Changes Required](#file-changes-required)
7. [Testing Strategy](#testing-strategy)
8. [Deployment Checklist](#deployment-checklist)

---

## Overview

### Current Situation
- VEX MIDI EXPRESSION plugin has licensing system implemented (C++/JUCE)
- License format: `VXME-XXXX-XXXX-XXXX` (16 chars with checksum)
- Python key generator exists: `scripts/generate_license.py`
- extrasensory.studio has Stripe checkout + download delivery
- **Gap**: Users receive download link but NO license key upon purchase

### Goal
Automatically generate and deliver license keys to customers upon purchase, integrated with existing Stripe webhook flow.

### Success Criteria
- ✅ License key generated automatically on purchase
- ✅ Email includes both download link AND license key
- ✅ Success page displays license key prominently
- ✅ License keys stored securely in Vercel KV
- ✅ Customers can retrieve lost keys via email lookup
- ✅ System ready for launch (no existing customers to migrate)

---

## Current System Architecture

### VEX MIDI EXPRESSION (Plugin - This Repo)

**License Components**:
- `Source/Licensing/LicenseManager.h/cpp` - License validation & trial management
- `Source/Licensing/LicenseTypes.h/cpp` - Data structures
- `Source/Licensing/TrialStorage.h/cpp` - File storage
- `scripts/generate_license.py` - Key generation script

**License Format**:
```
VXME-XXXX-XXXX-XXXX
│    │    │    └─ Checksum (4 chars)
│    └────┴────── Random data (8 chars)
└──────────────── Prefix (VXME)
```

**Checksum Algorithm**:
```python
combined = "VXME" + random_8_chars
hash = SHA256(combined).hex().upper()
checksum = hash[0:4]  # First 4 characters
```

**License Storage** (Plugin):
- macOS: `~/Library/Application Support/VEX_MIDI_EXPRESSION/`
- Windows: `%APPDATA%\VEX_MIDI_EXPRESSION\`
- Linux: `~/.config/vex-midi-expression/`

**Trial Period**: 14 days from first launch

---

### extrasensory.studio (Website)

**Stack**:
- Next.js 15.5.2
- Stripe for payments
- Vercel KV for data storage
- Resend for email delivery

**Current Flow**:
```
Purchase → Stripe webhook → Generate download token →
Store in KV → Send email → Success page with download link
```

**Existing Files**:
- `src/app/api/webhooks/stripe/route.js` - Stripe webhook handler
- `src/lib/downloadTokens.js` - Token generation/validation
- `src/lib/emails/purchaseConfirmation.js` - Email template
- `src/app/success/page.js` - Purchase success page
- `src/app/api/download/route.js` - File download handler
- `src/lib/products.js` - Product catalog

**Vercel KV Storage**:
```
download:{token} → { sessionId, productId, customerEmail, expiresAt }
email:{email} → [token1, token2, ...]
```

---

## Integration Architecture

### New Data Structures

#### License Key Record (Vercel KV)
```javascript
{
  licenseKey: "VXME-XXXX-XXXX-XXXX",
  sessionId: "cs_...",
  customerEmail: "user@example.com",
  productId: "midi-warp",
  purchaseDate: 1700000000000,
  issuedAt: 1700000000000,
  status: "active", // "active" | "revoked" | "refunded"
  type: "perpetual",
  metadata: {
    stripeCustomerId: "cus_...",
    purchaseAmount: 3000
  }
}
```

#### KV Key Structure
```
license:{key}                    → Full license data
email:{email}:licenses           → Array of license keys
session:{sessionId}:license      → License key for session lookup
product:{productId}:licenses     → Array of all licenses (admin)
```

### Modified Webhook Flow

```
Stripe: checkout.session.completed
  ↓
1. Extract session data (existing)
  ↓
2. Generate download token (existing)
  ↓
3. Generate license key (NEW)
  ↓
4. Store license in KV (NEW)
  ↓
5. Link session → license (NEW)
  ↓
6. Send email with download + license (MODIFIED)
  ↓
7. Redirect to success page with license (MODIFIED)
```

---

## Implementation Phases

### Phase 1: Core Integration (ESSENTIAL)
**Estimated Time**: 4-6 hours

**Goal**: Automatic license key delivery on purchase

**Tasks**:
1. Create `src/lib/licenseKeys.js`
   - Port Python checksum algorithm to JavaScript
   - Implement key generation
   - Implement key validation
   - KV storage/retrieval functions

2. Modify `src/app/api/webhooks/stripe/route.js`
   - Generate license key after download token
   - Store license in KV
   - Link session to license

3. Update `src/lib/emails/purchaseConfirmation.js`
   - Add license key section (prominent display)
   - Add activation instructions
   - Include both download link and key

4. Update `src/app/success/page.js`
   - Fetch license key from KV
   - Display license prominently
   - Add copy-to-clipboard button
   - Show activation instructions

**Deliverables**:
- Users receive license key via email
- Success page displays license key
- Keys stored in Vercel KV
- End-to-end tested with Stripe test mode

---

### Phase 2: License Lookup (RECOMMENDED)
**Estimated Time**: 2-3 hours

**Goal**: Allow customers to retrieve lost license keys

**Tasks**:
1. Create `src/app/my-licenses/page.js`
   - Email input form
   - Success/error states
   - Security (rate limiting)

2. Create `src/app/api/request-license/route.js`
   - Validate email
   - Fetch licenses from KV
   - Send recovery email via Resend
   - Rate limiting

3. Create `src/lib/emails/licenseRecovery.js`
   - Professional email template
   - List all licenses for email
   - Include download links

4. Add navigation
   - Link in footer: "Lost your license?"
   - Link in header menu

**Deliverables**:
- Self-service license recovery
- Automated email delivery
- Rate limiting to prevent abuse

---

### Phase 3: Validation API (FUTURE ENHANCEMENT)
**Estimated Time**: 3-4 hours
**Priority**: LOW (can skip for launch)

**Goal**: Online license validation and activation tracking

**Tasks**:
1. Create `src/app/api/validate-license/route.js`
   - Validate license key
   - Check status (active/revoked)
   - Record activation attempts
   - Return validation response

2. Track activations in KV
   - Record hardware fingerprint
   - Track activation count
   - Support license transfers

3. Update C++ plugin (optional)
   - Optional online validation
   - Fallback to offline validation
   - Better error messages

**Deliverables**:
- Online validation endpoint
- Activation tracking
- Future-proof for multi-device licensing

---

### Phase 4: Admin Dashboard (OPTIONAL)
**Estimated Time**: 4-6 hours
**Priority**: LOW (manual admin work acceptable)

**Goal**: Admin interface for license management

**Tasks**:
1. Auth middleware
2. License list view
3. Search/filter capabilities
4. License revocation
5. Manual key generation
6. Analytics dashboard

**Deliverables**:
- Admin-only license management UI
- Revocation system
- Usage analytics

---

## Technical Specifications

### License Key Generation (JavaScript)

**File**: `src/lib/licenseKeys.js`

```javascript
import crypto from 'crypto'
import { kv } from '@vercel/kv'

/**
 * Calculate checksum for license key
 * Must match Python script: scripts/generate_license.py
 */
function calculateChecksum(prefix, keyData) {
  const combined = prefix + keyData
  const hash = crypto
    .createHash('sha256')
    .update(combined, 'utf-8')
    .digest('hex')
    .toUpperCase()
  return hash.substring(0, 4) // First 4 characters
}

/**
 * Generate random alphanumeric key data
 */
function generateKeyData(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let result = ''
  const randomBytes = crypto.randomBytes(length)

  for (let i = 0; i < length; i++) {
    result += chars[randomBytes[i] % chars.length]
  }

  return result
}

/**
 * Generate complete license key
 */
export function generateLicenseKey() {
  const prefix = 'VXME'
  const keyData = generateKeyData(8)
  const checksum = calculateChecksum(prefix, keyData)

  // Full key: VXME + 8 chars + 4 char checksum
  const fullKey = prefix + keyData + checksum

  // Format: VXME-XXXX-XXXX-XXXX
  return [
    fullKey.substring(0, 4),
    fullKey.substring(4, 8),
    fullKey.substring(8, 12),
    fullKey.substring(12, 16)
  ].join('-')
}

/**
 * Validate license key format and checksum
 */
export function validateLicenseKey(key) {
  // Remove hyphens and spaces
  const normalized = key.replace(/[-\s]/g, '').toUpperCase()

  // Check length
  if (normalized.length !== 16) {
    return { valid: false, error: 'Invalid key length' }
  }

  // Check prefix
  if (!normalized.startsWith('VXME')) {
    return { valid: false, error: 'Invalid key prefix' }
  }

  // Extract parts
  const prefix = normalized.substring(0, 4)
  const keyData = normalized.substring(4, 12)
  const checksum = normalized.substring(12, 16)

  // Calculate expected checksum
  const expectedChecksum = calculateChecksum(prefix, keyData)

  if (checksum !== expectedChecksum) {
    return { valid: false, error: 'Invalid checksum' }
  }

  return { valid: true }
}

/**
 * Store license in Vercel KV
 */
export async function storeLicense(licenseKey, sessionId, productId, customerEmail) {
  const licenseData = {
    licenseKey,
    sessionId,
    customerEmail,
    productId,
    purchaseDate: Date.now(),
    issuedAt: Date.now(),
    status: 'active',
    type: 'perpetual'
  }

  try {
    // Store license by key
    await kv.set(`license:${licenseKey}`, JSON.stringify(licenseData))

    // Store by session ID
    await kv.set(`session:${sessionId}:license`, licenseKey)

    // Add to email's license list
    const emailKey = `email:${customerEmail.toLowerCase()}:licenses`
    const existingLicenses = await kv.get(emailKey) || []
    existingLicenses.push(licenseKey)
    await kv.set(emailKey, existingLicenses)

    // Add to product's license list (for admin)
    const productKey = `product:${productId}:licenses`
    const productLicenses = await kv.get(productKey) || []
    productLicenses.push(licenseKey)
    await kv.set(productKey, productLicenses)

    return licenseData
  } catch (error) {
    console.error('Error storing license:', error)
    throw error
  }
}

/**
 * Get license by key
 */
export async function getLicenseByKey(key) {
  try {
    const data = await kv.get(`license:${key}`)
    return data ? (typeof data === 'string' ? JSON.parse(data) : data) : null
  } catch (error) {
    console.error('Error getting license:', error)
    return null
  }
}

/**
 * Get all licenses for an email
 */
export async function getLicensesByEmail(email) {
  try {
    const emailKey = `email:${email.toLowerCase()}:licenses`
    const keys = await kv.get(emailKey) || []

    const licenses = []
    for (const key of keys) {
      const license = await getLicenseByKey(key)
      if (license) {
        licenses.push(license)
      }
    }

    return licenses
  } catch (error) {
    console.error('Error getting licenses by email:', error)
    return []
  }
}

/**
 * Get license by session ID
 */
export async function getLicenseBySession(sessionId) {
  try {
    const licenseKey = await kv.get(`session:${sessionId}:license`)
    if (!licenseKey) return null

    return await getLicenseByKey(licenseKey)
  } catch (error) {
    console.error('Error getting license by session:', error)
    return null
  }
}
```

---

### Email Template Updates

**File**: `src/lib/emails/purchaseConfirmation.js`

**Add after Product Info Box** (around line 73):

```javascript
<!-- LICENSE KEY SECTION -->
<tr>
  <td style="padding: 0 40px 30px;">
    <div style="background-color: #f0fdf4; border: 2px solid #22c55e; padding: 24px; border-radius: 8px; text-align: center;">
      <h3 style="margin: 0 0 12px; color: #166534; font-size: 18px; font-weight: 700;">
        🔑 Your License Key
      </h3>
      <div style="background-color: white; padding: 16px; border-radius: 4px; margin: 16px 0;">
        <code style="font-size: 24px; font-weight: 700; color: #22c55e; letter-spacing: 2px; font-family: 'Courier New', monospace;">
          ${licenseKey}
        </code>
      </div>
      <p style="margin: 0; color: #166534; font-size: 14px;">
        Copy this key to activate your plugin after installation
      </p>
    </div>
  </td>
</tr>

<!-- ACTIVATION INSTRUCTIONS -->
<tr>
  <td style="padding: 0 40px 30px;">
    <h3 style="margin: 0 0 16px; color: #111827; font-size: 16px; font-weight: 600;">
      How to Activate Your License
    </h3>
    <ol style="margin: 0; padding-left: 20px; color: #374151; font-size: 14px; line-height: 1.8;">
      <li>Download and install the plugin (see download button above)</li>
      <li>Open VEX MIDI EXPRESSION in your DAW</li>
      <li>Click "Activate License" in the trial banner</li>
      <li>Paste your license key: <strong>${licenseKey}</strong></li>
      <li>Click "Activate" - you're done! 🎉</li>
    </ol>
  </td>
</tr>
```

**Update function signature**:
```javascript
export function generatePurchaseEmail({
  customerEmail,
  product,
  downloadToken,
  successPageUrl,
  licenseKey  // NEW parameter
})
```

---

### Success Page Updates

**File**: `src/app/success/page.js`

**Add state for license key** (around line 14):
```javascript
const [licenseKey, setLicenseKey] = useState(null)
const [copied, setCopied] = useState(false)
```

**Fetch license key** (in useEffect, around line 20):
```javascript
useEffect(() => {
  async function fetchLicenseKey() {
    if (token) {
      // Fetch license by token
      const res = await fetch(`/api/get-license?token=${token}`)
      const data = await res.json()
      setLicenseKey(data.licenseKey)
    }
  }

  if (productId) {
    const productData = getProduct(productId)
    setProduct(productData)
    fetchLicenseKey()
  }
}, [productId, token])
```

**Add copy function**:
```javascript
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
  setCopied(true)
  setTimeout(() => setCopied(false), 2000)
}
```

**Add license card** (before platform selection, around line 108):
```jsx
{/* LICENSE KEY CARD */}
{licenseKey && (
  <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 mb-8 text-center">
    <h3 className="text-xl font-bold text-green-900 mb-3">
      🔑 Your License Key
    </h3>

    <div className="bg-white rounded p-4 mb-4 flex items-center justify-center gap-3">
      <code className="text-2xl font-bold text-green-600 tracking-wider font-mono">
        {licenseKey}
      </code>
      <button
        onClick={() => copyToClipboard(licenseKey)}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
      >
        {copied ? '✓ Copied!' : '📋 Copy'}
      </button>
    </div>

    <p className="text-sm text-green-800 mb-3">
      Save this key! You'll need it to activate the plugin after installation.
    </p>

    <div className="bg-green-100 border border-green-300 rounded p-3 text-left text-xs text-green-900">
      <strong>Activation Steps:</strong>
      <ol className="list-decimal list-inside mt-2 space-y-1">
        <li>Download and install the plugin below</li>
        <li>Open VEX MIDI EXPRESSION in your DAW</li>
        <li>Click "Activate License" in the trial banner</li>
        <li>Paste your license key and click "Activate"</li>
      </ol>
    </div>
  </div>
)}
```

---

### Webhook Handler Updates

**File**: `src/app/api/webhooks/stripe/route.js`

**After generating download token** (around line 75):

```javascript
// Generate license key
const { generateLicenseKey, storeLicense } = await import('@/lib/licenseKeys')
const licenseKey = generateLicenseKey()

// Store license in KV
await storeLicense(licenseKey, session.id, productId, customerEmail)

console.log('License key generated:', licenseKey)
```

**Update email generation** (around line 80):
```javascript
const emailContent = generatePurchaseEmail({
  customerEmail,
  product,
  downloadToken,
  successPageUrl,
  licenseKey  // NEW
})
```

---

### New API Route: Get License

**File**: `src/app/api/get-license/route.js` (NEW)

```javascript
import { NextResponse } from 'next/server'
import { getLicenseBySession } from '@/lib/licenseKeys'
import { verifyDownloadToken } from '@/lib/downloadTokens'

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get('token')

    if (!token) {
      return NextResponse.json(
        { error: 'Missing token' },
        { status: 400 }
      )
    }

    // Verify download token
    const tokenData = await verifyDownloadToken(token)

    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid or expired token' },
        { status: 403 }
      )
    }

    // Get license by session
    const license = await getLicenseBySession(tokenData.sessionId)

    if (!license) {
      return NextResponse.json(
        { error: 'License not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      licenseKey: license.licenseKey,
      productId: license.productId
    })

  } catch (error) {
    console.error('Get license error:', error)
    return NextResponse.json(
      { error: 'Failed to get license' },
      { status: 500 }
    )
  }
}
```

---

## File Changes Required

### New Files to Create (extrasensory-studio)

```
src/
├── lib/
│   ├── licenseKeys.js                      # Core license logic
│   └── emails/
│       └── licenseRecovery.js              # Phase 2
├── app/
│   ├── my-licenses/
│   │   └── page.js                         # Phase 2
│   └── api/
│       ├── get-license/
│       │   └── route.js                    # Phase 1
│       ├── request-license/
│       │   └── route.js                    # Phase 2
│       └── validate-license/
│           └── route.js                    # Phase 3 (optional)
```

### Files to Modify (extrasensory-studio)

```
src/
├── lib/
│   └── emails/
│       └── purchaseConfirmation.js         # Add license section
├── app/
│   ├── success/
│   │   └── page.js                         # Display license
│   └── api/
│       └── webhooks/
│           └── stripe/
│               └── route.js                # Generate license
```

---

## Testing Strategy

### 1. Unit Tests

**Test license generation**:
```bash
# In extrasensory-studio project
node -e "
  const { generateLicenseKey, validateLicenseKey } = require('./src/lib/licenseKeys');
  const key = generateLicenseKey();
  console.log('Generated:', key);
  console.log('Valid:', validateLicenseKey(key));
"
```

**Cross-validate with Python**:
```bash
# Generate key in JavaScript
JS_KEY="VXME-XXXX-XXXX-XXXX"

# Validate in Python
cd /path/to/midi-warp
python3 scripts/generate_license.py --validate $JS_KEY
```

### 2. Stripe Webhook Testing

**Use Stripe CLI**:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
stripe trigger checkout.session.completed
```

**Verify**:
- Download token generated ✓
- License key generated ✓
- Both stored in KV ✓
- Email sent with both ✓

### 3. End-to-End Flow

**Test path**:
1. Create test product in Stripe dashboard
2. Complete test checkout
3. Verify webhook processes correctly
4. Check email delivery (to test email)
5. Visit success page
6. Verify license key displayed
7. Copy license key
8. Activate in plugin
9. Verify activation successful

### 4. Edge Cases

**Test scenarios**:
- [ ] Duplicate purchase (same email) - should create new key
- [ ] Invalid license key format - should reject
- [ ] Expired download token but valid license - should work
- [ ] Lost email - use license recovery
- [ ] KV storage failure - should error gracefully
- [ ] Email delivery failure - should log error but continue

---

## Deployment Checklist

### Pre-Deployment

- [ ] All unit tests passing
- [ ] Stripe test mode tested end-to-end
- [ ] Email templates verified (test email)
- [ ] Success page displays correctly
- [ ] License activation in plugin works
- [ ] KV storage confirmed working
- [ ] Error handling tested

### Environment Variables

**Verify in Vercel dashboard**:
```bash
# Required (already set)
STRIPE_SECRET_KEY=sk_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
VERCEL_KV_URL=...
VERCEL_KV_REST_API_URL=...
VERCEL_KV_REST_API_TOKEN=...
NEXT_PUBLIC_APP_URL=https://extrasensory.studio

# No new variables needed!
```

### Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "feat: Add license key distribution system"
   git push origin main
   ```

2. **Vercel auto-deploys** (if connected)

3. **Verify webhook URL** in Stripe:
   - Endpoint: `https://extrasensory.studio/api/webhooks/stripe`
   - Events: `checkout.session.completed`

4. **Test in production** (with Stripe test mode):
   - Complete test purchase
   - Verify email delivery
   - Check license activation

5. **Switch to live mode**:
   - Update Stripe keys to live mode
   - Update webhook secret
   - Create real product
   - Final test with real card (refund immediately)

### Post-Deployment

- [ ] Monitor Vercel logs for errors
- [ ] Check KV storage metrics
- [ ] Verify email delivery rate
- [ ] Test license recovery flow
- [ ] Document admin procedures

---

## Answers to Key Questions

### 1. Phase Priority
**Decision**: Phase 1 + Phase 2
- Phase 1: Essential (auto-delivery)
- Phase 2: Highly recommended (license recovery)
- Phase 3: Future enhancement (skip for launch)
- Phase 4: Optional (manual admin acceptable)

### 2. Existing Customers
**Decision**: Not applicable (no customers yet)

### 3. Multi-Device Support
**Current**: Hardware-bound (1 device per license)
**Future**: Allow license transfers via support request
**Plugin behavior**: Fully offline validation, no phone-home

### 4. Product Scope
**Decision**: Design for multiple products from day 1
- Minimal extra effort
- Future-proof architecture
- Product ID in all license records

### 5. Testing
**Decision**: Stripe test mode first
- Test all flows thoroughly
- Use test credit cards
- Verify with real DAW activation
- Switch to live mode only when confirmed working

---

## Success Metrics

**Track in analytics**:
- License keys issued
- Activation rate (future: via validation API)
- License recovery requests
- Customer support requests about licensing
- Failed activation attempts

**KV Queries**:
```javascript
// Total licenses issued
const allLicenses = await kv.keys('license:*')
console.log('Total licenses:', allLicenses.length)

// Licenses for specific product
const productLicenses = await kv.get('product:midi-warp:licenses')
console.log('VEX licenses:', productLicenses.length)

// Customer's licenses
const customerLicenses = await kv.get('email:user@example.com:licenses')
console.log('Customer licenses:', customerLicenses)
```

---

## Reference Links

### Documentation
- Python generator: `midi-warp/scripts/generate_license.py`
- License manager: `midi-warp-vst/Source/Licensing/LicenseManager.h`
- Activation guide: `midi-warp/ACTIVATION_GUIDE.txt`

### Repositories
- Plugin: `/Users/erikparr/_Prototypes/xs00/midi-warp`
- Website: `/Users/erikparr/Documents/_Web/extrasensory-dot-studio/extrasensory-studio`

### External Services
- Stripe Dashboard: https://dashboard.stripe.com
- Vercel Dashboard: https://vercel.com/dashboard
- Resend Dashboard: https://resend.com/emails

---

## Next Steps

1. **Switch to extrasensory-studio repository**
2. **Implement Phase 1** (Core Integration)
3. **Test with Stripe test mode**
4. **Implement Phase 2** (License Recovery)
5. **Final testing**
6. **Deploy to production**

---

**Document Status**: Ready for implementation
**Last Updated**: 2025-11-17
**Next Review**: After Phase 1 completion
