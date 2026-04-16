import type { TentangSectionProps } from './types'
import { AlamatMapsSkeleton } from './skeletons/alamatmaps-skeleton'

export default function AlamatMaps({
  tentangData,
  loading,
}: TentangSectionProps & { loading?: boolean }) {
  if (loading) {
    return <AlamatMapsSkeleton />
  }

  return (
    <div className="p-8">
      <div className="w-full h-72 md:h-100 overflow-hidden relative group border">
        {tentangData.physicalAddress.mapsEmbedUrl ? (
          <iframe
            title="Lokasi Sekretariat ARCES"
            src={tentangData.physicalAddress.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="transition-all duration-700"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Map not available</p>
          </div>
        )}
      </div>
    </div>
  )
}
