export function initializeMap(mapId) {
  const mapContainer = document.getElementById(mapId);

  if (!mapContainer) {
    console.error(`Element with ID '${mapId}' not found.`);
    return null;
  }

  const mapOption = {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 위치: 서울
    level: 3, // 확대 수준
  };

  console.log('지도 초기화 옵션:', mapOption); // 디버깅용
  return new kakao.maps.Map(mapContainer, mapOption);
}

let markers = []; // 마커 배열
let infoWindows = []; // 인포윈도우 배열

export function addMarkers(map, apartments) {
  console.log('addMarkers 호출:', { map, apartments });

  // 기존 마커와 인포윈도우 제거
  markers.forEach(({ marker, infoWindow }) => {
    marker.setMap(null); // 지도에서 마커 제거
    infoWindow.close(); // 인포윈도우 닫기
  });
  markers = []; // 마커 배열 초기화
  infoWindows = []; // 인포윈도우 배열 초기화

  const bounds = new kakao.maps.LatLngBounds();
  const imgURL = 'https://cdn-icons-png.flaticon.com/512/3771/3771140.png';
  const imgSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };

  // 아파트 데이터를 기반으로 마커 추가
  apartments.forEach(({ latitude, longitude, aptNm, dealAmount }) => {
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

    marker.setMap(map); // 지도에 마커 추가
    bounds.extend(position); // 지도 범위 업데이트

    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:5px; width:200px; text-align:center; border-radius:3px;">
          <strong>${aptNm}</strong><br>
        </div>
      `,
    });

    // 마커 클릭 이벤트 처리
    kakao.maps.event.addListener(marker, 'click', () => {
      if (infoWindow.getMap()) {
        console.log(`InfoWindow 닫기: ${aptNm}`);
        infoWindow.close();
      } else {
        console.log(`InfoWindow 열기: ${aptNm}`);
        infoWindows.forEach((win) => win.close()); // 기존 인포윈도우 닫기
        infoWindow.open(map, marker); // 현재 마커에 연결된 인포윈도우 열기
      }
    });

    // 마커와 인포윈도우를 배열에 저장
    markers.push({ marker, infoWindow });
    infoWindows.push(infoWindow);
  });

  // 모든 마커가 보이도록 지도 이동
  if (markers.length > 0) {
    map.setBounds(bounds);
    console.log(`${markers.length}개의 마커가 추가되었습니다.`);
  } else {
    console.warn('표시할 유효한 마커가 없습니다.');
  }
}
