import { useState, useEffect } from 'react'
import {
  fetchSiteInfo,
  fetchPartners,
  fetchServices,
  fetchJobs,
  fetchTeamMembers,
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

const TEAM_FALLBACK = [
  {
    name:     'Raynan Panes',
    role:     'Chief Operating Officer, Co-Founder',
    bio:      'A licensed electronics engineer with two decades of experience in IT and business development. He has worked for leading IT and network security companies, and now invests his considerable technical expertise and business acumen to serve CebNet\'s clients.',
    photo:    '/assets/img/team/raynan.jpg',
    initials: 'RP',
    order:    1,
  },
  {
    name:     'Jose Jemson Lape',
    role:     'Chief Technology Officer, Co-Founder',
    bio:      'A multi-certified personality with experience working across different leading IT companies. With more than 15 years in the IT industry and engagements across diverse sectors, he shares his expertise by providing clients with the right technology for their business.',
    photo:    '/assets/img/team/jemson.jpg',
    initials: 'JL',
    order:    2,
  },
]

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
export function useTeamMembers()  { return useFetch(fetchTeamMembers, TEAM_FALLBACK)     }
export function useGallery()      { return useFetch(fetchGallery,     [])               }
export function useAnnouncements(){ return useFetch(fetchAnnouncements, [])              }
export function useOffers()       { return useFetch(fetchOffers,        [])              }
