import * as utils from "./utils.js";

export function Explanimation(method) {
  console.log("method.getFnResult:", method.getFnResult + "");

  const els = {
    cb: document.querySelector("#callback"),
    source: document.querySelector("#source"),
    dest: document.querySelector("#dest"),
    playBtn: document.querySelector("#play-btn"),
    pauseBtn: document.querySelector("#pause-btn"),
    resetBtn: document.querySelector("#reset-btn"),
    nums: document.querySelectorAll("#fn b")
  };
  const total = els.source.children.length;
  const numbers = utils.makeNumbers(total);

  els.source.innerHTML = utils.makeSource(numbers);

  // Work out the x coordinates of the transform props
  const [sourceX] = utils.getXY(els.source);
  const [callbackX] = utils.getXY(els.cb);
  const xyz = [...els.source.children].map(utils.getXY);
  const positions = xyz.map(xy => xy[0] - sourceX);
  const cbTransforms = xyz.map(xy => xy[0] - callbackX);

  // Set up TimelineLite
  //----------------------------------------------------------------------------
  const tl = new TimelineLite({
    onStart: () => els.dest.classList.add("is-active"),
    onComplete: () => {
      utils.updateFn(els.nums, "num");
      tl.to(els.cb, 1, { transform: `translateX(0)` });
    }
  });
  cbTransforms.forEach((x, i) => {
    const n = numbers[i];
    const p = positions[i];
    const v = method.getFnResult(n);
    const tween = {
      transform: `rotate(0) translateX(${x}px)`,
      onStart: () => utils.updateFn(els.nums, n),
      onComplete: () => {
        const { width } = els.dest.getBoundingClientRect();
        !!v ? els.dest.appendChild(method.makeDestItem(n, v, p - width)) : null;
      }
    };
    tl.to(els.cb, 1, tween);
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

  els.pauseBtn.addEventListener("click", e => {
    tl.paused() ? tl.resume() : tl.pause();
    els.pauseBtn.textContent = tl.paused() ? "resume" : "pause"
  });

  els.resetBtn.addEventListener("click", e => {
    reset();
  });
}
