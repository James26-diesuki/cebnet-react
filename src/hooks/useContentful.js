import { useState, useEffect } from 'react'
import {
  fetchSiteInfo,
  fetchPartners,
  fetchServices,
  fetchJobs,
  fetchGallery,
  fetchAnnouncements,
  fetchOffers,
} from '../lib/contentful'
import {
  SITE as SITE_FALLBACK,
  PARTNERS as PARTNERS_FALLBACK,
  SERVICES as SERVICES_FALLBACK,
  JOBS     as JOBS_FALLBACK,
} from '../data/siteData'

// ── Generic fetch hook ──
export function useFetch(fetcher, fallback) {
  const [data,    setData]    = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetcher().then(result => {
      if (result && (Array.isArray(result) ? result.length > 0 : Object.keys(result).length > 0)) {
        setData(result)
      }
      setLoading(false)
    })
  }, [])

  return { data, loading }
}

// ── Per-resource hooks ──
export function useSiteInfo()     { return useFetch(fetchSiteInfo,    SITE_FALLBACK)     }
export function usePartners()     { return useFetch(fetchPartners,    PARTNERS_FALLBACK) }
export function useServices()     { return useFetch(fetchServices,    SERVICES_FALLBACK) }
export function useJobs()         { return useFetch(fetchJobs,        JOBS_FALLBACK)     }
export function useGallery()      { return useFetch(fetchGallery,     [])               }
export function useAnnouncements(){ return useFetch(fetchAnnouncements, [])              }
export function useOffers()       { return useFetch(fetchOffers,        [])              }
