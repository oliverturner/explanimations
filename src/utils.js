export const makeNumbers = n => {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 100));
};

export const makeSource = numbers => {
  return numbers.map(n => `<li class="item"><span>${n}</span></li>`).join("");
};

export const getXY = el => {
  const { x, y } = el.getBoundingClientRect();
  return [x, y].map(Math.round);
};

export const updateFn = (numbers, msg) => {
  return numbers.forEach(el => (el.textContent = msg));
};
