import axios from 'axios';

export const fetchSido = async () => {
  const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`;
  const response = await axios.get(url);
  return response.data.regcodes.map(({ code, name }) => ({
    code,
    name: name.split(' ')[0],
  }));
};

export const fetchRegionData = async (regcode, type) => {
  const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${regcode}&is_ignore_zero=true`;
  const response = await axios.get(url);
  return response.data.regcodes.map(({ code, name }) => ({
    code,
    name: type === 'dong' ? name.split(' ')[2] || name.split(' ')[1] : name.split(' ')[1],
  }));
};

export const fetchApartments = async (sido, gugun, dong) => {
  const response = await axios.post('http://localhost:8080/api/apt/search/sido', {
    sidoName: sido,
    gugunName: gugun,
    dongName: dong,
  });
  return response.data.data;
};

export const fetchApartmentsBySearchQuery = async (aptName) => {
  const response = await axios.get(`http://localhost:8080/api/apt/search/name`, {
    params: { aptName },
  });
  return response.data.data;
};

// 아파트 상세 정보 조회 async, await 사용
export const increaseViewCount = (aptSeq) => {
  try {
    axios.get(`http://localhost:8080/api/views/${aptSeq}`);
  } catch (e) {
    console.log(e);
  }
};
