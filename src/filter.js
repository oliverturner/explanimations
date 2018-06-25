export const makeDestItem = (fnInput, fnOutput, x) => {
  const span = document.createElement("span");
  span.textContent = fnInput;

  const li = document.createElement("li");
  li.className = "item item--dest";
  li.style.cssText = `transform: translateX(${x}px) translateY(-90px)`;
  li.appendChild(span);

  return li;
};

export const getFnResult = num => num % 2 === 0;