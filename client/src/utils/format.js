/**
 * Format a number into USD currency.
 */
export const formatCurrency = (n) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  }).format(n || 0)

/**
 * Format a date string into human readable form.
 */
export const formatDate = (d, opts = { year: 'numeric', month: 'short', day: 'numeric' }) =>
  new Date(d).toLocaleDateString('en-US', opts)

/**
 * Calculate nights between two dates.
 */
export const nightsBetween = (ci, co) => {
  if (!ci || !co) return 0
  const ms = new Date(co).getTime() - new Date(ci).getTime()
  return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)))
}

/**
 * Generate tonight's date in yyyy-mm-dd for date input defaults.
 */
export const todayISO = (offset = 0) => {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

/**
 * Truncate text.
 */
export const truncate = (str, n = 100) =>
  str?.length > n ? str.slice(0, n).trim() + '…' : str || ''

/**
 * Status badge color class.
 */
export const statusColor = (status) => {
  switch (status) {
    case 'approved': return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
    case 'pending': return 'bg-amber-500/15 text-amber-400 border-amber-500/30'
    case 'cancelled': return 'bg-rose-500/15 text-rose-400 border-rose-500/30'
    case 'completed': return 'bg-gold/15 text-gold border-gold/30'
    default: return 'bg-white/10 text-white/60 border-white/20'
  }
}
