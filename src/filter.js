const makeNumbers = n => {
  return Array.from({ length: n }, () => Math.floor(Math.random() * 100));
};

const makeSource = numbers => {
  return numbers.map(n => `<li class="item"><span>${n}</span></li>`).join("");
};

const makeDestItem = (n, x) => {
  const span = document.createElement("span");
  span.textContent = n;

  const li = document.createElement("li");
  li.className = "item item--dest";
  li.style.cssText = `transform: translateX(${x}px) translateY(-90px)`;
  li.appendChild(span);

  return li;
};

const getXY = el => {
  const { x, y } = el.getBoundingClientRect();
  return [x, y].map(Math.round);
};

const getResult = n => n % 2 === 0;

const updateFn = (numbers, msg) =>
  numbers.forEach(el => (el.textContent = msg));

function Explanimation(els) {
  const total = els.source.children.length;
  const numbers = makeNumbers(total);

  els.source.innerHTML = makeSource(numbers);

  // Work out the x coordinates of the transform props
  const [sourceX] = getXY(els.source);
  const [callbackX] = getXY(els.cb);
  const xyz = [...els.source.children].map(getXY);
  const positions = xyz.map(xy => xy[0] - sourceX);
  const cbTransforms = xyz.map(xy => xy[0] - callbackX);

  // Set up TimelineLite
  //----------------------------------------------------------------------------
  const tl = new TimelineLite({
    onStart: () => els.dest.classList.add("is-active"),
    onComplete: () => {
      updateFn(els.nums, "num");
      tl.to(els.cb, 1, { transform: `translateX(0)` });
    }
  });
  cbTransforms.forEach((x, i) => {
    const n = numbers[i];
    const p = positions[i];
    const t = 1;
    const v = getResult(n);
    const tween = {
      transform: `translateX(${x}px)`,
      onStart: () => updateFn(els.nums, n),
      onComplete: () => {
        const { width } = els.dest.getBoundingClientRect();
        v ? els.dest.appendChild(makeDestItem(n, p - width)) : null;
      }
    };
    tl.to(els.cb, t, tween);
  });

  const reset = () => {
    els.dest.classList.remove("is-active");
    els.dest.innerHTML = "";
  };

  // Event handlers
  //----------------------------------------------------------------------------
  els.playBtn.addEventListener("click", e => {
    reset();
    tl.restart();
  });

  els.resetBtn.addEventListener("click", e => {
    reset();
  });
}

(function() {
  const els = {
    cb: document.querySelector("#callback"),
    source: document.querySelector("#source"),
    dest: document.querySelector("#dest"),
    playBtn: document.querySelector("#play-btn"),
    resetBtn: document.querySelector("#reset-btn"),
    nums: document.querySelectorAll("#fn b")
  };
  new Explanimation(els);
})();
