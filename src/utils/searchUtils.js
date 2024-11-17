export async function fetchSido() {
    const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=*00000000&is_ignore_zero=true`;
    const response = await fetch(url);
    const data = await response.json();
    populateOptions(data, "sido");
  }
  
  export async function fetchRegionData(regcode, elementId) {
    const url = `https://grpc-proxy-server-mkvo6j4wsq-du.a.run.app/v1/regcodes?regcode_pattern=${regcode}&is_ignore_zero=true`;
    const response = await fetch(url);
    const data = await response.json();
    populateOptions(data, elementId);
  }
  
  export function populateOptions(data, elementId) {
    const selectEl = document.getElementById(elementId);
    selectEl.innerHTML = `<option value="">${elementId === "sido" ? "시도" : "구군"} 선택</option>`;
    data.regcodes.forEach((region) => {
      let name = region.name;
      if (elementId === "dong") {
        name = name.split(" ").pop();
      } else if (elementId === "gugun") {
        name = name.split(" ")[1]; 
      }
      selectEl.innerHTML += `<option value="${region.code}">${name}</option>`;
    });
  }
  
  export function populateYearOptions() {
    const yearEl = document.getElementById("year");
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i > currentYear - 20; i--) {
      yearEl.innerHTML += `<option value="${i}">${i}년</option>`;
    }
  }
  
  export function populateMonthOptions() {
    const monthEl = document.getElementById("month");
    const selectedYear = document.getElementById("year").value;
    const currentMonth = selectedYear === new Date().getFullYear().toString() ? new Date().getMonth() + 1 : 12;
    monthEl.innerHTML = `<option value="">월 선택</option>`;
    for (let i = 1; i <= currentMonth; i++) {
      monthEl.innerHTML += `<option value="${i < 10 ? "0" + i : i}">${i}월</option>`;
    }
  }
  