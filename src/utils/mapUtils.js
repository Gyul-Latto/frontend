export function initializeMap(mapId) {
  const mapContainer = document.getElementById(mapId);

  if (!mapContainer) {
    console.error(`Element with ID '${mapId}' not found.`);
    return null;
  }

  const mapOption = {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 위치
    level: 3,
  };

  return new kakao.maps.Map(mapContainer, mapOption);
}

let markers = [];

export function addMarkers(map, apartments, onSelectApartment) {
  if (!Array.isArray(apartments)) {
    console.error('addMarkers: apartments가 배열이 아닙니다.', apartments);
    return;
  }

  // 기존 마커와 정보창 초기화
  markers.forEach(({ marker }) => {
    marker.setMap(null);
  });
  markers = [];

  const bounds = new kakao.maps.LatLngBounds();
  const imgURL = 'https://cdn-icons-png.flaticon.com/512/3771/3771140.png';
  const imgSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };

  apartments.forEach((apartment) => {
    const { latitude, longitude, aptNm } = apartment;

    if (!latitude || !longitude) {
      console.warn(`유효하지 않은 위치 데이터: ${aptNm}`);
      return;
    }

    const position = new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    const markerImage = new kakao.maps.MarkerImage(imgURL, imgSize, imageOption);

    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
      title: aptNm,
    });

    marker.setMap(map);
    bounds.extend(position);

    kakao.maps.event.addListener(marker, 'click', () => {
      console.log(`마커 클릭: ${aptNm}`);
      if (typeof onSelectApartment === 'function') {
        onSelectApartment(apartment);
      }
    });

    markers.push({ marker });
  });

  // 모든 마커가 보이도록 지도 이동
  if (markers.length > 0) {
    map.setBounds(bounds);
    console.log(`${markers.length}개의 마커가 추가되었습니다.`);
  } else {
    console.warn('표시할 유효한 마커가 없습니다.');
  }
}
