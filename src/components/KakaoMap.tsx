'use client';

import { useEffect, useRef } from 'react';

interface KakaoLatLng {
  new (lat: number, lng: number): unknown;
}

interface KakaoGeocoderResult {
  addressSearch(
    address: string,
    callback: (result: { y: string; x: string }[], status: string) => void
  ): void;
}

interface KakaoMapsNamespace {
  load(callback: () => void): void;
  LatLng: KakaoLatLng;
  Map: new (container: HTMLElement, options: { center: unknown; level: number }) => {
    addControl(control: unknown, position: unknown): void;
  };
  Marker: new (options: { position: unknown; map: unknown }) => unknown;
  ZoomControl: new () => unknown;
  ControlPosition: { RIGHT: unknown };
  services: {
    Geocoder: new () => KakaoGeocoderResult;
    Status: { OK: string };
  };
}

declare global {
  interface Window {
    kakao?: { maps: KakaoMapsNamespace };
  }
}

const KAKAO_APP_KEY = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

export default function KakaoMap({ address }: { address: string }) {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!KAKAO_APP_KEY) return;

    function initMap() {
      const kakao = window.kakao;
      if (!kakao) return;

      kakao.maps.load(() => {
        const geocoder = new kakao.maps.services.Geocoder();

        geocoder.addressSearch(address, (result, status) => {
          if (status !== kakao.maps.services.Status.OK || !mapRef.current) return;

          const coords = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
          const map = new kakao.maps.Map(mapRef.current, { center: coords, level: 3 });

          new kakao.maps.Marker({ position: coords, map });
          map.addControl(new kakao.maps.ZoomControl(), kakao.maps.ControlPosition.RIGHT);
        });
      });
    }

    if (window.kakao?.maps) {
      initMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false&libraries=services`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);
  }, [address]);

  if (!KAKAO_APP_KEY) return null;

  return <div ref={mapRef} className="absolute inset-0 w-full h-full" />;
}
