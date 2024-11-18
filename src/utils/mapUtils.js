// 카카오 지도 가져오기

export function initializeMap(mapId) {
  if (!window.kakao || !window.kakao.maps) {
    console.error("Kakao Maps API가 로드되지 않았습니다.");
    return null;
  }

  const mapContainer = document.getElementById(mapId);
  const mapOption = {
    center: new kakao.maps.LatLng(37.5665, 126.978), //서울
    level: 3,
  };

  return new kakao.maps.Map(mapContainer, mapOption);
}
