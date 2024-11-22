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
let infoWindows = []; // 토클 배열

export function addMarkers(map, apartments) {
  console.log("addMarkers 호출:", { map, apartments });

  
  markers.forEach(({ marker, infoWindow }) => {
    marker.setMap(null); 
    infoWindow.close(); 
  });
  markers = [];
  infoWindows = []; 

  const bounds = new kakao.maps.LatLngBounds();
  const imgURL = "https://cdn-icons-png.flaticon.com/512/3771/3771140.png";
  const imgSize = new kakao.maps.Size(64, 69);
  const imageOption = { offset: new kakao.maps.Point(27, 69) };

  
  apartments.forEach(({ latitude, longitude, aptNm}) => {
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

    const infoWindow = new kakao.maps.InfoWindow({
      content: `
        <div style="padding:5px; width:200px; text-align:center; border-radius:3px;">
          <strong>${aptNm}</strong><br>
        </div>
      `,
    });

    kakao.maps.event.addListener(marker, "click", () => {
      if (infoWindow.getMap()) {
        console.log(`InfoWindow 닫기: ${aptNm}`);
        infoWindow.close();
      } else {
        console.log(`InfoWindow 열기: ${aptNm}`);
        infoWindows.forEach((win) => win.close()); 
        infoWindow.open(map, marker); 
      
      }
    });
    markers.push({ marker, infoWindow });
    infoWindows.push(infoWindow);
  });

  // 모든 마커가 보이도록 지도 이동
  if (markers.length > 0) {
    map.setBounds(bounds);
    console.log(`${markers.length}개의 마커가 추가`);
  } else {
    console.warn("표시할 유효한 마커가 없습니다.");
  }
}
