export function initializeMap(mapId) {
  const mapContainer = document.getElementById(mapId);
  const mapOption = {
    center: new kakao.maps.LatLng(37.5665, 126.978), // 초기 위치: 서울
    level: 3,
  };

  console.log("지도 초기화 옵션:", mapOption); // 디버깅용
  return new kakao.maps.Map(mapContainer, mapOption);
}

let markers = []; // 마커 배열
let infoWindows = []; // 인포윈도우 배열

export function addMarkers(map, apartments) {
  // 기존 마커와 인포윈도우 제거
  markers.forEach((marker) => marker.setMap(null));
  infoWindows.forEach((infoWindow) => infoWindow.close());
  markers = []; // 마커 배열 초기화
  infoWindows = []; // 인포윈도우 배열 초기화

  const bounds = new kakao.maps.LatLngBounds();
  const imgURL = "https://cdn-icons-png.flaticon.com/512/3771/3771140.png";
  const imgSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };

  apartments.forEach(({ latitude, longitude, aptNm }, index) => {
    // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    if (!latitude || !longitude) return;

    const position = new kakao.maps.LatLng(parseFloat(latitude), parseFloat(longitude));
    const markerImage = new kakao.maps.MarkerImage(imgURL, imgSize, imageOption);

    const marker = new kakao.maps.Marker({
      position,
      image: markerImage,
      title: aptNm,
    });

    marker.setMap(map); // 지도에 마커 추가
    markers.push(marker); // 마커 배열에 추가
    bounds.extend(position); // 지도 범위에 포함

    // 인포윈도우 생성
    const infoWindow = new kakao.maps.InfoWindow({
      content: `<div style="padding:5px;">${aptNm}</div>`,
    });

    infoWindows.push(infoWindow); // 인포윈도우 배열에 추가

    // 마커 클릭 시 토글 동작
    kakao.maps.event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        // 이미 열려 있으면 닫기
        infoWindow.close();
      } else {
        // 열려 있지 않으면 모든 인포윈도우 닫고 해당 인포윈도우 열기
        infoWindows.forEach((win) => win.close());
        infoWindow.open(map, marker);
      }
    });
  });

  // 모든 마커가 보이도록 지도 이동
  map.setBounds(bounds);

  console.log(`${markers.length}개의 마커와 ${infoWindows.length}개의 인포윈도우가 추가되었습니다.`);
}

