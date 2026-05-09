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
function resolveAsset(assetId, includes) {
  if (!includes?.Asset) return null
  const asset = includes.Asset.find(a => a.sys.id === assetId)
  return asset ? 'https:' + asset.fields.file.url : null
}

// ── SITE INFO ──
export async function fetchSiteInfo() {
  try {
    const data = await fetchEntries('siteInfo')
    if (!data.items?.length) return null
    return data.items[0].fields
  } catch (e) {
    console.error('fetchSiteInfo error:', e)
    return null
  }
}

// ── PARTNERS ──
export async function fetchPartners() {
  try {
    const data = await fetchEntries('partner')
    return data.items.map(item => ({
      name:  item.fields.name  || '',
      desc:  item.fields.description || '',
      level: item.fields.level || '',
      logo:  resolveAsset(item.fields.logo?.sys?.id, data.includes) || '',
    }))
  } catch (e) {
    console.error('fetchPartners error:', e)
    return []
  }
}

// ── CLIENTS ──
export async function fetchClients() {
  try {
    const data = await fetchEntries('client')
    return data.items.map(item => ({
      name: item.fields.name || '',
      logo: resolveAsset(item.fields.logo?.sys?.id, data.includes) || '',
    }))
  } catch (e) {
    console.error('fetchClients error:', e)
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
