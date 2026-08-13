// =========================================
// CEBNET — CONTENTFUL CLIENT
// =========================================

const SPACE_ID     = 'kf5u6525lgz5'
const ACCESS_TOKEN = 'VKWFXzkpbW0xfsDGGtWbH291fx2XNa072UDH9ot4W2A'
const BASE_URL   = `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/master`

async function fetchEntries(contentType, params = '') {
  const res = await fetch(
    `${BASE_URL}/entries?content_type=${contentType}&include=2${params}`,
    { headers: { Authorization: `Bearer ${ACCESS_TOKEN}` } }
  )
  if (!res.ok) throw new Error(`Contentful fetch failed: ${res.status}`)
  return res.json()
}

// ── Resolve asset URL from includes ──
function resolveAsset(assetId, includes, opts = {}) {
  if (!includes?.Asset) return null
  const asset = includes.Asset.find(a => a.sys.id === assetId)
  if (!asset) return null
  let url = 'https:' + asset.fields.file.url
  // Ask Contentful's Images API for a right-sized, compressed version instead of
  // whatever the raw uploaded file happens to be — large unoptimized uploads (a
  // multi-MB logo, for example) are the most common cause of a slow/failed load.
  if (opts.width) url += `?w=${opts.width}&fm=webp&q=85`
  return url
}

// ── Resolve a "many files" media field to an array of URLs ──
function resolveAssets(assetRefs, includes) {
  if (!Array.isArray(assetRefs) || !includes?.Asset) return []
  return assetRefs
    .map(ref => resolveAsset(ref?.sys?.id, includes))
    .filter(Boolean)
}

// ── Format a Contentful "Date" field value into MM/DD/YYYY for display.
// Contentful returns date-only fields as "2026-08-18" and full date/time
// fields as "2026-08-18T00:00:00.000Z" — this reads the date portion
// directly from the string instead of `new Date(str)`, since parsing a
// date-only string that way applies UTC and can shift the displayed day
// by one depending on the visitor's local timezone. ──
function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('T')[0].split('-')
  if (!year || !month || !day) return dateStr
  return `${month}/${day}/${year}`
}

// ── SITE INFO ──
export async function fetchSiteInfo() {
  try {
    const data = await fetchEntries('siteInfo')
    if (!data.items?.length) return null
    const f = data.items[0].fields
    return {
      siteName:      f.siteName      || '',
      tagline:       f.tagline       || '',
      email:         f.email         || '',
      emailSales:    f.emailSales    || '',
      emailTech:     f.emailTech     || '',
      phone1:        f.phone1        || '',
      phone1Label:   f.phone1Label   || '',
      phone2:        f.phone2        || '',
      phone2Label:   f.phone2Label   || '',
      address:       f.address       || '',
      businessHours: f.businessHours || '',
    }
  } catch (e) {
    console.error('fetchSiteInfo error:', e)
    return null
  }
}

// ── PARTNERS ──
export async function fetchPartners() {
  try {
    const data = await fetchEntries('partner')
    return data.items
      .map(item => ({
        name:   item.fields.name  || '',
        desc:   item.fields.description || '',
        // "levels" is a Contentful "Short text, list" field — each vendor's own
        // partnership title(s), free text (e.g. "Select Partner", "MSP Partner").
        // A vendor can have zero, one, or several — no fixed tier system.
        levels: Array.isArray(item.fields.levels) ? item.fields.levels : [],
        logo:   resolveAsset(item.fields.logo?.sys?.id, data.includes, { width: 500 }) || '',
        order:  item.fields.order ?? 99,
      }))
      .sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('fetchPartners error:', e)
    return []
  }
}

// ── SERVICES ──
export async function fetchServices() {
  try {
    const data = await fetchEntries('service')
    return data.items.map(item => ({
      title: item.fields.title || '',
      desc:  item.fields.description || '',
      icon:  item.fields.icon || 'network',
      image: resolveAsset(item.fields.image?.sys?.id, data.includes) || '',
    }))
  } catch (e) {
    console.error('fetchServices error:', e)
    return []
  }
}

// ── JOBS ──
export async function fetchJobs() {
  try {
    const data = await fetchEntries('job')
    return data.items.map(item => ({
      title: item.fields.title      || '',
      dept:  item.fields.department || '',
      type:  item.fields.type       || '',
      loc:   item.fields.location   || '',
    }))
  } catch (e) {
    console.error('fetchJobs error:', e)
    return []
  }
}

// ── GALLERY ──
export async function fetchGallery() {
  try {
    const data = await fetchEntries('gallery')
    return data.items
      .map(item => ({
        title: item.fields.title || '',
        order: item.fields.order ?? 99,
        image: resolveAsset(item.fields.image?.sys?.id, data.includes) || '',
      }))
      .sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('fetchGallery error:', e)
    return []
  }
}

// ── ANNOUNCEMENTS ──
// Client-managed in Contentful (content type: "announcement").
// "images" is a "Media, many files" field — optional, can hold one or more images.
// Leave no entries published to show the "no announcements" placeholder on the site.
export async function fetchAnnouncements() {
  try {
    const data = await fetchEntries('announcement')
    return data.items
      .map(item => ({
        title:     item.fields.title     || '',
        message:   item.fields.message   || '',
        date:      formatDate(item.fields.date),
        images:    resolveAssets(item.fields.images, data.includes),
        link:      item.fields.link      || '',
        linkLabel: item.fields.linkLabel || 'See Details',
        order:     item.fields.order     ?? 99,
      }))
      .sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('fetchAnnouncements error:', e)
    return []
  }
}

// ── OFFERS ──
// Client-managed in Contentful (content type: "offer").
// "link" can point anywhere (e.g. /services or an external URL); defaults to /services when left blank.
export async function fetchOffers() {
  try {
    const data = await fetchEntries('offer')
    return data.items
      .map(item => ({
        title:     item.fields.title       || '',
        desc:      item.fields.description || '',
        badge:     item.fields.badge       || '',
        logo:      resolveAsset(item.fields.logo?.sys?.id, data.includes, { width: 200 }) || '',
        link:      item.fields.link        || '/services',
        linkLabel: item.fields.linkLabel   || 'See Details',
        order:     item.fields.order       ?? 99,
      }))
      .sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('fetchOffers error:', e)
    return []
  }
}

// ── TEAM MEMBERS ──
export async function fetchTeamMembers() {
  try {
    const data = await fetchEntries('teamMember')
    return data.items
      .map(item => ({
        name:     item.fields.name  || '',
        role:     item.fields.role  || '',
        bio:      item.fields.bio   || '',
        order:    item.fields.order ?? 99,
        photo:    resolveAsset(item.fields.photo?.sys?.id, data.includes) || '',
        initials: (item.fields.name || '?').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase(),
      }))
      .sort((a, b) => a.order - b.order)
  } catch (e) {
    console.error('fetchTeamMembers error:', e)
    return []
  }
}
