export const makeDestItem = (fnInput, fnOutput, x) => {
  const span = document.createElement("span");
  span.textContent = fnOutput;

  const li = document.createElement("li");
  li.className = "item item--dest";
  li.style.cssText = `transform: translateY(-90px)`;
  li.appendChild(span);

  return li;
};

export const getFnResult = num => num * num;
